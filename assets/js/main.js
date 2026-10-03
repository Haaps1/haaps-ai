/* =========================================================
   HAAPS — site interactions
   GSAP + ScrollTrigger + Lenis
   ========================================================= */

/* ---------- Business config: edit these placeholders ---------- */
const HAAPS = {
  phone: "+91 98765 43210",           // TODO: replace with real number
  phoneHref: "+919876543210",
  whatsapp: "919876543210",            // number in international format, no "+"
  email: "hello@haaps.in",             // TODO: replace with real email
  address: "Your Office Address, Bangalore, Karnataka 560001", // TODO: replace
  hours: "Mon – Sat · 10:00 AM – 7:00 PM",
  // Paste a form endpoint (e.g. Formspree / Getform / your backend) to receive leads.
  // Leave empty to show the success screen + offer WhatsApp hand-off.
  formEndpoint: "",
  socials: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
};

const ICON = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-10 6L2 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 13.9 13.9 0 0 0 5.3 4.7c2 .8 2.7.9 3.7.8a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9a1 1 0 0 1 1-1z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z"/></svg>',
};

const SERVICES = [
  ["smm", "Social Media Marketing"],
  ["reels", "Reels & Short Video"],
  ["leads", "Lead Generation Ads"],
  ["video-editing", "Video Editing"],
  ["ai-video", "AI Video"],
  ["websites", "Website Development"],
  ["seo", "SEO"],
  ["ai-automation", "AI Automation"],
];

const page = document.body.dataset.page || "home";
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
document.documentElement.classList.remove("no-js");

// swap broken placeholder photos for a brand gradient
const markBroken = (img) => { img.dataset.failed = "1"; img.parentElement && img.parentElement.classList.add("img-fallback"); };
window.addEventListener("error", (e) => { if (e.target && e.target.tagName === "IMG") markBroken(e.target); }, true);
document.querySelectorAll("img").forEach((img) => { if (img.complete && img.naturalWidth === 0 && img.src) markBroken(img); });
if (reduced) document.documentElement.classList.add("reduced");
function leadFormHTML(id, title = "Get your free growth plan", sub = "Tell us about your business — we reply within 2 working hours.") {
  const chips = SERVICES.map(([v, l], i) => `<input type="checkbox" id="${id}-s${i}" name="services" value="${l}"><label for="${id}-s${i}">${l}</label>`).join("");
  return `
  <form class="lead-form" id="${id}" novalidate>
    <h2>${title}</h2>
    <p>${sub}</p>
    <div class="form-row">
      <div class="field"><input type="text" id="${id}-name" name="name" placeholder=" " autocomplete="name" required><label for="${id}-name">Your name *</label><div class="err">Please enter your name</div></div>
      <div class="field"><input type="tel" id="${id}-phone" name="phone" placeholder=" " autocomplete="tel" required><label for="${id}-phone">Phone / WhatsApp *</label><div class="err">Enter a valid 10-digit number</div></div>
    </div>
    <div class="form-row">
      <div class="field"><input type="email" id="${id}-email" name="email" placeholder=" " autocomplete="email"><label for="${id}-email">Email</label><div class="err">Enter a valid email</div></div>
      <div class="field"><input type="text" id="${id}-biz" name="business" placeholder=" " autocomplete="organization"><label for="${id}-biz">Business / Brand</label></div>
    </div>
    <span class="chip-label">What do you need?</span>
    <div class="chips">${chips}</div>
    <div class="field"><textarea id="${id}-msg" name="message" placeholder=" "></textarea><label for="${id}-msg">Tell us about your goals</label></div>
    <button type="submit" class="btn btn--primary" style="width:100%" data-magnetic>
      <span class="btn__label">Get My Free Strategy Call</span>${ICON.arrow}
    </button>
    <p class="form-note">🔒 No spam. Your details stay with Haaps.</p>
    <div class="form-success" role="status" aria-live="polite">
      <div>
        <div class="tick">${ICON.check}</div>
        <h3>You're in! 🚀</h3>
        <p>Thanks — our Bangalore team will call you shortly.<br>Want a faster reply? Ping us on WhatsApp.</p>
        <a class="btn btn--primary wa-handoff" href="#" target="_blank" rel="noopener"><span class="btn__label">Continue on WhatsApp</span>${ICON.arrow}</a>
      </div>
    </div>
  </form>`;
}

const WA_LINK = () => `https://wa.me/${HAAPS.whatsapp}?text=${encodeURIComponent("Hi Haaps! I'd like to grow my business.")}`;

