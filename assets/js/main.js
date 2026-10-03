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

/* =========================================================
   Partials (header, footer, floating buttons, modal)
   ========================================================= */
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

function renderPartials() {
  const nav = [
    ["index.html", "Home", "home"],
    ["about.html", "About", "about"],
    ["services.html", "Services", "services"],
    ["contact.html", "Contact", "contact"],
  ];
  const links = nav.map(([h, l, k]) => `<a href="${h}" class="${k === page ? "is-active" : ""}">${l}</a>`).join("");

  const before = `
    <div class="preloader" aria-hidden="true">
      <div class="preloader__inner">
        <img class="preloader__logo" src="assets/img/logo.png" alt="">
        <div class="preloader__bar"><span></span></div>
        <div class="preloader__count">0%</div>
      </div>
    </div>
    <div class="transition" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
    <div class="cursor" aria-hidden="true"></div><div class="cursor-dot" aria-hidden="true"></div>
    <div class="progress" aria-hidden="true"></div>
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-noise" aria-hidden="true"></div>
    <header class="site-header">
      <div class="container nav">
        <a href="index.html" class="nav__logo" aria-label="Haaps home"><img src="assets/img/logo.png" alt="Haaps Digital Marketing Agency" width="600" height="404"></a>
        <nav class="nav__links" aria-label="Main">${links}</nav>
        <div class="nav__cta">
          <a href="#" class="btn btn--primary btn--sm" data-modal-open data-magnetic><span class="btn__label">Free Consultation</span>${ICON.arrow}</a>
          <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" aria-hidden="true">
      ${nav.map(([h, l]) => `<a class="m-link" href="${h}"><span>${l}</span></a>`).join("")}
      <div class="mobile-menu__foot">
        <a href="tel:${HAAPS.phoneHref}">${HAAPS.phone}</a>
        <a href="mailto:${HAAPS.email}">${HAAPS.email}</a>
        <span>Bangalore, India</span>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("afterbegin", before);

  const year = new Date().getFullYear();
  const after = `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <img src="assets/img/logo.png" alt="Haaps" width="600" height="404" loading="lazy">
            <p>Haaps is a performance-driven digital marketing &amp; AI agency in Bangalore helping brands get more leads, more reach and more sales.</p>
            <div class="socials">
              <a href="${HAAPS.socials.instagram}" aria-label="Instagram">${ICON.instagram}</a>
              <a href="${HAAPS.socials.facebook}" aria-label="Facebook">${ICON.facebook}</a>
              <a href="${HAAPS.socials.linkedin}" aria-label="LinkedIn">${ICON.linkedin}</a>
              <a href="${HAAPS.socials.youtube}" aria-label="YouTube">${ICON.youtube}</a>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>${nav.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>${SERVICES.map(([id, l]) => `<li><a href="services.html#${id}">${l}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="tel:${HAAPS.phoneHref}">${HAAPS.phone}</a></li>
              <li><a href="mailto:${HAAPS.email}">${HAAPS.email}</a></li>
              <li style="color:var(--muted)">${HAAPS.address}</li>
              <li style="color:var(--muted)">${HAAPS.hours}</li>
            </ul>
          </div>
        </div>
        <div class="footer__big" aria-hidden="true">${"HAAPS".split("").map((c) => `<span>${c}</span>`).join("")}</div>
        <div class="footer__bottom">
          <span>© ${year} Haaps. All rights reserved.</span>
          <span>Digital Marketing Agency in Bangalore</span>
        </div>
      </div>
    </footer>
    <div class="fab">
      <a href="#top" class="back-top" aria-label="Back to top">${ICON.up}</a>
      <a href="tel:${HAAPS.phoneHref}" class="call" aria-label="Call Haaps">${ICON.phone.replace('stroke="currentColor"', 'stroke="#fff"')}</a>
      <a href="https://wa.me/${HAAPS.whatsapp}?text=${encodeURIComponent("Hi Haaps! I'd like to grow my business.")}" class="wa" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.whatsapp}</a>
    </div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="Free consultation">
      <div class="modal__bg" data-modal-close></div>
      <div class="modal__box" data-lenis-prevent>
        <button class="modal__close" data-modal-close aria-label="Close">${ICON.close}</button>
        <div class="form-card">${leadFormHTML("modal-form", "Let's grow your brand 🚀", "Free 30-min strategy call. No obligations.")}</div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", after);

  // fill page placeholders
  document.querySelectorAll("[data-lead-form]").forEach((el, i) => (el.innerHTML = leadFormHTML("lead-form-" + i)));
  document.querySelectorAll("[data-phone]").forEach((el) => { el.textContent = HAAPS.phone; if (el.tagName === "A") el.href = "tel:" + HAAPS.phoneHref; });
  document.querySelectorAll("[data-email]").forEach((el) => { el.textContent = HAAPS.email; if (el.tagName === "A") el.href = "mailto:" + HAAPS.email; });
  document.querySelectorAll("[data-phone-card]").forEach((el) => (el.href = "tel:" + HAAPS.phoneHref));
  document.querySelectorAll("[data-email-card]").forEach((el) => (el.href = "mailto:" + HAAPS.email));
  document.querySelectorAll("[data-address]").forEach((el) => (el.textContent = HAAPS.address));
  document.querySelectorAll("[data-hours]").forEach((el) => (el.textContent = HAAPS.hours));
  document.querySelectorAll("[data-wa]").forEach((el) => (el.href = `https://wa.me/${HAAPS.whatsapp}?text=${encodeURIComponent("Hi Haaps! I'd like to grow my business.")}`));
}
renderPartials();

/* =========================================================
   Smooth scroll (Lenis) + GSAP wiring
   ========================================================= */
const hasGSAP = typeof gsap !== "undefined";
if (hasGSAP && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

let lenis = null;
if (!reduced && typeof Lenis !== "undefined") {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
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
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else {
    const el = typeof target === "number" ? null : target;
    window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY + offset : target, behavior: "smooth" });
  }
};

/* =========================================================
   Text splitting
   ========================================================= */
function splitWords(el) {
  const out = [];
  const wrap = (node) => {
    const line = document.createElement("span");
    line.className = "split-line";
    const inner = document.createElement("span");
    line.appendChild(inner);
    node.parentNode.insertBefore(line, node);
    inner.appendChild(node);
    out.push(inner);
  };
  [...el.childNodes].forEach((node) => {
    if (node.nodeType === 3) {
      const parts = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
        const line = document.createElement("span");
        line.className = "split-line";
        const inner = document.createElement("span");
        inner.textContent = p;
        line.appendChild(inner);
        frag.appendChild(line);
        out.push(inner);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === 1 && node.tagName !== "BR") {
      wrap(node);
    }
  });
  return out;
}

/* =========================================================
   Preloader + intro
   ========================================================= */
function runPreloader(done) {
  const pre = document.querySelector(".preloader");
  if (!pre) return done();
  const seen = sessionStorageGet("haaps-loaded");
  if (!hasGSAP || reduced || seen) {
    pre.remove();
    return done();
  }
  document.body.classList.add("is-loading");
  const bar = pre.querySelector(".preloader__bar span");
  const count = pre.querySelector(".preloader__count");
  const state = { p: 0 };
  gsap.to(state, {
    p: 100, duration: 1.6, ease: "power2.inOut",
    onUpdate: () => { bar.style.width = state.p + "%"; count.textContent = Math.round(state.p) + "%"; },
    onComplete: () => {
      sessionStorageSet("haaps-loaded", "1");
      gsap.timeline({ onComplete: () => { pre.remove(); document.body.classList.remove("is-loading"); } })
        .to(".preloader__inner", { y: -40, opacity: 0, duration: .5, ease: "power3.in" })
        .to(pre, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=.1")
        .add(done, "-=.6");
    },
  });
}
function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

function pageIntro() {
  // reveal page-enter transition panels if coming from a transition
  const panels = document.querySelectorAll(".transition span");
  if (hasGSAP && sessionStorageGet("haaps-transition")) {
    sessionStorageSet("haaps-transition", "");
    gsap.set(panels, { scaleY: 1, transformOrigin: "top" });
    gsap.to(panels, { scaleY: 0, duration: .8, ease: "expo.inOut", stagger: .06 });
  }
  if (!hasGSAP || reduced) return;

  // headline word reveal
  document.querySelectorAll("[data-split]").forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, { yPercent: 115, rotate: 4, duration: 1.2, ease: "expo.out", stagger: .06, delay: .15 });
  });
  gsap.from(".hero__badge, .crumbs", { y: 20, opacity: 0, duration: .9, ease: "power3.out", delay: .1 });
  gsap.from(".hero__sub > *, .page-hero .lead, .page-hero .hero__actions", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: .12, delay: .55 });
  gsap.from(".hero__meta > div", { y: 30, opacity: 0, duration: .9, ease: "power3.out", stagger: .1, delay: .8 });
  gsap.from(".float-chip", { scale: .6, opacity: 0, duration: 1, ease: "back.out(1.7)", stagger: .15, delay: 1 });
  gsap.from(".site-header", { yPercent: -100, opacity: 0, duration: 1, ease: "expo.out" });
}

