# Haaps — Digital Marketing Agency, Bangalore

An animated, responsive, lead-generation website for Haaps. It's plain HTML, CSS and JS with no build step.

## Pages
- `index.html`: Home. It has the 3D hero, services grid, a pinned horizontal process section, work, testimonials, FAQ and a CTA.
- `about.html`: About. Story, values, journey timeline and team.
- `services.html`: Services. All 8 services as sticky stacking cards with a jump nav, plus packages.
- `contact.html`: Contact. Lead form, contact cards and a map.

## Motion stack
- **Three.js**: a fixed 3D scene behind every page. It has a morphing gradient blob, orbit rings, wireframe shapes and a particle galaxy, and it reacts to the mouse and to scrolling.
- **GSAP + ScrollTrigger**: text reveals, a pinned horizontal scroll section, stacking cards, counters, parallax and page transitions.
- **Lenis**: smooth scrolling.
- Custom cursor, magnetic buttons, 3D tilt cards and a preloader.
- Respects `prefers-reduced-motion`.

The libraries live in `assets/vendor/`, so the site does not depend on a CDN.

## Edit your details
Open `assets/js/main.js` and update the `HAAPS` config at the top:

```js
phone, phoneHref, whatsapp, email, address, hours, socials, formEndpoint
```

These values appear in the header, footer, contact page, floating call and WhatsApp buttons, and the forms.

### Receiving leads
Set `formEndpoint` to a form backend such as Formspree, Getform or your own API. The form POSTs JSON with these fields: `name, phone, email, business, services, message, page`.

If `formEndpoint` is empty, the form still shows the success screen and offers a pre-filled WhatsApp hand-off, but no lead is stored anywhere.

## Images
The photos are Unsplash placeholders. Replace the `src` URLs with your own work. If an image fails to load, a brand-gradient placeholder shows in its place.

## Run locally
```bash
python3 -m http.server 8080
# open http://localhost:8080
```
