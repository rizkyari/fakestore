# Fakestore

A simple e-commerce dashboard built with Vue 3 (Composition API), Vite, Tailwind CSS, Pinia, and Vue I18n, connected to Fake Store API.
---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- pnpm / npm / yarn

### Installation
```bash
npm install
npm run dev
```

### Environment Variables
```bash
VITE_API_BASE_URL=https://fakestoreapi.com
```

### Tech Stack
Vue 3 – Composition API

Vite – build tool

Pinia – state management

Tailwind CSS – UI framework

Vue I18n – multi-language

TypeScript – typesafety

### Login Credentials
Use the following credentials (provided in test):
```bash
Username: johnd
Password: m38rmF$
```
---

## Features

### Authentication

Login with Fake Store API (johnd / m38rmF$)

Token stored securely in localStorage

Protected routes & logout


### Products

Product list with search, category filter, sorting, refresh

Product detail page with add-to-cart


### Cart

Add / remove items

Adjust quantity

Clear all items

Cart total calculation

Checkout flow simulated with modal success → clears cart + redirect


### UI/UX

Responsive design (header with burger menu, footer, modal via Teleport)

Reusable components (Button, Input, Card, Alert, Modal)

Loading skeletons, error & empty states


### Extra

Multi-language (English 🇬🇧 & Indonesian 🇮🇩)

404 Page with custom illustration

Organized project structure (stores, pages, components, types)

### Internationalization
- vue-i18n configured with EN + ID locales.
- Language switcher in header.
- All visible strings moved to src/i18n JSON.

### Deployment
- Deploys on Vercel.
- vercel.json handles proxy rewrites.
- Build command: npm build
---

## Author

Developed by Rizky Ari

[Linkedin](https://www.linkedin.com/in/rizkyarihar/) | [GitHub](https://github.com/rizkyari)