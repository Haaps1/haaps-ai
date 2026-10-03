/* =========================================================
   HAAPS — particle morph engine (Three.js)
   ~15k particles that assemble into the Haaps logo, then burst
   and re-form into new 3D shapes as each section scrolls in.
   Particles flee from the mouse. Colours follow the section theme.
   Public API: window.HAAPS_SCENE.setShape(name, {x, scale}),
               .setTheme(name), .pulse()
   ========================================================= */
(function () {
  const canvas = document.getElementById("webgl");
  if (!canvas || typeof THREE === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const N = isMobile ? 7000 : 15000;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    canvas.style.display = "none";
    return;
  }
  const PR = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
  renderer.setPixelRatio(PR);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  const CAM_Z = 10;
  camera.position.z = CAM_Z;

  const visible = () => {
    const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * CAM_Z;
    return { w: h * camera.aspect, h };
  };

  /* ---------------- shape generators (all ~unit size 6) ---------------- */
  const rand = (a, b) => a + Math.random() * (b - a);
  const shapes = {};

  shapes.sphere = () => {
    const a = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      const R = 2.6 * (i % 7 === 0 ? rand(0.3, 1) : 1);
      a.set([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R], i * 3);
    }
    return a;
  };

  shapes.ring = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const arm = i % 3;
      const r = Math.pow(Math.random(), 0.7) * 3.6 + 0.4;
      const ang = r * 1.3 + (arm / 3) * Math.PI * 2 + rand(-0.35, 0.35);
      const x = Math.cos(ang) * r;
      const z = Math.sin(ang) * r;
      const y = rand(-0.15, 0.15) * (4 - r) * 0.5;
      // tilt the disk
      a.set([x, y * Math.cos(0.5) - z * Math.sin(0.5), y * Math.sin(0.5) + z * Math.cos(0.5)], i * 3);
    }
    return a;
  };

  shapes.wave = () => {
    const a = new Float32Array(N * 3);
    const cols = Math.round(Math.sqrt(N * 2.2));
    for (let i = 0; i < N; i++) {
      const cx = i % cols;
      const cz = Math.floor(i / cols);
      const rows = Math.ceil(N / cols);
      const x = (cx / cols - 0.5) * 12;
      const z = (cz / rows - 0.5) * 6;
      const y = Math.sin(x * 0.8) * 0.5 + Math.cos(z * 1.2 + x * 0.3) * 0.4;
      // tilt towards camera
      a.set([x, y * Math.cos(-1) - z * Math.sin(-1) - 0.6, y * Math.sin(-1) + z * Math.cos(-1)], i * 3);
    }
    return a;
  };

  shapes.helix = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 8;
      const strand = i % 2 ? Math.PI : 0;
      const isRung = i % 9 === 0;
      const r = isRung ? rand(-1, 1) : 1.1 + rand(-0.12, 0.12);
      const x = (i / N - 0.5) * 11;
      a.set([x, Math.cos(t + strand) * r, Math.sin(t + strand) * r], i * 3);
    }
    return a;
  };

  shapes.cube = () => {
    const a = new Float32Array(N * 3);
    const s = 1.9;
    for (let i = 0; i < N; i++) {
      const face = i % 6;
      const u = rand(-s, s), v = rand(-s, s);
      const p = [[s, u, v], [-s, u, v], [u, s, v], [u, -s, v], [u, v, s], [u, v, -s]][face];
      a.set(p, i * 3);
    }
    return a;
  };

  // logo: sample the real logo image's opaque pixels
  shapes.logo = () => shapes._logo || shapes.sphere();
  const loadLogo = () =>
    new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const W = 320, H = Math.round((img.height / img.width) * W);
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0, W, H);
        const d = g.getImageData(0, 0, W, H).data;
        const pts = [];
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 140) pts.push(x, y);
        if (!pts.length) return res(null);
        const a = new Float32Array(N * 3);
        const scale = 7 / W;
        for (let i = 0; i < N; i++) {
          const k = Math.floor(Math.random() * (pts.length / 2)) * 2;
          a.set([(pts[k] + Math.random() - W / 2) * scale, -(pts[k + 1] + Math.random() - H / 2) * scale, rand(-0.12, 0.12)], i * 3);
        }
        shapes._logo = a;
        res(a);
      };
      img.onerror = () => res(null);
      img.src = "assets/img/logo.png";
    });

  /* ---------------- geometry + material ---------------- */
  const geo = new THREE.BufferGeometry();
  const start = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) start.set([rand(-12, 12), rand(-8, 8), rand(-10, 4)], i * 3);
  const aA = new THREE.BufferAttribute(start.slice(), 3);
  const aB = new THREE.BufferAttribute(shapes.sphere(), 3);
  const aR = new Float32Array(N);
  for (let i = 0; i < N; i++) aR[i] = Math.random();
  geo.setAttribute("position", aA); // required by three; we use aA/aB in shader
  geo.setAttribute("aA", aA);
  geo.setAttribute("aB", aB);
  geo.setAttribute("aRand", new THREE.BufferAttribute(aR, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMix: { value: 0 },
    uScatter: { value: 2.2 },
    uMouse: { value: new THREE.Vector3(99, 99, 0) },
    uMouseForce: { value: 1 },
    uSize: { value: isMobile ? 2.2 : 2.6 },
    uPR: { value: PR },
    uC1: { value: new THREE.Color(0xf2006d) },
    uC2: { value: new THREE.Color(0x9b0098) },
    uC3: { value: new THREE.Color(0xffffff) },
    uAlpha: { value: 1 },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute vec3 aA; attribute vec3 aB; attribute float aRand;
      uniform float uTime, uMix, uScatter, uSize, uPR, uMouseForce;
      uniform vec3 uMouse;
      varying float vR; varying float vX;
      float ease(float t){ return t<.5 ? 4.*t*t*t : 1.-pow(-2.*t+2.,3.)/2.; }
      void main(){
        // stagger each particle's arrival a little
        float m = clamp((uMix - aRand * .35) / .65, 0., 1.);
        vec3 p = mix(aA, aB, ease(m));
        // burst outward mid-flight
        vec3 dir = normalize(vec3(sin(aRand*91.7), cos(aRand*47.3), sin(aRand*13.1+1.)) + 0.0001);
        p += dir * sin(m * 3.14159) * uScatter * (0.4 + aRand);
        // idle flutter
        p += vec3(sin(uTime*.9 + aRand*40.), cos(uTime*.7 + aRand*30.), sin(uTime*.6 + aRand*20.)) * .035;
        vec4 world = modelMatrix * vec4(p, 1.);
        // mouse repulsion (world space)
        vec2 d = world.xy - uMouse.xy;
        float dist = length(d);
        float f = smoothstep(1.8, 0., dist) * uMouseForce;
        world.xy += normalize(d + .0001) * f * 1.1;
        world.z += f * 1.5;
        vec4 mv = viewMatrix * world;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (.55 + aRand * .9) * uPR * (10. / -mv.z) * (1. + f * .8);
        vR = aRand; vX = p.x;
      }`,
    fragmentShader: `
      uniform vec3 uC1, uC2, uC3; uniform float uAlpha;
      varying float vR; varying float vX;
      void main(){
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        float a = smoothstep(.5, .05, d);
        vec3 col = mix(uC1, uC2, smoothstep(-3.5, 3.5, vX + (vR - .5) * 2.));
        col = mix(col, uC3, step(.93, vR) * .8);
        gl_FragColor = vec4(col, a * uAlpha * (.55 + vR * .45));
      }`,
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  /* ---------------- dust background ---------------- */
  const dustN = isMobile ? 400 : 900;
  const dg = new THREE.BufferGeometry();
  const dp = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) dp.set([rand(-20, 20), rand(-12, 12), rand(-20, -4)], i * 3);
  dg.setAttribute("position", new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0xff6fb5, size: 0.05, transparent: true, opacity: 0.5, depthWrite: false }));
  scene.add(dust);

  /* ---------------- state + API ---------------- */
  const state = {
    shape: null,
    spin: 0,
    targetX: 0,
    targetY: 0,
    targetScale: 1,
    spinOn: true,
  };
  let mixTween = null;

  const fitScale = () => Math.min(1, visible().w / 12.5);

  function currentPositions() {
    // CPU replica of the shader mix (without burst) so a new morph starts where we are
    const A = aA.array, B = aB.array, out = new Float32Array(N * 3);
    const um = uniforms.uMix.value;
    for (let i = 0; i < N; i++) {
      let m = Math.min(1, Math.max(0, (um - aR[i] * 0.35) / 0.65));
      m = m < 0.5 ? 4 * m * m * m : 1 - Math.pow(-2 * m + 2, 3) / 2;
      for (let k = 0; k < 3; k++) out[i * 3 + k] = A[i * 3 + k] + (B[i * 3 + k] - A[i * 3 + k]) * m;
    }
    return out;
  }

  function setShape(name, opts = {}) {
    const v = visible();
    state.targetX = (opts.x || 0) * v.w * 0.5;
    state.targetY = (opts.y || 0) * v.h * 0.5;
    state.targetScale = (opts.scale || 1) * fitScale();
    state.spinOn = name !== "logo";
    if (name === state.shape || !shapes[name]) return;
    state.shape = name;
    aA.array.set(currentPositions());
    aA.needsUpdate = true;
    aB.array.set(shapes[name]());
    aB.needsUpdate = true;
    uniforms.uMix.value = 0;
    if (mixTween) mixTween.kill && mixTween.kill();
    if (typeof gsap !== "undefined" && !reduced) {
      mixTween = gsap.to(uniforms.uMix, { value: 1, duration: 2.2, ease: "power1.inOut" });
    } else uniforms.uMix.value = 1;
  }

  const THEMES = {
    dark: [0xf2006d, 0x9b0098, 0xffffff, 1, THREE.AdditiveBlending],
    brand: [0xffffff, 0xffd0ea, 0x2a0030, 0.9, THREE.NormalBlending],
    light: [0xf2006d, 0x6a00a8, 0x2a0030, 0.85, THREE.NormalBlending],
  };
  function setTheme(name) {
    const t = THEMES[name] || THEMES.dark;
    const to = (u, hex) => {
      const c = new THREE.Color(hex);
      if (typeof gsap !== "undefined") gsap.to(u.value, { r: c.r, g: c.g, b: c.b, duration: 0.8 });
      else u.value.copy(c);
    };
    to(uniforms.uC1, t[0]);
    to(uniforms.uC2, t[1]);
    to(uniforms.uC3, t[2]);
    uniforms.uAlpha.value = t[3];
    mat.blending = t[4];
    mat.needsUpdate = true;
    dust.material.color.set(name === "dark" ? 0xff6fb5 : 0xffffff);
  }

  let pulse = 0;
  window.HAAPS_SCENE = {
    setShape,
    setTheme,
    pulse: () => { pulse = 1; },
    ready: loadLogo().then(() => { if (state.shape === "logo") { state.shape = null; setShape("logo", state.lastLogoOpts || {}); } }),
  };
  // remember logo opts so we can re-morph when the image finishes loading
  const _set = setShape;
  window.HAAPS_SCENE.setShape = (name, opts = {}) => { if (name === "logo") state.lastLogoOpts = opts; _set(name, opts); };

  /* ---------------- interaction ---------------- */
  const mouse = new THREE.Vector2(9, 9);
  const mouseTarget = new THREE.Vector3(99, 99, 0);
  const ray = new THREE.Raycaster();
  const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const ndc = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
    ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.set(ndc.x, ndc.y);
    ray.setFromCamera(mouse, camera);
    ray.ray.intersectPlane(planeZ, mouseTarget);
  }, { passive: true });
  window.addEventListener("pointerleave", () => mouseTarget.set(99, 99, 0));
  if (isMobile) uniforms.uMouseForce.value = 0.6;

  let scrollV = 0, lastY = window.scrollY;

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) tick(); });

  const clock = new THREE.Clock();
  function tick() {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    uniforms.uTime.value = t;

    // scroll velocity → extra spin + scatter
    const y = window.scrollY;
    scrollV += ((y - lastY) - scrollV) * 0.1;
    lastY = y;

    uniforms.uMouse.value.lerp(mouseTarget, 0.15);
    pulse *= 0.93;
    uniforms.uScatter.value = 2.2 + pulse * 3;

    // ease group toward its target placement
    group.position.x += (state.targetX - group.position.x) * 0.05;
    group.position.y += (state.targetY - group.position.y) * 0.05;
    const s = group.scale.x + (state.targetScale * (1 + pulse * 0.08) - group.scale.x) * 0.05;
    group.scale.setScalar(s);

    if (state.spinOn && !reduced) state.spin += dt * 0.25 + scrollV * 0.002;
    else state.spin += (Math.round(state.spin / (Math.PI * 2)) * Math.PI * 2 - state.spin) * 0.05;
    group.rotation.y = state.spin + ndc.x * 0.25;
    group.rotation.x = -ndc.y * 0.15 + (state.spinOn ? Math.sin(t * 0.3) * 0.15 : 0);

    dust.rotation.y = t * 0.01;
    dust.position.y = (y * 0.002) % 6;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
