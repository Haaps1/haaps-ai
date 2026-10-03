# Haaps — Digital Marketing Agency, Bangalore

An animated, responsive, lead-generation website for Haaps. It's plain HTML, CSS and JS with no build step.

## Pages
- `index.html`: Home. Five sections, listed below.
- `about.html`: About. Story, values, journey timeline and team.
- `services.html`: Services. All 8 services as sticky stacking cards with a jump nav, plus packages.
- `contact.html`: Contact. Lead form, contact cards and a map.

## Design
The design is dark and minimal: thin Poppins type, a soft pink light falling from the top of the page, and glass "pill" buttons. There is no top header. A single bar floats at the bottom of the screen with the menu in the middle and a "Contact us" button on the right. The normal system cursor is used.

## Home page sections
1. **Hero**: the headline is split around a humanoid AI head in profile, built from particles that take their positions and colours from `assets/img/ai-head.png` (replace that image to change the head). As you scroll, the two halves slide apart and the head grows.
2. **Orbit**: the particles form a dotted globe while eight channel pills (Instagram, Google Ads, Reels, WhatsApp AI, SEO, Website, AI Video and Calling Agent) circle it in 3D.
3. **Tunnel**: you fly through a particle tunnel past glass panels for each service.
4. **About**: a grid of cards with soft pink glows.
5. **Contact**: the text sits on the left and a particle donut beside it morphs into two blobs and back.

Inner pages use the same particle background, typography and navigation.

## Motion stack
- **Three.js**: a particle engine with about 22,000 points that morphs between shapes (AI head, blob, globe, tunnel, donut and twin blobs, plus the logo on inner pages) as each section scrolls into view.
- **GSAP + ScrollTrigger**: sticky scroll scenes, the hero split, the channel orbit, word reveals and the tunnel fly-through.
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