/* =========================================================
   Scroll animations
   ========================================================= */
function scrollAnimations() {
  if (!hasGSAP || reduced || typeof ScrollTrigger === "undefined") {
    document.querySelectorAll("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
    document.querySelectorAll(".intro__text .word").forEach((w) => (w.style.opacity = 1));
    return;
  }

  // generic reveals (batched)
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: .1, overwrite: true }),
  });

  // section titles: split + reveal on scroll
  document.querySelectorAll("[data-split-scroll]").forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, { yPercent: 115, rotate: 3, duration: 1.1, ease: "expo.out", stagger: .05, scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  // scrubbed word highlight
  document.querySelectorAll(".intro__text").forEach((el) => {
    const words = [];
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) return frag.appendChild(document.createTextNode(" "));
            const s = document.createElement("span");
            s.className = "word";
            s.textContent = p;
            frag.appendChild(s);
            words.push(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    gsap.to(words, { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
  });

  // parallax images / elements
  document.querySelectorAll("[data-speed]").forEach((el) => {
    const s = parseFloat(el.dataset.speed);
    gsap.fromTo(el, { yPercent: -s * 10 }, { yPercent: s * 10, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // image reveal clip
  document.querySelectorAll("[data-clip]").forEach((el) => {
    gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  // service cards rise in with 3D
  if (document.querySelector(".services-grid")) {
    gsap.from(".services-grid .s-card", {
      y: 80, rotateX: -18, opacity: 0, transformPerspective: 900, duration: 1.2, ease: "expo.out", stagger: .08,
      scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
    });
  }

  // horizontal pinned process
  const track = document.querySelector(".hscroll__track");
  if (track) {
    const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth + (parseFloat(getComputedStyle(track).paddingLeft) || 32));
    gsap.to(track, {
      x: () => -getDist(), ease: "none",
      scrollTrigger: { trigger: ".hscroll", start: "top top", end: () => "+=" + getDist(), pin: ".hscroll__pin", scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    gsap.utils.toArray(".p-card").forEach((card, i) => {
      gsap.from(card.querySelector(".p-card__step"), { scale: .5, opacity: 0, duration: 1, ease: "back.out(1.6)", scrollTrigger: { trigger: ".hscroll", start: () => `top+=${i * 220} top`, toggleActions: "play none none reverse" } });
    });
  }

  // stacking service cards (services page)
  const svcs = gsap.utils.toArray(".svc");
  if (svcs.length && window.innerWidth > 960) {
    svcs.forEach((card, i) => {
      if (i === svcs.length - 1) return;
      gsap.to(card, {
        scale: .92, opacity: .35, filter: "blur(2px)", ease: "none",
        scrollTrigger: { trigger: svcs[i + 1], start: "top 85%", end: "top 150px", scrub: true },
      });
    });
  }

  // timeline fill
  const tl = document.querySelector(".timeline");
  if (tl) {
    gsap.to(".timeline__fill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 60%", scrub: true } });
    gsap.utils.toArray(".tl-item").forEach((it) => gsap.from(it, { x: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: it, start: "top 85%" } }));
  }

  // footer big letters
  gsap.from(".footer__big span", { yPercent: 100, opacity: 0, rotate: 10, duration: 1.2, ease: "expo.out", stagger: .07, scrollTrigger: { trigger: ".footer__big", start: "top 95%" } });

  // CTA box scale in
  document.querySelectorAll(".cta-box").forEach((box) => {
    gsap.from(box, { scale: .88, borderRadius: "120px", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: box, start: "top 85%" } });
  });

  // marquee skew on scroll velocity
  const tilt = document.querySelectorAll(".marquee");
  if (tilt.length) {
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-8, 8, self.getVelocity() / 300);
        gsap.to(".marquee__item", { skewX: -v, duration: .4, ease: "power3.out", overwrite: true });
      },
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/* =========================================================
   Marquee (infinite, direction follows scroll)
   ========================================================= */
function marquees() {
  document.querySelectorAll(".marquee__track").forEach((track) => {
    const item = track.querySelector(".marquee__item");
    if (!item) return;
    // duplicate content so it loops seamlessly
    while (track.scrollWidth < window.innerWidth * 2.5) track.appendChild(item.cloneNode(true));
    track.appendChild(item.cloneNode(true));
    if (!hasGSAP || reduced) return;
    const dir = track.dataset.dir === "right" ? 1 : -1;
    const w = item.offsetWidth;
    const tween = gsap.fromTo(track, { x: dir > 0 ? -w : 0 }, { x: dir > 0 ? 0 : -w, duration: w / 90, ease: "none", repeat: -1 });
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({ onUpdate: (self) => gsap.to(tween, { timeScale: self.direction * (1 + Math.min(Math.abs(self.getVelocity()) / 800, 3)), duration: .3, overwrite: true, onComplete: () => gsap.to(tween, { timeScale: self.direction, duration: 1 }) }) });
    }
  });
}

/* =========================================================
   Hero word rotator
   ========================================================= */
function rotator() {
  document.querySelectorAll(".rotator").forEach((r) => {
    const items = [...r.children];
    if (items.length < 2) return;
    let i = 0;
    items[0].classList.add("is-active");
    if (!hasGSAP || reduced) return;
    gsap.set(items.slice(1), { yPercent: 110 });
    gsap.set(items[0], { yPercent: 0 });
    setInterval(() => {
      const cur = items[i];
      i = (i + 1) % items.length;
      const next = items[i];
      gsap.to(cur, { yPercent: -110, duration: .8, ease: "expo.inOut" });
      gsap.fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: .8, ease: "expo.inOut" });
    }, 2400);
  });
}

/* =========================================================
   Counters
   ========================================================= */
function counters() {
  const els = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dec = (el.dataset.count.split(".")[1] || "").length;
    if (!hasGSAP || reduced) { el.textContent = end.toFixed(dec) + suffix; return; }
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 2.2, ease: "power3.out", onUpdate: () => (el.textContent = o.v.toFixed(dec) + suffix) });
  };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .5 });
  els.forEach((el) => io.observe(el));
}