function renderPartials() {
  const nav = [
    ["index.html", "Home", "home"],
    ["services.html", "Services", "services"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"],
  ];
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="ambient" aria-hidden="true"></div>
    <div class="bg-noise" aria-hidden="true"></div>
    <header class="site-header">
      <div class="container nav">
        <a href="index.html" class="nav__logo" aria-label="Haaps home"><img src="assets/img/logo.png" alt="Haaps Digital Marketing Agency" width="600" height="404"></a>
        <a href="#" class="pill" data-modal-open>Contact us <i></i></a>
      </div>
    </header>
    <nav class="dock" aria-label="Main">${nav.map(([h, l, k]) => `<a href="${h}" class="${k === page ? "is-active" : ""}">${l}</a>`).join("")}</nav>
    ${page === "home" ? '<div class="scroll-cue">Scroll to explore</div>' : ""}
    <a class="wa-float" href="${WA_LINK()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.whatsapp.replace('fill="#fff"', 'fill="#25d366"')}</a>`);

  const year = new Date().getFullYear();
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer">
      <div class="container">
        <div class="f3">
          <div class="f3__brand">
            <h2>HAAPS —<br><span>tailored digital marketing solutions.</span></h2>
          </div>
          <div>
            <h4>Services</h4>
            <ul>${SERVICES.map(([id, l]) => `<li><a href="services.html#${id}">${l}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:${HAAPS.phoneHref}">${HAAPS.phone}</a></li>
              <li><a href="mailto:${HAAPS.email}">${HAAPS.email}</a></li>
              <li style="color:rgba(255,255,255,.55)">${HAAPS.address}</li>
              <li style="color:rgba(255,255,255,.55)">${HAAPS.hours}</li>
            </ul>
            <h4 style="margin-top:30px">Social</h4>
            <ul>
              <li><a href="${HAAPS.socials.instagram}">Instagram</a></li>
              <li><a href="${HAAPS.socials.linkedin}">LinkedIn</a></li>
              <li><a href="${HAAPS.socials.youtube}">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div class="f3__bottom"><span>© ${year} Haaps. All rights reserved.</span><span>Digital Marketing Agency in Bangalore</span></div>
      </div>
    </footer>
    <div class="modal" role="dialog" aria-modal="true" aria-label="Free consultation">
      <div class="modal__bg" data-modal-close></div>
      <div class="modal__box" data-lenis-prevent>
        <button class="modal__close" data-modal-close aria-label="Close">${ICON.close}</button>
        <div class="form-card">${leadFormHTML("modal-form", "Let's grow your brand", "Free 30-min strategy call. No obligations.")}</div>
      </div>
    </div>`);

  document.querySelectorAll("[data-lead-form]").forEach((el, i) => (el.innerHTML = leadFormHTML("lead-form-" + i)));
  document.querySelectorAll("[data-phone]").forEach((el) => { el.textContent = HAAPS.phone; if (el.tagName === "A") el.href = "tel:" + HAAPS.phoneHref; });
  document.querySelectorAll("[data-email]").forEach((el) => { el.textContent = HAAPS.email; if (el.tagName === "A") el.href = "mailto:" + HAAPS.email; });
  document.querySelectorAll("[data-phone-card]").forEach((el) => (el.href = "tel:" + HAAPS.phoneHref));
  document.querySelectorAll("[data-email-card]").forEach((el) => (el.href = "mailto:" + HAAPS.email));
  document.querySelectorAll("[data-address]").forEach((el) => (el.textContent = HAAPS.address));
  document.querySelectorAll("[data-hours]").forEach((el) => (el.textContent = HAAPS.hours));
  document.querySelectorAll("[data-wa]").forEach((el) => (el.href = WA_LINK()));
}
renderPartials();

/* =========================================================
   Smooth scroll + GSAP
   ========================================================= */
const hasGSAP = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
const G = hasGSAP && !reduced;
if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

let lenis = null;
if (!reduced && typeof Lenis !== "undefined") {
  lenis = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  if (hasGSAP) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}
const scrollToTarget = (target, offset = 0) => {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.6 });
  else window.scrollTo({ top: typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
};
const SCENE = window.HAAPS_SCENE;
const isSmall = () => window.innerWidth < 768;

/* =========================================================
   Text helpers
   ========================================================= */
function wrapWords(el, cls = "w") {
  const words = [];
  const walk = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) return frag.appendChild(document.createTextNode(" "));
        const s = document.createElement("span"); s.className = cls; s.style.display = "inline-block"; s.textContent = p; frag.appendChild(s); words.push(s);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== "SVG" && n.tagName !== "svg" && !n.classList.contains("dotmark")) {
      if (n.classList.contains("grad-text")) { n.style.display = "inline-block"; words.push(n); }
      else walk(n);
    } else if (n.nodeType === 1) { n.style.display = "inline-block"; words.push(n); }
  });
  walk(el);
  return words;
}

