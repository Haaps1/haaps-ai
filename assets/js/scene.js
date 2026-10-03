/* =========================================================
   HAAPS — 3D background (Three.js)
   Morphing gradient blob + orbiting rings + particle galaxy.
   Fixed behind every page; reacts to mouse and scroll.
   ========================================================= */
(function () {
  const canvas = document.getElementById("webgl");
  if (!canvas || typeof THREE === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const scene3d = document.body.dataset.scene || "home";

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    canvas.style.display = "none";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07030c, 0.035);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  /* ---------- Simplex noise (Ashima Arts) ---------- */
  const noise = `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  /* ---------- Morphing blob ---------- */
  const blobUniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.42 },
    uFreq: { value: 1.25 },
    uMouse: { value: new THREE.Vector2() },
    uPink: { value: new THREE.Color(0xf2006d) },
    uPurple: { value: new THREE.Color(0x9b0098) },
    uViolet: { value: new THREE.Color(0x5b1fd1) },
  };

  const blobMat = new THREE.ShaderMaterial({
    uniforms: blobUniforms,
    vertexShader: `
      uniform float uTime; uniform float uAmp; uniform float uFreq; uniform vec2 uMouse;
      varying vec3 vNormal; varying vec3 vView; varying float vNoise; varying vec3 vPos;
      ${noise}
      void main(){
        vec3 p = position;
        float n = snoise(p * uFreq + vec3(uTime * .35, uTime * .22, uMouse.x * .4));
        float n2 = snoise(p * uFreq * 2.2 - vec3(uTime * .3)) * .35;
        float d = (n + n2) * uAmp;
        p += normal * d;
        vNoise = n;
        vPos = p;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vView = normalize(-mv.xyz);
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uPink; uniform vec3 uPurple; uniform vec3 uViolet; uniform float uTime;
      varying vec3 vNormal; varying vec3 vView; varying float vNoise; varying vec3 vPos;
      void main(){
        float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
        float t = smoothstep(-1.0, 1.0, vNoise + vPos.y * .35);
        vec3 col = mix(uPurple, uPink, t);
        col = mix(col, uViolet, smoothstep(.4, 1.0, -vPos.x * .4 + .3) * .5);
        // iridescent sheen
        float band = sin((vPos.y + vPos.x) * 3.0 + uTime) * .5 + .5;
        col += vec3(1.0, .55, .85) * band * fres * .55;
        col += fres * vec3(1.0, .3, .7) * .9;
        float light = max(dot(vNormal, normalize(vec3(.5, .8, .6))), 0.0);
        col *= .45 + light * .75;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });

  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, isMobile ? 48 : 96), blobMat);
  const blobGroup = new THREE.Group();
  blobGroup.add(blob);
  scene.add(blobGroup);

  // glow halo (sprite with radial gradient)
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 256;
  const g = glowCanvas.getContext("2d");
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(242,0,109,0.55)");
  grd.addColorStop(0.4, "rgba(155,0,152,0.22)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(glowCanvas), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.scale.set(9, 9, 1);
  blobGroup.add(glow);

  /* ---------- Orbit rings ---------- */
  const rings = new THREE.Group();
  const ringMat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, wireframe: false });
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 16, 200), ringMat(0xf2006d, 0.7));
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.008, 16, 200), ringMat(0x9b0098, 0.55));
  const r3 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.005, 16, 200), ringMat(0xffffff, 0.18));
  r1.rotation.set(1.2, 0.3, 0);
  r2.rotation.set(1.6, -0.5, 0.4);
  r3.rotation.set(0.9, 0.8, -0.3);
  rings.add(r1, r2, r3);

  // satellites travelling on rings
  const satGeo = new THREE.SphereGeometry(0.07, 16, 16);
  const sats = [
    { ring: r1, r: 2.6, speed: 0.6, mesh: new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xffffff })) },
    { ring: r2, r: 3.1, speed: -0.4, mesh: new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xf2006d })) },
    { ring: r3, r: 3.6, speed: 0.25, mesh: new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xff7ac0 })) },
  ];
  sats.forEach((s) => s.ring.add(s.mesh));
  blobGroup.add(rings);

  /* ---------- Floating wireframe shapes ---------- */
  const shapes = new THREE.Group();
  const wire = (geo, color) => new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 }));
  const shapeDefs = [
    [new THREE.OctahedronGeometry(0.45), 0xf2006d, [-5.5, 2.4, -2]],
    [new THREE.TetrahedronGeometry(0.5), 0x9b0098, [5.8, -2.6, -3]],
    [new THREE.TorusKnotGeometry(0.3, 0.09, 64, 8), 0xff5ca8, [-4.6, -3, -1]],
    [new THREE.IcosahedronGeometry(0.38), 0xc8008a, [4.2, 3.2, -2.5]],
    [new THREE.BoxGeometry(0.5, 0.5, 0.5), 0x7a2cff, [-7, -0.5, -4]],
  ];
  shapeDefs.forEach(([geo, col, pos], i) => {
    const m = wire(geo, col);
    m.position.set(...pos);
    m.userData = { base: m.position.clone(), speed: 0.3 + i * 0.12, off: i * 1.7 };
    shapes.add(m);
  });
  scene.add(shapes);

  /* ---------- Particle galaxy ---------- */
  const COUNT = isMobile ? 1400 : 3500;
  const pGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  const cA = new THREE.Color(0xf2006d), cB = new THREE.Color(0x9b0098), cC = new THREE.Color(0xffffff);
  for (let i = 0; i < COUNT; i++) {
    const r = 4 + Math.pow(Math.random(), 0.6) * 22;
    const branch = (i % 3) / 3 * Math.PI * 2;
    const spin = r * 0.35;
    const rx = (Math.random() - 0.5) * Math.pow(Math.random(), 2) * 6;
    const ry = (Math.random() - 0.5) * Math.pow(Math.random(), 2) * 4;
    const rz = (Math.random() - 0.5) * Math.pow(Math.random(), 2) * 6;
    pos[i * 3] = Math.cos(branch + spin) * r + rx;
    pos[i * 3 + 1] = ry + (Math.random() - 0.5) * 6;
    pos[i * 3 + 2] = Math.sin(branch + spin) * r + rz - 8;
    const c = Math.random() < 0.15 ? cC : cA.clone().lerp(cB, Math.random());
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    sizes[i] = Math.random() * 1.6 + 0.4;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  pGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const pMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
    vertexShader: `
      attribute float aSize; varying vec3 vColor; uniform float uTime; uniform float uPR;
      void main(){
        vColor = color;
        vec3 p = position;
        p.y += sin(uTime * .5 + position.x * .3) * .25;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * 22.0 * uPR / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      varying vec3 vColor;
      void main(){
        float d = length(gl_PointCoord - .5);
        float a = smoothstep(.5, 0.0, d);
        gl_FragColor = vec4(vColor, a * .9);
      }`,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ---------- Layout per page ---------- */
  const layout = () => {
    const w = window.innerWidth;
    if (scene3d === "home") {
      if (w < 768) { blobGroup.position.set(1.9, 2.6, -2.5); blobGroup.scale.setScalar(0.7); }
      else if (w < 1100) { blobGroup.position.set(2.2, 0.4, -1); blobGroup.scale.setScalar(0.95); }
      else { blobGroup.position.set(3.1, 0.1, 0); blobGroup.scale.setScalar(1); }
    } else {
      if (w < 768) { blobGroup.position.set(1.4, 2.2, -3); blobGroup.scale.setScalar(0.65); }
      else { blobGroup.position.set(4.2, 1.2, -2); blobGroup.scale.setScalar(0.75); }
    }
    blobGroup.userData.base = blobGroup.position.clone();
  };
  layout();

  /* ---------- Interaction ---------- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  let scrollP = 0;
  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollP = window.scrollY / max;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    layout();
  });

  // pause rendering when tab hidden
  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) tick(); });

  // public hook so main.js can pulse the blob (e.g. on CTA hover)
  let pulse = 0;
  window.HAAPS_SCENE = { pulse: () => { pulse = 1; } };

  const clock = new THREE.Clock();
  function tick() {
    if (!running) return;
    const t = clock.getElapsedTime();
    const speed = reduced ? 0.15 : 1;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    pulse *= 0.94;

    blobUniforms.uTime.value = t * speed;
    blobUniforms.uMouse.value.set(mouse.x, mouse.y);
    blobUniforms.uAmp.value = 0.38 + pulse * 0.35 + Math.sin(t * 0.6) * 0.04;

    blob.rotation.y = t * 0.12 * speed + mouse.x * 0.4;
    blob.rotation.x = mouse.y * 0.3;

    // scroll: blob drifts and rings tilt
    const base = blobGroup.userData.base;
    blobGroup.position.x = base.x + Math.sin(scrollP * Math.PI * 2) * (scene3d === "home" ? -1.4 : 0.6);
    blobGroup.position.y = base.y + scrollP * -1.2 + Math.sin(t * 0.8) * 0.1;
    blobGroup.rotation.z = scrollP * Math.PI * 0.6;

    rings.rotation.y = t * 0.15 * speed + scrollP * 3;
    rings.rotation.x = mouse.y * 0.25;
    sats.forEach((s, i) => {
      const a = t * s.speed * speed + i * 2;
      s.mesh.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, 0);
    });

    shapes.children.forEach((m) => {
      const u = m.userData;
      m.rotation.x = t * u.speed * speed;
      m.rotation.y = t * u.speed * 0.8 * speed;
      m.position.y = u.base.y + Math.sin(t * u.speed + u.off) * 0.4 - scrollP * 3 * u.speed;
      m.position.x = u.base.x + mouse.x * 0.3 * (u.speed + 0.5);
    });

    particles.rotation.y = t * 0.02 * speed + scrollP * 1.2;
    particles.rotation.x = mouse.y * 0.05;
    pMat.uniforms.uTime.value = t;

    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
