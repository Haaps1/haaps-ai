# Haaps — Digital Marketing Agency, Bangalore

An animated, responsive, lead-generation website for Haaps. It's plain HTML, CSS and JS with no build step.

## Pages
- `index.html`: Home. It has the 3D hero, services grid, a pinned horizontal process section, work, testimonials, FAQ and a CTA.
- `about.html`: About. Story, values, journey timeline and team.
- `services.html`: Services. All 8 services as sticky stacking cards with a jump nav, plus packages.
- `contact.html`: Contact. Lead form, contact cards and a map.

## Home page sections
Each section is built as its own concept:
1. **Hero**: about 15,000 particles form the Haaps logo and scatter away from the mouse. The headline word scrambles between FLY, GROW, SELL, VIRAL and WIN.
2. **Strip**: two text rows run in opposite directions and speed up and skew with scroll speed.
3. **Zoom**: the word "LEADS" zooms in until the screen turns pink.
4. **Manifesto**: the words fill in as you scroll over a brand-pink background.
5. **Services**: a 3D carousel of the eight services that rotates as you scroll.
6. **Numbers**: odometer-style rolling digits on a light background.
7. **Work**: a project list where hovering a row shows a floating photo that follows the cursor.
8. **Process**: a paper plane flies along a drawn path through the five steps.
9. **Testimonials**: a card deck you can drag to throw cards away.
10. **Contact**: a giant rotating "Let's talk" button.

As you scroll, the particles burst and re-form into a different 3D shape for each section, and the page background colour changes to match.

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