/* =========================================================
   Scene zones: each section tells the particles what to become
   ========================================================= */
function sceneZones() {
  const zones = [...document.querySelectorAll("[data-shape]")];
  if (!SCENE) return;
  let altTimer = null;
  const opts = (el) => {
    const d = el.dataset, sm = isSmall();
    return {
      x: parseFloat(sm && d.shapeMx !== undefined ? d.shapeMx : d.shapeX || 0),
      y: parseFloat(sm && d.shapeMy !== undefined ? d.shapeMy : d.shapeY || 0),
      scale: parseFloat(d.scale || 1),
    };
  };
  const activate = (el) => {
    clearInterval(altTimer);
    SCENE.setZoom(1);
    SCENE.setDepth(0);
    SCENE.setAlpha(parseFloat(el.dataset.alpha || 1));
    SCENE.setShape(el.dataset.shape, opts(el));
    if (el.dataset.alt) {
      let flip = false;
      altTimer = setInterval(() => { flip = !flip; SCENE.setShape(flip ? el.dataset.alt : el.dataset.shape, opts(el)); }, 4200);
    }
  };
  if (!zones.length) { SCENE.setShape("blob", { x: 0.55, y: 0.25, scale: 0.6 }); SCENE.setAlpha(0.7); return; }
  activate(zones[0]);
  if (hasGSAP) zones.forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", refreshPriority: -1, onToggle: (s) => s.isActive && activate(el) }));
}

/* =========================================================
   Home page choreography
   ========================================================= */