/* =========================================================
   Pointer effects: cursor, tilt, magnetic, glow
   ========================================================= */
function pointerFX() {
  // gradient spot on primary buttons (also works on touch-less desktops)
  document.addEventListener("pointermove", (e) => {
    const b = e.target.closest && e.target.closest(".btn--primary");
    if (b) {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", e.clientX - r.left + "px");
      b.style.setProperty("--by", e.clientY - r.top + "px");
    }
  }, { passive: true });

  if (isTouch || reduced) return;

  // custom cursor
  const cur = document.querySelector(".cursor");
  const dot = document.querySelector(".cursor-dot");
  if (cur && hasGSAP) {
    const xTo = gsap.quickTo(cur, "x", { duration: .45, ease: "power3" });
    const yTo = gsap.quickTo(cur, "y", { duration: .45, ease: "power3" });
    const dxTo = gsap.quickTo(dot, "x", { duration: .08 });
    const dyTo = gsap.quickTo(dot, "y", { duration: .08 });
    window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); dxTo(e.clientX); dyTo(e.clientY); }, { passive: true });
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("a, button, label, [data-cursor], input, textarea");
      if (!t) { cur.classList.remove("is-hover", "is-view"); cur.textContent = ""; return; }
      if (t.dataset.cursor) { cur.classList.add("is-view"); cur.textContent = t.dataset.cursor; }
      else { cur.classList.add("is-hover"); cur.classList.remove("is-view"); cur.textContent = ""; }
    });
    document.addEventListener("mouseleave", () => gsap.to([cur, dot], { opacity: 0, duration: .3 }));
    document.addEventListener("mouseenter", () => gsap.to([cur, dot], { opacity: 1, duration: .3 }));
  }

  // 3D tilt + glow tracking
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const max = parseFloat(card.dataset.tilt) || 10;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", px * 100 + "%");
      card.style.setProperty("--my", py * 100 + "%");
      if (hasGSAP) gsap.to(card, { rotateY: (px - .5) * max, rotateX: (.5 - py) * max, transformPerspective: 900, duration: .5, ease: "power3.out" });
    });
    card.addEventListener("pointerleave", () => { if (hasGSAP) gsap.to(card, { rotateY: 0, rotateX: 0, duration: .9, ease: "elastic.out(1, .5)" }); });
  });

  // magnetic elements
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    if (!hasGSAP) return;
    const strength = 0.35;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: .5, ease: "power3.out" });
      const label = el.querySelector(".btn__label");
      if (label) gsap.to(label, { x: (e.clientX - r.left - r.width / 2) * .15, y: (e.clientY - r.top - r.height / 2) * .15, duration: .5 });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, .4)" });
      const label = el.querySelector(".btn__label");
      if (label) gsap.to(label, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, .4)" });
    });
    el.addEventListener("pointerenter", () => window.HAAPS_SCENE && window.HAAPS_SCENE.pulse());
  });

  // CTA spotlight
  document.querySelectorAll(".cta-box").forEach((box) => {
    box.addEventListener("pointermove", (e) => {
      const r = box.getBoundingClientRect();
      box.style.setProperty("--cx", ((e.clientX - r.left) / r.width) * 100 + "%");
      box.style.setProperty("--cy", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  // hero floating chips parallax
  const chips = document.querySelectorAll(".float-chip");
  if (chips.length && hasGSAP) {
    window.addEventListener("pointermove", (e) => {
      const x = e.clientX / window.innerWidth - .5;
      const y = e.clientY / window.innerHeight - .5;
      chips.forEach((c, i) => gsap.to(c, { x: x * (30 + i * 20), y: y * (30 + i * 20), duration: 1, ease: "power3.out" }));
    }, { passive: true });
  }
}

/* =========================================================
   Header, menu, progress, back-to-top
   ========================================================= */
function chrome() {
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".progress");
  const backTop = document.querySelector(".back-top");
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", y > last && y > 400 && !document.body.classList.contains("menu-open"));
    last = y;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    backTop.classList.toggle("is-visible", y > 800);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", (e) => { e.preventDefault(); scrollToTarget(0); });

  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".mobile-menu");
  const toggle = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    if (lenis) open ? lenis.stop() : lenis.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggle(!document.body.classList.contains("menu-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggle(false); closeModal(); } });

  // in-page anchors
  document.querySelectorAll('a[href^="#"]:not([href="#"]):not(.back-top)').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); scrollToTarget(t, -140); }
    });
  });

  // services page sub-nav active state
  const subLinks = document.querySelectorAll(".svc-nav a");
  if (subLinks.length) {
    const map = new Map([...subLinks].map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          subLinks.forEach((l) => l.classList.remove("is-active"));
          const l = map.get(en.target.id);
          if (l) { l.classList.add("is-active"); l.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".svc[id]").forEach((s) => io.observe(s));
  }

  // jump to hash after load (e.g. services.html#seo)
  if (location.hash) {
    const t = document.querySelector(location.hash);
    if (t) setTimeout(() => scrollToTarget(t, -140), 900);
  }
}

