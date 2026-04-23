# Baguio City Health Services Office — Web Application

A city-wide public health information platform for the Baguio City Health Services Office (HSO). The application provides residents with access to district health center locations, STI/HIV risk assessment tools, educational resources, and real-time health service information.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [File Documentation](#file-documentation)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Build and Deployment](#build-and-deployment)
- [Conventions and Notes](#conventions-and-notes)

---

## Project Overview

This is a single-page React application built with Vite. It is structured around four primary views — Home, About, Pre-Test, and Contact — accessible via a persistent top navigation bar. The application integrates Google Maps for health center geolocation, an interactive STI/HIV self-assessment tool, a floating AI-assisted chatbot, and a promotional popup component.

All health center data, service metadata, and bot reply logic are maintained as static JavaScript objects within their respective component files.

---

## Tech Stack

| Category              | Tool / Library                        | Version  |
|-----------------------|---------------------------------------|----------|
| Framework             | React                                 | ^18.x    |
| Build Tool            | Vite                                  | ^5.x     |
| Styling               | Tailwind CSS (utility classes)        | ^3.x     |
| Mapping               | @react-google-maps/api                | ^2.x     |
| Language              | JavaScript (JSX)                      | ES2022+  |
| Package Manager       | npm                                   | —        |
| Linting               | ESLint                                | ^9.x     |
| CSS Custom Properties | CSS Variables via `index.css`         | —        |

> Tailwind CSS is used selectively for responsive visibility utilities (e.g., `hidden lg:flex`). The majority of component styling is implemented via inline JavaScript style objects using a shared color token object (`C`) defined within each component file.

---

## Folder Structure

```
HSO/
├── node_modules/
├── public/
│   └── (static public assets served at root)
├── src/
│   ├── assets/
│   │   ├── AurorahillHC.jpg
│   │   ├── AtabHC.jpg
│   │   ├── AtokHC.jpg
│   │   ├── AsinHC.png
│   │   ├── BonJing.jpg
│   │   ├── CampoFilipinoHC.jpg
│   │   ├── CityCampHC.jpg
│   │   ├── EngineersHillHC.jpg
│   │   ├── HSO.jpg
│   │   ├── IrisanHC.jpg
│   │   ├── LucbanHC.jpg
│   │   ├── LoakanHC.jpg
│   │   ├── MinesView.png
│   │   ├── PacdalHC.jpg
│   │   ├── PinsaoHC.jpg
│   │   ├── QuezonHillHC.jpg
│   │   ├── QuirinoHillHC.jpg
│   │   ├── ScoutBarrioHC.jpg
│   │   ├── CityLogo.png
│   │   ├── Logo.jpg
│   │   ├── condom.png
│   │   ├── qrCODE.jpg
│   │   ├── hiv-symptoms.png
│   │   ├── chlamydia.jpg
│   │   ├── Gonorrhea.webp
│   │   ├── herpes.jpg
│   │   ├── syphilis.webp
│   │   └── hpv.webp
│   ├── fonts/
│   │   └── (custom font files)
│   ├── About.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── Contact.jsx
│   ├── FloatingChatBot.jsx
│   ├── Footer.jsx
│   ├── FreeCondomPopup.jsx
│   ├── Home.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── Navbar.jsx
│   └── Pretest.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## File Documentation

### `src/main.jsx`
Application entry point. Mounts the root React component into the DOM element defined in `index.html`. Imports global stylesheets (`index.css`, `App.css`).

---

### `src/App.jsx`
Root application component. Manages the active section state used by `Navbar` for scroll-aware highlighting. Renders the full page layout by composing all major section components in order:

1. `Navbar`
2. `Home` (id: `home`)
3. `About` (id: `about`)
4. `Pretest` (id: `pretest`)
5. `Contact` (id: `contact`)
6. `Footer`
7. `FreeCondomPopup`

Uses an `IntersectionObserver` to track which section is currently visible and passes `activeSection` as a prop to `Navbar`.

---

### `src/Navbar.jsx`
Fixed top navigation bar with scroll-hide behavior and mobile drawer support. Accepts an `activeSection` prop and highlights the corresponding nav link with a lime dot indicator.

Key behaviors:
- Hides on scroll down, reveals on scroll up
- Applies a blur/dark backdrop when the user scrolls past 24px
- Renders a slide-in mobile drawer with a "Get Tested" CTA button
- Smooth-scrolls to section IDs with a 68px offset to account for navbar height
- Keyboard accessible: closes drawer on `Escape`

Props:
- `activeSection` (string) — ID of the currently visible section

---

### `src/Home.jsx`
Landing section of the application. Contains:

- **STI/HIV Carousel** — Auto-advancing (5.5s interval) image carousel with six slides covering HIV, Chlamydia, Gonorrhea, Herpes, Syphilis, and HPV. Each slide includes a disease title, sub-label, risk classification badge, description, and symptom checklist.
- **Bonjing Card** — Feature card introducing the HSO mascot/ambassador.
- **QR Code Card** — Scannable QR code for mobile access.
- **Stat Cards** — Displays total health center count and service availability.
- **Video Grid** — Three embedded YouTube videos covering HIV prevention, PrEP, and HIV testing.

Slide data is maintained in the `slides` array. Video data is maintained in the `videos` array. Both are defined at the top of the file.

---

### `src/About.jsx`
Informational section about the Baguio City HSO. Contains:

- **Hero** — Page title, eyebrow label, and a count badge showing the total number of health centers.
- **Stats Row** — Four stat cards: health center count, consultation cost, open days, and barangay coverage.
- **Commitments Grid** — Six commitment cards (Fully Confidential, Completely Free, Walk-In Friendly, Non-Judgmental, Community-Rooted, Universal Access), each with a custom SVG icon.
- **Mission / Vision Cards** — Two dark-green cards with the HSO mission and vision statements.
- **Health Center Grid** — A 3-column grid of cards for all 17 district health centers, each displaying the center name, address, phone number, services offered (as color-coded pills), assigned doctor, team composition, and a Facebook page link.

Health center data is defined in the `healthCenters` array. Service color metadata is defined in the `SVC_META` object. Both are maintained statically within this file.

---

### `src/Contact.jsx`
Map and directory section for locating health centers. Contains:

- **Hero** — Page title and brief description.
- **Stat Chips** — Four chips displaying center count, open days, hours, and cost.
- **Map Bento** — A two-panel layout consisting of:
  - A **sidebar** that shows a default empty state prompt or, when a pin is selected, displays the center's image, description, phone number, travel times (walking, motorcycle, car), and catchment barangay details.
  - A **Google Map** with markers for all 17 health center locations. Includes a search bar with autocomplete suggestions.
- **Hotline Card** — Lime-colored card displaying emergency contact numbers.
- **Office Hours Card** — Dark green card displaying operating hours.

Location data including coordinates, travel times, and catchment barangay details is maintained in the `locations` array within this file. Integrates `@react-google-maps/api` (`GoogleMap`, `Marker`). A Google Maps API key must be configured (see [Environment Setup](#environment-setup)).

Also renders `FloatingChatBot`.

---

### `src/Pretest.jsx`
Interactive STI/HIV risk assessment tool. Divided into three sequential states:

1. **Consent Screen** — Displays an informed consent notice with three disclosure points (confidential, anonymous statistics, testing recommendations). Requires checkbox acknowledgment before proceeding.
2. **Assessment Form** — A paginated questionnaire (4 questions per page, 4 pages total) with 13 questions covering sexual behavior, exposure history, and current symptoms. Questions support single-select and multi-select answer types. Some answers carry an `autoHighRisk` flag that bypasses the scoring threshold.
3. **Result Screen** — Displays a total score, risk level classification (Low / Moderate / High), actionable next steps, the HSO emergency hotline, and a Facebook page link. Includes a "Take Again" action to restart.

Question data and scoring logic are defined entirely within the component file.

---

### `src/FloatingChatBot.jsx`
Persistent floating chatbot accessible from the Home and Contact pages. Rendered as a fixed-position FAB (Floating Action Button) in the bottom-right corner.

Features:
- Opens a chat panel with an animated entrance
- Displays a pulsing ring on the FAB until first opened
- Includes quick reply buttons on first load
- Shows a typing indicator with animated dots during bot response delay (1.1–1.7s)
- Bot reply logic is handled by the `getBotReply()` function, a deterministic keyword-matching function covering:
  - HIV, AIDS, PrEP, PEP
  - Herpes (HSV), Syphilis, HPV, Chlamydia, Gonorrhea
  - STI symptoms, prevention, treatment
  - Confidentiality, cost, hours, hotline
  - Partner notification, stigma, maternal health

No external API is used. All replies are static string responses returned from `getBotReply()`.

---

### `src/FreeCondomPopup.jsx`
A modal popup that appears 3 seconds after the page loads. Promotes free condom availability at all health centers. Includes:

- A centered modal with a blurred backdrop
- An image panel displaying the condom asset
- A "FREE" badge
- Three stat entries (HIV Prevention, STI Protection, Free of Charge)
- A "Learn More" button linking to the CDC condom guidance page
- A "Dismiss" button and close icon

The popup uses CSS transitions for a smooth entrance animation. It dismisses on backdrop click or button press.

---

### `src/Footer.jsx`
Site-wide footer rendered in a four-column layout:

| Column | Contents |
|--------|----------|
| Brand | HSO logo, tagline, social links (Facebook, Instagram, X) |
| Navigation | Links to Home, About, Pre-Test, Find a Center |
| Services | HIV Testing, STI Screening, Maternal Care, Mental Health, TB DOTS |
| Contact | Hotline card, email address, city location |

Includes a bottom bar with copyright notice and the tagline "Free · Confidential · Universal Care".

---

### `src/index.css`
Global base styles. Defines the `--font` CSS custom property used throughout all components via `var(--font)`. Imports custom fonts from the `fonts/` directory and applies base resets.

---

### `src/App.css`
Supplementary application-level styles. Used for any global layout overrides not handled by Tailwind or inline styles.

---

### `index.html`
Vite HTML entry point. Contains the `<div id="root">` mount target. References the Tailwind CSS CDN or build output and the `main.jsx` module script.

---

### `vite.config.js`
Vite build configuration. Configures the React plugin (`@vitejs/plugin-react`) and any path aliases or build output settings.

---

### `eslint.config.js`
ESLint flat configuration file. Applies React-specific linting rules for JSX and hooks.

---

## Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- A valid **Google Maps JavaScript API key** with the Maps JavaScript API and Places API enabled

---

## Environment Setup

Create a `.env` file in the project root with the following variable:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

In `Contact.jsx`, the `LoadScript` or `useJsApiLoader` call should reference this key via `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`.

> Note: Do not commit your `.env` file. It is listed in `.gitignore` by default.

---

## Running the Application

**1. Clone the repository**

```bash
git clone https://github.com/your-org/hso-baguio.git
cd hso-baguio
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

---

## Build and Deployment

**Production build**

```bash
npm run build
```

Output is written to the `dist/` directory. This directory can be served by any static hosting provider (Vercel, Netlify, GitHub Pages, Nginx, etc.).

**Preview the production build locally**

```bash
npm run preview
```

**Lint the codebase**

```bash
npm run lint
```

---

## Conventions and Notes

**Color Tokens**

Each component file defines a local `C` object containing the shared design color palette. The values are consistent across all components:

| Token         | Value                        | Usage                          |
|---------------|------------------------------|--------------------------------|
| `C.deep`      | `#0d3320`                    | Hero backgrounds, dark panels  |
| `C.forest`    | `#175330`                    | Primary brand color            |
| `C.mid`       | `#1e6840`                    | Hover states                   |
| `C.lime`      | `#C8EC38`                    | Accent, CTAs, highlights       |
| `C.cream`     | `#f5f4ee`                    | Light section backgrounds      |
| `C.creamDark` | `#ede9de`                    | Card backgrounds, borders      |
| `C.ink`       | `#0d1f14`                    | Body text                      |
| `C.inkMid`    | `rgba(13,31,20,0.52)`        | Secondary text                 |
| `C.font`      | `var(--font)`                | Typography (all components)    |

**Inline Styling Approach**

All component styles are written as inline JavaScript objects. Tailwind CSS is used only where dynamic class toggling is needed (e.g., responsive display utilities like `hidden lg:flex`).

**Static Data**

All health center records, location coordinates, service metadata, chatbot replies, and assessment questions are stored as static arrays and objects within their respective component files. No external database or API is used for content delivery.

**Asset Naming**

Images in `src/assets/` follow the pattern `[CenterName]HC.[ext]` for health center photos. Condition/disease images follow descriptive lowercase naming (e.g., `hiv-symptoms.png`, `herpes.jpg`).

---

## Contact

**Baguio City Health Services Office**
T. Alonzo Street, Baguio City, Benguet, Philippines

Hotline: 0985-251-5968 / 442-9800
Email: info@govph.org