function home() {
  if (!G) return;
  const vw = () => window.innerWidth;

  // intro
  gsap.from(".h-hero .line > span", { yPercent: 110, duration: 1.5, ease: "expo.out", stagger: 0.12, delay: 0.3 });
  gsap.from(".h-hero .label, .h-hero .pill, [data-intro]", { opacity: 0, y: 16, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 0.9 });
  gsap.from(".site-header, .dock, .scroll-cue", { opacity: 0, y: (i) => (i === 0 ? -20 : 20), duration: 1.2, ease: "power3.out", delay: 1.1 });

  // 1. hero: headline halves slide apart, object grows
  const hero = document.querySelector(".h-hero");
  if (hero) {
    gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: 0.8, onUpdate: (s) => SCENE && SCENE.setZoom(1 + s.progress * 1.1) } })
      .to(".h-hero__l", { x: () => -vw() * 0.45, opacity: 0, ease: "power2.in" }, 0)
      .to(".h-hero__r", { x: () => vw() * 0.45, opacity: 0, ease: "power2.in" }, 0)
      .to(".h-hero__note", { y: -60, opacity: 0, ease: "none" }, 0);
    ScrollTrigger.create({ start: 80, onEnter: () => document.querySelector(".scroll-cue")?.classList.add("is-hidden"), onLeaveBack: () => document.querySelector(".scroll-cue")?.classList.remove("is-hidden") });
  }

  // 2. plexus
  const plex = document.querySelector(".h-plex");
  if (plex) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: plex, start: "top top", end: "bottom bottom", scrub: 0.8 } });
    tl.from(".h-plex .label", { opacity: 0, y: 20, duration: 0.15 })
      .from(".h-plex .line > span", { yPercent: 110, stagger: 0.08, duration: 0.25 }, 0.05)
      .from(".plex-p", { opacity: 0, y: 20, duration: 0.15 }, 0.25)
      .from(".node", { opacity: 0, scale: 0.6, stagger: 0.04, duration: 0.15 }, 0.1)
      .to(".node", { y: (i) => (i % 2 ? -80 : 80), duration: 0.6, ease: "none" }, 0.3)
      .to(".h-plex__text", { opacity: 0, y: -40, duration: 0.15 }, 0.85);
  }

  // 3. beam + frame
  const beam = document.querySelector(".h-beam");
  if (beam) {
    gsap.timeline({ scrollTrigger: { trigger: beam, start: "top top", end: "bottom bottom", scrub: 0.8, onUpdate: (s) => SCENE && SCENE.setZoom(0.75 + s.progress * 0.7) } })
      .fromTo(".frame", { scale: 0.55, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      .from(".beam", { opacity: 0, scaleY: 0.4, duration: 0.35 }, 0)
      .fromTo(".frame__corners", { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, 0.15)
      .from(".h-beam__copy .line > span", { yPercent: 110, duration: 0.2 }, 0.2)
      .from(".h-beam__copy .pill, .h-beam__side", { opacity: 0, y: 20, duration: 0.2 }, 0.3)
      .to(".frame", { scale: 1.15, opacity: 0, duration: 0.25, ease: "power2.in" }, 0.75)
      .to(".beam, .h-beam__copy, .h-beam__side", { opacity: 0, duration: 0.2 }, 0.8);
  }

  // 4. field statement: words come out of the blur
  const ft = document.querySelector(".field-text");
  if (ft) {
    const words = wrapWords(ft);
    gsap.to(words, { opacity: 1, filter: "blur(0px)", stagger: 0.12, ease: "none", scrollTrigger: { trigger: ".h-field", start: "top 70%", end: "center 45%", scrub: true } });
  }

  // 5. tunnel fly-through
  const tunnel = document.querySelector(".h-tunnel");
  if (tunnel) {
    const panels = [...tunnel.querySelectorAll(".panel")];
    const idx = tunnel.querySelector(".t-idx");
    const D = 1100;
    const place = (p) => {
      const travel = p * (panels.length * D + 300);
      const sm = isSmall();
      let front = 0;
      panels.forEach((el, i) => {
        const z = -i * D - 600 + travel;
        const side = i % 2 ? 1 : -1;
        const x = side * (sm ? 0.06 : 0.22) * window.innerWidth;
        const y = (i % 3 - 1) * (sm ? 30 : 70);
        let o = 1;
        if (z < -3200) o = 0; else if (z < -1600) o = (z + 3200) / 1600;
        if (z > 250) o = Math.max(0, 1 - (z - 250) / 400);
        el.style.opacity = o;
        el.style.visibility = o <= 0.01 ? "hidden" : "visible";
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${-side * 8}deg)`;
        if (z > -900 && z < 400) front = i;
      });
      idx.textContent = String(front + 1).padStart(2, "0");
      SCENE && SCENE.setDepth(p * 32);
    };
    place(0);
    ScrollTrigger.create({ trigger: tunnel, start: "top top", end: "bottom bottom", scrub: true, onUpdate: (s) => place(s.progress) });
    gsap.from(".tunnel__head, .tunnel__count", { opacity: 0, y: 30, duration: 1, scrollTrigger: { trigger: tunnel, start: "top 60%" } });
  }
}

/* =========================================================
   Shared reveals (all pages)
   ========================================================= */
function reveals() {
  if (!G) {
    document.querySelectorAll("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    return;
  }
  ScrollTrigger.batch("[data-reveal]", { start: "top 90%", once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, overwrite: true }) });

  // headings: words rise out of a soft blur
  document.querySelectorAll("[data-words], [data-chars], [data-split], .page-hero h1").forEach((el) => {
    if (el._done) return; el._done = true;
    const words = wrapWords(el, "w2");
    const inHero = el.closest(".page-hero");
    gsap.from(words, { opacity: 0, y: 30, filter: "blur(10px)", duration: 1.3, ease: "expo.out", stagger: 0.07, delay: inHero ? 0.2 : 0, scrollTrigger: inHero ? null : { trigger: el, start: "top 85%" } });
  });
  gsap.from(".page-hero .lead, .page-hero .crumbs, .page-hero .hero__actions", { opacity: 0, y: 20, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 0.5 });

  document.querySelectorAll("[data-speed]").forEach((el) => {
    const s = parseFloat(el.dataset.speed);
    gsap.fromTo(el, { yPercent: -s * 10 }, { yPercent: s * 10, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });
  document.querySelectorAll("[data-clip]").forEach((el) => gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%" } }));

  // services page: stacking cards
  const svcs = gsap.utils.toArray(".svc");
  if (svcs.length && window.innerWidth > 960) svcs.forEach((card, i) => {
    if (i === svcs.length - 1) return;
    gsap.to(card, { scale: 0.92, opacity: 0.3, ease: "none", scrollTrigger: { trigger: svcs[i + 1], start: "top 85%", end: "top 150px", scrub: true } });
  });

  // about page: timeline
  const tl = document.querySelector(".timeline");
  if (tl) {
    gsap.to(".timeline__fill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 60%", scrub: true } });
    gsap.utils.toArray(".tl-item").forEach((it) => gsap.from(it, { x: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: it, start: "top 85%" } }));
  }
  document.querySelectorAll(".cta-box").forEach((box) => gsap.from(box, { scale: 0.9, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: box, start: "top 85%" } }));
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

function counters() {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", dec = (el.dataset.count.split(".")[1] || "").length;
    if (!G) { el.textContent = end.toFixed(dec) + suf; return; }
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 2.2, ease: "power3.out", onUpdate: () => (el.textContent = o.v.toFixed(dec) + suf) });
  }), { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
}

function marquees() {
  document.querySelectorAll(".marquee__track").forEach((track) => {
    const item = track.querySelector(".marquee__item");
    if (!item) return;
    while (track.scrollWidth < window.innerWidth * 2.5) track.appendChild(item.cloneNode(true));
    track.appendChild(item.cloneNode(true));
    if (!G) return;
    const w = item.offsetWidth, dir = track.dataset.dir === "right" ? 1 : -1;
    gsap.fromTo(track, { x: dir > 0 ? -w : 0 }, { x: dir > 0 ? 0 : -w, duration: w / 60, ease: "none", repeat: -1 });
  });
}

/* =========================================================
   Navigation, FAQ, modal, forms
   ========================================================= */
function navigation() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((a) => a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); scrollToTarget(t, -100); }
  }));
  const subLinks = document.querySelectorAll(".svc-nav a");
  if (subLinks.length) {
    const map = new Map([...subLinks].map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      subLinks.forEach((l) => l.classList.remove("is-active"));
      const l = map.get(en.target.id);
      if (l) { l.classList.add("is-active"); l.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".svc[id]").forEach((s) => io.observe(s));
  }
  if (location.hash) {
    const t = document.querySelector(location.hash);
    if (t) setTimeout(() => scrollToTarget(t, -140), 700);
  }
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

function faq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q"), a = item.querySelector(".faq-a");
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((o) => { if (o !== item) { o.classList.remove("is-open"); o.querySelector(".faq-a").style.height = 0; o.querySelector(".faq-q").setAttribute("aria-expanded", "false"); } });
      item.classList.toggle("is-open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.height = open ? 0 : a.scrollHeight + "px";
    });
  });
}

const modalEl = () => document.querySelector(".modal");
function openModal(service) {
  const m = modalEl();
  if (!m) return;
  if (service) m.querySelectorAll('input[name="services"]').forEach((c) => (c.checked = c.value === service));
  m.classList.add("is-open");
  if (lenis) lenis.stop();
  document.documentElement.style.overflow = "hidden";
  setTimeout(() => m.querySelector("input[name=name]")?.focus({ preventScroll: true }), 400);
}
function closeModal() {
  const m = modalEl();
  if (!m || !m.classList.contains("is-open")) return;
  m.classList.remove("is-open");
  if (lenis) lenis.start();
  document.documentElement.style.overflow = "";
}

function forms() {
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-modal-open]");
    if (o) { e.preventDefault(); openModal(o.dataset.service); }
    if (e.target.closest("[data-modal-close]")) closeModal();
  });
  document.querySelectorAll(".lead-form").forEach((form) => {
    const setErr = (name, bad) => { const f = form.querySelector(`[name=${name}]`); if (f) f.closest(".field").classList.toggle("has-error", bad); return bad; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").trim();
      const phone = (fd.get("phone") || "").replace(/[^\d]/g, "");
      const email = (fd.get("email") || "").trim();
      let bad = false;
      bad = setErr("name", name.length < 2) || bad;
      bad = setErr("phone", phone.length < 10 || phone.length > 13) || bad;
      bad = setErr("email", !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || bad;
      if (bad) return;
      const btn = form.querySelector("button[type=submit] .btn__label");
      const old = btn.textContent;
      btn.textContent = "Sending…";
      const services = fd.getAll("services").join(", ");
      const payload = { name, phone: fd.get("phone"), email, business: fd.get("business"), services, message: fd.get("message"), page: location.pathname, source: "haaps-website" };
      try {
        if (HAAPS.formEndpoint) await fetch(HAAPS.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
        else await new Promise((r) => setTimeout(r, 900));
      } catch (err) { /* WhatsApp hand-off below is the fallback */ }
      const msg = `Hi Haaps! I'm ${name}${payload.business ? " from " + payload.business : ""}. I'm interested in: ${services || "growing my business"}. ${payload.message || ""}`.trim();
      form.querySelector(".wa-handoff").href = `https://wa.me/${HAAPS.whatsapp}?text=${encodeURIComponent(msg)}`;
      form.querySelector(".form-success").classList.add("is-visible");
      btn.textContent = old;
      form.reset();
      SCENE && SCENE.pulse();
    });
    form.querySelectorAll("input, textarea").forEach((i) => i.addEventListener("input", () => i.closest(".field")?.classList.remove("has-error")));
  });
}

/* =========================================================
   Boot
   ========================================================= */
navigation();
forms();
faq();
counters();
marquees();
sceneZones();
if (page === "home") home();
reveals();