/* =========================================================
   Page transitions
   ========================================================= */
function pageTransitions() {
  if (!hasGSAP || reduced) return;
  const panels = document.querySelectorAll(".transition span");
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || a.target === "_blank" || /^https?:/.test(href)) return;
    if (!/\.html(#.*)?$/.test(href)) return;
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      const [path] = href.split("#");
      if (location.pathname.endsWith("/" + path) && href.includes("#")) return; // same page anchor
      e.preventDefault();
      sessionStorageSet("haaps-transition", "1");
      gsap.set(panels, { transformOrigin: "bottom" });
      gsap.to(panels, { scaleY: 1, duration: .6, ease: "expo.inOut", stagger: .05, onComplete: () => (window.location.href = href) });
    });
  });
  // bfcache: reset panels if user navigates back
  window.addEventListener("pageshow", (e) => { if (e.persisted) gsap.set(panels, { scaleY: 0 }); });
}

/* =========================================================
   Testimonials slider
   ========================================================= */
function slider() {
  const wrap = document.querySelector(".t-wrap");
  if (!wrap) return;
  const track = wrap.querySelector(".t-track");
  const slides = track.children.length;
  const dots = wrap.querySelector(".t-dots");
  let i = 0, timer;
  dots.innerHTML = [...Array(slides)].map((_, k) => `<button aria-label="Go to slide ${k + 1}"></button>`).join("");
  const go = (n) => {
    i = (n + slides) % slides;
    track.style.transform = `translateX(-${i * 100}%)`;
    [...dots.children].forEach((d, k) => d.classList.toggle("is-active", k === i));
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
  wrap.querySelector(".t-prev").addEventListener("click", () => { go(i - 1); auto(); });
  wrap.querySelector(".t-next").addEventListener("click", () => { go(i + 1); auto(); });
  [...dots.children].forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
  let sx = null;
  track.addEventListener("pointerdown", (e) => (sx = e.clientX));
  track.addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); auto(); } sx = null; });
  go(0);
  auto();
}

