# Haaps — Digital Marketing Agency, Bangalore

An animated, responsive, lead-generation website for Haaps. It's plain HTML, CSS and JS with no build step.

## Pages
- `index.html`: Home. Ten sections, each a different concept (listed below).
- `about.html`: About. Story, values, journey timeline and team.
- `services.html`: Services. All 8 services as sticky stacking cards with a jump nav, plus packages.
- `contact.html`: Contact. Lead form, contact cards and a map.

## Design
The design is dark and minimal: thin Poppins type, a soft pink light falling from the top of the page, and glass "pill" buttons. The logo and a "Contact us" pill sit at the top, the main menu floats as a pill at the bottom of the screen, and the normal system cursor is used.

## Home page sections
1. **Hero**: the headline is split around a dense, top-lit particle object. As you scroll, the two halves slide apart and the object grows.
2. **Plexus**: the particles become a glowing network of connected points, with channel labels such as Instagram, Google Ads and SEO.
3. **Light beam**: beams of light shine on a glass frame where the particles form the Haaps logo, inside scanning corner brackets.
4. **Field**: "Tailored digital marketing solutions" comes into focus out of a field of particle dust.
5. **Tunnel**: you fly through a particle tunnel past eight glass service panels.
6. **About**: a grid of cards with soft pink glows.
7. **Contact**: a particle donut morphs into two blobs and back.

Inner pages use the same particle background, typography and navigation.

## Motion stack
- **Three.js**: a particle engine with about 22,000 points that morphs between shapes (blob, network, logo, field, tunnel, donut and twin blobs) as each section scrolls into view.
- **GSAP + ScrollTrigger**: sticky scroll scenes, the hero split, word reveals, the frame zoom and the tunnel fly-through.
- **Lenis**: smooth scrolling.
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
