/* =========================================================
   HAAPS — particle scene (Three.js)
   A dense, top-lit point cloud that morphs between shapes as
   sections scroll in: organic blob, plexus network, framed logo,
   dust field, tunnel, torus / twin blobs.
   API: window.HAAPS_SCENE.setShape(name, {x, y, scale}),
        .setZoom(z), .setAlpha(a), .pulse()
   ========================================================= */
(function () {
  const canvas = document.getElementById("webgl");
  if (!canvas || typeof THREE === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const N = isMobile ? 9000 : 22000;

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

  /* ---------------- helpers ---------------- */
  const rand = (a, b) => a + Math.random() * (b - a);
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  // cheap smooth 3D "noise" from layered sines (CPU, for shape building)
  const sn = (x, y, z) =>
    Math.sin(x * 1.7 + Math.sin(y * 2.3)) * 0.5 +
    Math.sin(y * 1.3 + Math.sin(z * 1.9)) * 0.35 +
    Math.sin(z * 2.1 + Math.sin(x * 1.1)) * 0.3 +
    Math.sin((x + y + z) * 3.1) * 0.12;
  const randDir = () => {
    const u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    return [r * Math.cos(t), u, r * Math.sin(t)];
  };

  /* ---------------- shapes ---------------- */
  const shapes = {};

  // organic rock / coral-like blob, denser on the surface
  const blobAt = (cx, cy, cz, R, seed) => {
    const [dx, dy, dz] = randDir();
    const n = sn(dx * 1.6 + seed, dy * 1.6, dz * 1.6 - seed);
    const shell = Math.random() < 0.82 ? 1 - Math.random() * 0.06 : Math.pow(Math.random(), 0.5);
    const r = R * (1 + n * 0.32) * shell;
    return [cx + dx * r * 1.15, cy + dy * r * 0.92, cz + dz * r];
  };
  shapes.blob = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) a.set(blobAt(0, 0, 0, 2.3, 0.7), i * 3);
    return a;
  };

  shapes.twins = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) a.set(i % 2 ? blobAt(-1.15, 0.25, 0, 1.15, 2.1) : blobAt(1.15, -0.25, 0, 1.15, 4.3), i * 3);
    return a;
  };

  shapes.torus = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = Math.random() * Math.PI * 2, v = Math.random() * Math.PI * 2;
      const r = 0.95 * (Math.random() < 0.85 ? 1 : Math.random()) * (1 + sn(Math.cos(u) * 2, Math.sin(u) * 2, v) * 0.18);
      a.set([(2.1 + r * Math.cos(v)) * Math.cos(u), (2.1 + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)], i * 3);
    }
    return a;
  };

  // plexus: points scattered in a wide volume (lines are added separately)
  const PLEX_M = isMobile ? 160 : 320;
  const plexNodes = new Float32Array(PLEX_M * 3);
  for (let j = 0; j < PLEX_M; j++) plexNodes.set([rand(-8, 8), rand(-4.5, 4.5), rand(-4, 2)], j * 3);
  shapes.plexus = () => {
    const a = new Float32Array(N * 3);
    a.set(plexNodes, 0);
    // remaining particles cluster softly around the nodes = glowing nebula dust
    for (let i = PLEX_M; i < N; i++) {
      const k = Math.floor(Math.random() * PLEX_M) * 3;
      a.set([plexNodes[k] + gauss() * 0.45, plexNodes[k + 1] + gauss() * 0.45, plexNodes[k + 2] + gauss() * 0.45], i * 3);
    }
    return a;
  };

  shapes.field = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) a.set([rand(-11, 11), rand(-6, 6), rand(-9, 3)], i * 3);
    return a;
  };

  shapes.tunnel = () => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 4.2 + gauss() * 0.9;
      a.set([Math.cos(t) * r, Math.sin(t) * r * 0.75, rand(-40, 6)], i * 3);
    }
    return a;
  };

  // logo sampled from the real image
  shapes.logo = () => shapes._logo || shapes.blob();
  const loadLogo = () =>
    new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const W = 300, H = Math.round((img.height / img.width) * W);
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0, W, H);
        const d = g.getImageData(0, 0, W, H).data;
        const pts = [];
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 140) pts.push(x, y);
        if (!pts.length) return res();
        const a = new Float32Array(N * 3);
        const s = 5.4 / W;
        for (let i = 0; i < N; i++) {
          const k = Math.floor(Math.random() * (pts.length / 2)) * 2;
          a.set([(pts[k] + Math.random() - W / 2) * s, -(pts[k + 1] + Math.random() - H / 2) * s, gauss() * 0.15], i * 3);
        }
        shapes._logo = a;
        res();
      };
      img.onerror = () => res();
      img.src = "assets/img/logo.png";
    });

  /* ---------------- particles ---------------- */
  const geo = new THREE.BufferGeometry();
  const init = shapes.field();
  const aA = new THREE.BufferAttribute(init.slice(), 3);
  const aB = new THREE.BufferAttribute(init.slice(), 3);
  const aR = new Float32Array(N);
  for (let i = 0; i < N; i++) aR[i] = Math.random();
  geo.setAttribute("position", aA);
  geo.setAttribute("aA", aA);
  geo.setAttribute("aB", aB);
  geo.setAttribute("aRand", new THREE.BufferAttribute(aR, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMix: { value: 1 },
    uScatter: { value: 0.9 },
    uStream: { value: 0 },
    uSize: { value: isMobile ? 2.2 : 2.5 },
    uPR: { value: PR },
    uAlpha: { value: 0 },
    uDeep: { value: new THREE.Color(0x8a0a7e) },
    uMid: { value: new THREE.Color(0xff1a85) },
    uHi: { value: new THREE.Color(0xffb3dc) },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute vec3 aA; attribute vec3 aB; attribute float aRand;
      uniform float uTime, uMix, uScatter, uSize, uPR, uStream;
      varying float vLight; varying float vR;
      float ease(float t){ return t<.5 ? 4.*t*t*t : 1.-pow(-2.*t+2.,3.)/2.; }
      void main(){
        float m = clamp((uMix - aRand * .4) / .6, 0., 1.);
        vec3 p = mix(aA, aB, ease(m));
        vec3 dir = normalize(vec3(sin(aRand*91.7), cos(aRand*47.3), sin(aRand*13.1+1.)) + .0001);
        p += dir * sin(m * 3.14159) * uScatter * (.3 + aRand);
        // gentle breathing
        p += vec3(sin(uTime*.6 + aRand*40.), cos(uTime*.5 + aRand*30.), sin(uTime*.4 + aRand*20.)) * .025;
        // a share of particles peel off and stream away like dust
        float s = step(.86, aRand) * uStream;
        float f = fract(uTime * .045 + aRand * 9.);
        p += vec3(-f * 7. - f*f*3., sin(f * 6. + aRand * 20.) * .6 + f * 1.2, cos(f * 5. + aRand * 11.) * .8) * s;
        vec4 world = modelMatrix * vec4(p, 1.);
        vec4 mv = viewMatrix * world;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (.5 + aRand * .9) * uPR * (10. / -mv.z);
        // top-down light: brighter on top, plus sparkle; streamers fade out
        vLight = smoothstep(-2.6, 2.4, world.y) * .85 + step(.965, aRand) * .5;
        vLight *= 1. - s * f;
        vR = aRand;
      }`,
    fragmentShader: `
      uniform vec3 uDeep, uMid, uHi; uniform float uAlpha;
      varying float vLight; varying float vR;
      void main(){
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        float a = smoothstep(.5, .1, d);
        vec3 col = mix(uDeep, uMid, smoothstep(0., .55, vLight));
        col = mix(col, uHi, smoothstep(.6, 1.2, vLight));
        gl_FragColor = vec4(col, a * uAlpha * (.55 + vLight * .9));
      }`,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  /* ---------------- plexus lines ---------------- */
  const lineGeo = new THREE.BufferGeometry();
  const buildLines = () => {
    const segs = [];
    const maxD = 1.75;
    for (let i = 0; i < PLEX_M; i++) {
      let c = 0;
      for (let j = i + 1; j < PLEX_M && c < 3; j++) {
        const dx = plexNodes[i * 3] - plexNodes[j * 3], dy = plexNodes[i * 3 + 1] - plexNodes[j * 3 + 1], dz = plexNodes[i * 3 + 2] - plexNodes[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < maxD * maxD) { segs.push(...plexNodes.slice(i * 3, i * 3 + 3), ...plexNodes.slice(j * 3, j * 3 + 3)); c++; }
      }
    }
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs), 3));
  };
  const lineMat = new THREE.LineBasicMaterial({ color: 0xff3d9a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  /* ---------------- state + API ---------------- */
  const state = { shape: null, x: 0, y: 0, z: 0, scale: 1, zoom: 1, alpha: 1, lines: 0, spinY: 0.08, spinZ: 0 };
  let tween = null;
  const fit = () => Math.min(1, visible().w / 12);

  function current() {
    const A = aA.array, B = aB.array, out = new Float32Array(N * 3), um = uniforms.uMix.value;
    for (let i = 0; i < N; i++) {
      let m = Math.min(1, Math.max(0, (um - aR[i] * 0.4) / 0.6));
      m = m < 0.5 ? 4 * m * m * m : 1 - Math.pow(-2 * m + 2, 3) / 2;
      for (let k = 0; k < 3; k++) out[i * 3 + k] = A[i * 3 + k] + (B[i * 3 + k] - A[i * 3 + k]) * m;
    }
    return out;
  }

  const SPIN = { blob: [0.08, 0], twins: [0.12, 0], torus: [0.1, 0.05], plexus: [0.02, 0], field: [0.01, 0], tunnel: [0, 0.03], logo: [0, 0] };
  const STREAM = { blob: 1, twins: 0.4, torus: 0.3 };

  function setShape(name, o = {}) {
    const v = visible();
    state.x = (o.x || 0) * v.w * 0.5;
    state.y = (o.y || 0) * v.h * 0.5;
    state.scale = (o.scale || 1) * (name === "plexus" || name === "field" || name === "tunnel" ? 1 : fit());
    if (name === "plexus" && !lineGeo.attributes.position) buildLines();
    state.lines = name === "plexus" ? 0.16 : 0;
    if (name === state.shape || !shapes[name]) return;
    state.shape = name;
    [state.spinY, state.spinZ] = SPIN[name] || [0.05, 0];
    aA.array.set(current());
    aA.needsUpdate = true;
    aB.array.set(shapes[name]());
    aB.needsUpdate = true;
    uniforms.uMix.value = 0;
    tween && tween.kill && tween.kill();
    const G = typeof gsap !== "undefined" && !reduced;
    if (G) {
      tween = gsap.to(uniforms.uMix, { value: 1, duration: 2.4, ease: "power1.inOut" });
      gsap.to(uniforms.uStream, { value: STREAM[name] || 0, duration: 1.5 });
    } else { uniforms.uMix.value = 1; uniforms.uStream.value = STREAM[name] || 0; }
  }

  let pulse = 0;
  window.HAAPS_SCENE = {
    setShape: (n, o) => { if (n === "logo") state.logoOpts = o; setShape(n, o); },
    setZoom: (z) => { state.zoom = z; },
    setAlpha: (a) => { state.alpha = a; },
    setDepth: (z) => { state.z = z; },
    pulse: () => { pulse = 1; },
  };
  loadLogo().then(() => { if (state.shape === "logo") { state.shape = null; setShape("logo", state.logoOpts || {}); } });

  /* ---------------- loop ---------------- */
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) tick(); });

  let lastY = window.scrollY, vel = 0;
  const clock = new THREE.Clock();
  function tick() {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    uniforms.uTime.value = reduced ? t * 0.2 : t;

    const y = window.scrollY;
    vel += ((y - lastY) - vel) * 0.1;
    lastY = y;

    pulse *= 0.94;
    uniforms.uAlpha.value += (state.alpha - uniforms.uAlpha.value) * 0.05;
    lineMat.opacity += (state.lines * state.alpha - lineMat.opacity) * 0.05;

    group.position.x += (state.x - group.position.x) * 0.045;
    group.position.y += (state.y - group.position.y) * 0.045;
    group.position.z += (state.z - group.position.z) * 0.08;
    const target = state.scale * state.zoom * (1 + pulse * 0.06);
    group.scale.setScalar(group.scale.x + (target - group.scale.x) * 0.06);

    if (!reduced) {
      group.rotation.y += dt * state.spinY + vel * 0.0006;
      group.rotation.z += dt * state.spinZ;
    }
    if (state.shape === "logo") {
      // ease back to face the camera so the logo stays readable
      const k = Math.round(group.rotation.y / (Math.PI * 2)) * Math.PI * 2;
      group.rotation.y += (k + Math.sin(t * 0.5) * 0.18 - group.rotation.y) * 0.05;
      group.rotation.z += (0 - group.rotation.z) * 0.05;
    }
    group.rotation.x = Math.sin(t * 0.2) * 0.08;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