/* =========================================================
   FAQ accordion
   ========================================================= */
function faq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((o) => {
        if (o !== item) { o.classList.remove("is-open"); o.querySelector(".faq-a").style.height = 0; o.querySelector(".faq-q").setAttribute("aria-expanded", "false"); }
      });
      item.classList.toggle("is-open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.height = open ? 0 : a.scrollHeight + "px";
    });
  });
}

/* =========================================================
   Modal + lead forms
   ========================================================= */
const modal = () => document.querySelector(".modal");
function openModal(service) {
  const m = modal();
  if (!m) return;
  if (service) {
    m.querySelectorAll('input[name="services"]').forEach((c) => (c.checked = c.value === service));
  }
  m.classList.add("is-open");
  if (lenis) lenis.stop();
  document.documentElement.style.overflow = "hidden";
  setTimeout(() => { const f = m.querySelector("input[name=name]"); if (f) f.focus({ preventScroll: true }); }, 400);
}
function closeModal() {
  const m = modal();
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
      if (bad) {
        if (hasGSAP) gsap.fromTo(form.querySelector("button[type=submit]"), { x: -8 }, { x: 0, duration: .5, ease: "elastic.out(1, .3)" });
        return;
      }
      const btn = form.querySelector("button[type=submit] .btn__label");
      const old = btn.textContent;
      btn.textContent = "Sending…";
      const services = fd.getAll("services").join(", ");
      const payload = { name, phone: fd.get("phone"), email, business: fd.get("business"), services, message: fd.get("message"), page: location.pathname, source: "haaps-website" };
      try {
        if (HAAPS.formEndpoint) {
          await fetch(HAAPS.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
        } else {
          await new Promise((r) => setTimeout(r, 900));
        }
      } catch (err) { /* still show success; WhatsApp hand-off is the fallback */ }
      const msg = `Hi Haaps! I'm ${name}${payload.business ? " from " + payload.business : ""}. I'm interested in: ${services || "growing my business"}. ${payload.message || ""}`.trim();
      form.querySelector(".wa-handoff").href = `https://wa.me/${HAAPS.whatsapp}?text=${encodeURIComponent(msg)}`;
      form.querySelector(".form-success").classList.add("is-visible");
      btn.textContent = old;
      form.reset();
      window.HAAPS_SCENE && window.HAAPS_SCENE.pulse();
    });
    form.querySelectorAll("input, textarea").forEach((i) => i.addEventListener("input", () => i.closest(".field") && i.closest(".field").classList.remove("has-error")));
  });

  // auto-show lead modal once per session after 35s of browsing (not on contact page)
  if (page !== "contact" && !sessionStorageGet("haaps-popup")) {
    setTimeout(() => {
      if (!document.querySelector(".modal.is-open") && !document.body.classList.contains("menu-open")) {
        sessionStorageSet("haaps-popup", "1");
        openModal();
      }
    }, 45000);
  }
}


/* =========================================================
   CREATIVE LAYER — kinetic type, themes, 3D sections
   ========================================================= */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function scramble(el, to, dur = 0.8) {
  if (reduced) { el.textContent = to; return; }
  const from = el.textContent;
  const len = Math.max(from.length, to.length);
  const q = [];
  for (let i = 0; i < len; i++) { const s = Math.floor(Math.random() * 12); q.push({ from: from[i] || "", to: to[i] || "", start: s, end: s + 8 + Math.floor(Math.random() * 14) }); }
  let frame = 0;
  cancelAnimationFrame(el._scr);
  const total = 60 * dur;
  const step = () => {
    let out = "", done = 0;
    q.forEach((c) => {
      const f = frame * (34 / total);
      if (f >= c.end) { done++; out += c.to; }
      else if (f >= c.start) out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      else out += c.from;
    });
    el.textContent = out;
    if (done < q.length) { frame++; el._scr = requestAnimationFrame(step); }
  };
  step();
}

function splitChars(el) {
  if (el._chars) return el._chars;
  const chars = [];
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(" "));
          const wd = document.createElement("span");
          wd.className = "wd";
          [...w].forEach((ch) => { const c = document.createElement("span"); c.className = "char"; c.textContent = ch; wd.appendChild(c); chars.push(c); });
          frag.appendChild(wd);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  el._chars = chars;
  return chars;
}

function creative() {
  const G = hasGSAP && !reduced && typeof ScrollTrigger !== "undefined";
  const isSmall = () => window.innerWidth < 768;
  const SCENE = window.HAAPS_SCENE;

  /* ---- hover scramble on labels ---- */
  if (!isTouch) document.querySelectorAll("[data-scramble], .nav__links a").forEach((el) => {
    const txt = el.textContent;
    el.addEventListener("pointerenter", () => scramble(el, txt, 0.5));
  });

  /* ---- looping scrambled word ---- */
  document.querySelectorAll("[data-scramble-loop]").forEach((el) => {
    const words = el.dataset.scrambleLoop.split("|");
    let i = 0;
    setInterval(() => { i = (i + 1) % words.length; scramble(el, words[i], 0.9); }, 2600);
  });

  /* ---- character flip reveals ---- */
  document.querySelectorAll("[data-chars]").forEach((el) => {
    const chars = splitChars(el);
    if (!G) return;
    const inHero = el.closest(".k-hero, .page-hero");
    gsap.from(chars, {
      yPercent: 110, rotateX: -100, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.025,
      delay: inHero ? 0.2 + [...document.querySelectorAll(".k-hero [data-chars], .page-hero [data-chars]")].indexOf(el) * 0.15 : 0,
      scrollTrigger: inHero ? null : { trigger: el, start: "top 85%" },
    });
  });
  if (G) {
    gsap.from(".k-word", { scale: 0.3, opacity: 0, rotate: -12, duration: 1.4, ease: "elastic.out(1, .5)", delay: 0.7 });
    gsap.from("[data-fade]", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.9 });
  }

  /* ---- section themes (body colour morph) + particle shapes ---- */
  const BG = { dark: "#07030c", brand: "#f2006d", light: "#f4eef8" };
  const applyTheme = (t) => {
    if (document.body.dataset.theme === t) return;
    document.body.dataset.theme = t;
    if (hasGSAP) gsap.to(document.body, { backgroundColor: BG[t] || BG.dark, duration: 0.8, ease: "power2.out" });
    else document.body.style.backgroundColor = BG[t] || BG.dark;
    SCENE && SCENE.setTheme(t);
  };
  const shapeOpts = (el) => {
    const d = el.dataset;
    const sm = isSmall();
    return {
      x: parseFloat(sm && d.shapeMx !== undefined ? d.shapeMx : d.shapeX || 0),
      y: parseFloat(sm && d.shapeMy !== undefined ? d.shapeMy : d.shapeY || 0),
      scale: parseFloat(d.scale || 1),
    };
  };
  const activate = (el) => {
    if (el.dataset.theme) applyTheme(el.dataset.theme);
    if (el.dataset.shape && SCENE) SCENE.setShape(el.dataset.shape, shapeOpts(el));
  };
  const zones = [...document.querySelectorAll("[data-shape], [data-theme]")];
  if (zones.length) {
    activate(zones[0]);
    if (typeof ScrollTrigger !== "undefined") {
      zones.forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", refreshPriority: -1, onToggle: (self) => self.isActive && activate(el) }));
    }
  } else if (SCENE) SCENE.setShape("sphere", { x: 0.5, y: 0.2, scale: 0.7 });

  if (!G) return;

  /* ---- velocity strip ---- */
  const rows = gsap.utils.toArray(".strip__row");
  if (rows.length) {
    rows.forEach((r) => { const s = r.querySelector("span"); r.innerHTML = s.outerHTML.repeat(4); });
    const pos = rows.map(() => 0);
    let vel = 0;
    ScrollTrigger.create({ trigger: ".strip", start: "top bottom", end: "bottom top", onUpdate: (self) => (vel = self.getVelocity() / 60) });
    gsap.ticker.add(() => {
      vel *= 0.92;
      rows.forEach((r, i) => {
        const dir = +r.dataset.dir;
        const w = r.firstElementChild.offsetWidth;
        pos[i] += dir * (1.2 + Math.abs(vel) * 0.6);
        if (pos[i] <= -w) pos[i] += w;
        if (pos[i] > 0) pos[i] -= w;
        gsap.set(r, { x: pos[i], skewX: gsap.utils.clamp(-14, 14, -vel * 0.6 * dir) });
      });
    });
  }

  /* ---- zoom-through ---- */
  const zoom = document.querySelector(".zoom");
  if (zoom) {
    const word = zoom.querySelector(".zoom__word");
    const L = zoom.querySelector(".zoom__L");
    const setOrigin = () => {
      const wr = word.getBoundingClientRect(), lr = L.getBoundingClientRect();
      gsap.set(word, { transformOrigin: `${lr.left - wr.left + lr.width * 0.2}px ${wr.height * 0.55}px` });
    };
    setOrigin();
    window.addEventListener("resize", setOrigin);
    gsap.timeline({ scrollTrigger: { trigger: zoom, start: "top top", end: "bottom bottom", scrub: 0.6,
      onUpdate: (self) => applyTheme(self.progress > 0.8 ? "brand" : "dark") } })
      .fromTo(word, { scale: 0.6, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 0.25, ease: "none" })
      .to(".zoom__cap", { opacity: 0, y: -40, duration: 0.15 }, 0.25)
      .to(word, { scale: 70, duration: 0.6, ease: "power2.in" }, 0.25)
      .to(".zoom__fill", { opacity: 1, duration: 0.08 }, 0.74)
      .set(word, { opacity: 0 }, 0.84)
      .to(".zoom__fill", { opacity: 0, duration: 0.1 }, 0.88);
  }

  /* ---- manifesto word fill ---- */
  document.querySelectorAll(".manifesto__text").forEach((el) => {
    const words = [];
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) return frag.appendChild(document.createTextNode(" "));
          const sp = document.createElement("span"); sp.className = "word"; sp.textContent = p; frag.appendChild(sp); words.push(sp);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el);
    gsap.to(words, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 50%", scrub: true } });
    gsap.from(".m-pill", { y: 60, opacity: 0, rotate: () => gsap.utils.random(-12, 12), stagger: 0.08, duration: 1, ease: "back.out(1.6)", scrollTrigger: { trigger: ".manifesto__row", start: "top 90%" } });
  });

  /* ---- 3D orbit carousel ---- */
  const orbit = document.querySelector(".orbit");
  if (orbit) {
    const ring = orbit.querySelector(".orbit__ring");
    const cards = [...ring.children];
    const n = cards.length, step = 360 / n;
    const idx = orbit.querySelector(".orbit__idx");
    const ghost = orbit.querySelector(".orbit__ghost");
    const bar = orbit.querySelector(".orbit__bar span");
    let R = 0, cur = -1;
    const layout = () => {
      const w = cards[0].offsetWidth;
      R = (w / 2) / Math.tan(Math.PI / n) + (isSmall() ? 10 : 40);
      cards.forEach((c, i) => (c.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`));
    };
    layout();
    window.addEventListener("resize", layout);
    const render = (p) => {
      const rot = -p * step * (n - 1);
      ring.style.transform = `translateZ(${-R}px) rotateY(${rot}deg)`;
      cards.forEach((c, i) => {
        const a = ((i * step + rot) % 360 + 540) % 360 - 180; // -180..180
        const f = Math.cos((a * Math.PI) / 180);
        c.style.opacity = Math.max(0.08, f);
        c.classList.toggle("is-front", Math.abs(a) < step / 2);
      });
      const k = Math.round(p * (n - 1));
      if (k !== cur) {
        cur = k;
        idx.textContent = String(k + 1).padStart(2, "0");
        scramble(ghost, cards[k].dataset.name, 0.5);
      }
      bar.style.transform = `scaleX(${p})`;
    };
    render(0);
    ScrollTrigger.create({ trigger: orbit, start: "top top", end: "bottom bottom", scrub: true, onUpdate: (self) => render(self.progress) });
    // drag to spin on the stage as well
  }

  /* ---- odometers ---- */
  document.querySelectorAll("[data-odo]").forEach((el) => {
    const digits = el.dataset.odo.split("");
    el.innerHTML = digits.map(() => `<span class="odo__col">${[...Array(20)].map((_, k) => `<span>${k % 10}</span>`).join("")}</span>`).join("");
    const cols = el.querySelectorAll(".odo__col");
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => cols.forEach((c, i) => gsap.fromTo(c, { yPercent: 0 }, { yPercent: -5 * (10 + +digits[i]), duration: 2.2 + i * 0.35, ease: "expo.out" })),
    });
  });

  /* ---- work hover float ---- */
  const float = document.querySelector(".w-float");
  if (float && !isTouch) {
    const img = float.querySelector("img");
    const xTo = gsap.quickTo(float, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(float, "y", { duration: 0.6, ease: "power3" });
    let lastX = 0;
    window.addEventListener("pointermove", (e) => {
      xTo(e.clientX); yTo(e.clientY);
      gsap.to(float, { rotate: gsap.utils.clamp(-15, 15, (e.clientX - lastX) * 0.6), duration: 0.5 });
      lastX = e.clientX;
    }, { passive: true });
    const hideFloat = () => gsap.to(float, { opacity: 0, scale: 0.6, duration: 0.3 });
    ScrollTrigger.create({ trigger: ".w-list", start: "top bottom", end: "bottom top", onToggle: (self) => !self.isActive && hideFloat() });
    window.addEventListener("scroll", () => { if (!document.querySelector(".w-row:hover")) hideFloat(); }, { passive: true });
    document.querySelectorAll(".w-row").forEach((row) => {
      row.addEventListener("pointerenter", () => {
        img.src = row.dataset.img;
        gsap.to(float, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" });
        gsap.fromTo(img, { scale: 1.4 }, { scale: 1, duration: 0.8, ease: "expo.out" });
      });
      row.addEventListener("pointerleave", () => gsap.to(float, { opacity: 0, scale: 0.6, duration: 0.4 }));
    });
  }
  gsap.utils.toArray(".w-row").forEach((r, i) => gsap.from(r, { x: i % 2 ? 120 : -120, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: r, start: "top 92%" } }));

  /* ---- flight path ---- */
  const flight = document.querySelector(".flight");
  if (flight) {
    const track = flight.querySelector(".flight__track");
    const line = flight.querySelector(".flight__line");
    const plane = flight.querySelector(".flight__plane");
    const stops = flight.querySelectorAll(".f-stop");
    const L = line.getTotalLength();
    line.style.strokeDasharray = L;
    line.style.strokeDashoffset = L;
    const dist = () => Math.max(0, track.offsetWidth - window.innerWidth + 120);
    const placePlane = (p) => {
      const sx = track.offsetWidth / 3000, sy = track.offsetHeight / 400;
      const a = line.getPointAtLength(L * p), b = line.getPointAtLength(Math.min(L, L * p + 4));
      const ang = Math.atan2((b.y - a.y) * sy, (b.x - a.x) * sx) * 180 / Math.PI;
      gsap.set(plane, { x: a.x * sx, y: a.y * sy, rotate: ang + 20 });
      line.style.strokeDashoffset = L * (1 - p);
      stops.forEach((s) => {
        const on = parseFloat(s.style.getPropertyValue("--x")) / 100 <= p + 0.04;
        if (on !== s._on) { s._on = on; gsap.to(s, { opacity: on ? 1 : 0.25, scale: on ? 1 : 0.9, y: on ? 0 : 20, duration: 0.6, ease: "back.out(1.6)" }); }
      });
    };
    stops.forEach((s) => gsap.set(s, { opacity: 0.25, scale: 0.9, y: 20 }));
    placePlane(0);
    gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: flight, start: "top top", end: () => "+=" + (dist() + window.innerHeight * 0.5), pin: ".flight__pin", scrub: 1, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: (self) => placePlane(self.progress) },
    });
  }

  /* ---- throwable testimonial deck ---- */
  const deck = document.querySelector(".deck");
  if (deck) {
    const layoutDeck = (instant) => {
      const cards = [...deck.children].reverse(); // last child = top
      cards.forEach((c, k) => gsap.to(c, { x: 0, y: k * 14, rotate: k === 0 ? 0 : (k % 2 ? 1 : -1) * (3 + k * 2), scale: 1 - k * 0.05, zIndex: 10 - k, opacity: k > 3 ? 0 : 1, duration: instant ? 0 : 0.6, ease: "expo.out" }));
    };
    const throwTop = (dir = 1) => {
      const top = deck.lastElementChild;
      gsap.to(top, {
        x: dir * window.innerWidth * 0.7, rotate: dir * 30, opacity: 0, duration: 0.5, ease: "power2.in",
        onComplete: () => { deck.prepend(top); gsap.set(top, { x: 0, opacity: 1 }); layoutDeck(); },
      });
    };
    layoutDeck(true);
    document.querySelector(".deck-next")?.addEventListener("click", () => throwTop(1));
    let sx = null, card = null;
    deck.addEventListener("pointerdown", (e) => { card = deck.lastElementChild; if (!card.contains(e.target)) return (card = null); sx = e.clientX; card.setPointerCapture(e.pointerId); });
    deck.addEventListener("pointermove", (e) => { if (!card) return; const dx = e.clientX - sx; gsap.set(card, { x: dx, rotate: dx * 0.05 }); });
    const up = (e) => {
      if (!card) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 90) throwTop(Math.sign(dx));
      else if (Math.abs(dx) < 5) throwTop(1);
      else layoutDeck();
      card = null;
    };
    deck.addEventListener("pointerup", up);
    deck.addEventListener("pointercancel", up);
    let auto = setInterval(() => throwTop(1), 5000);
    deck.addEventListener("pointerenter", () => clearInterval(auto));
  }

  /* ---- talk button magnet ---- */
  const talk = document.querySelector(".talk__btn");
  if (talk && !isTouch) {
    talk.addEventListener("pointermove", (e) => {
      const r = talk.getBoundingClientRect();
      gsap.to(talk, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.6, ease: "power3.out" });
    });
    talk.addEventListener("pointerleave", () => gsap.to(talk, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, .4)" }));
    talk.addEventListener("pointerenter", () => SCENE && SCENE.pulse());
  }

  ScrollTrigger.refresh();
}

/* =========================================================
   Boot
   ========================================================= */
chrome();
forms();
faq();
slider();
pageTransitions();
pointerFX();
counters();
marquees();
runPreloader(() => {
  pageIntro();
  rotator();
  scrollAnimations();
  creative();
});
