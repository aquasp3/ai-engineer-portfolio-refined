# Sathvik Konduri | AI/ML Portfolio

A production-ready personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

This project showcases AI/ML work, featured projects, technical blogs, contact channels, and a downloadable resume in a polished, mobile-first UI.

## Live Product Goals

- Present AI/ML expertise with measurable outcomes.
- Maintain smooth, premium interactions across desktop and mobile.
- Keep navigation reliable with scroll-spy section highlighting.
- Ensure all links and CTAs are real, accessible, and production-safe.

## Core Features

- Responsive hero with primary CTAs and resume actions.
	- View Resume (opens PDF in new tab)
	- Download Resume (downloads with clean filename)
- Sticky glass-style navbar with active section highlighting.
- Section-based portfolio layout:
	- About
	- Skills
	- Featured Project
	- Projects
	- Experience
	- Blogs
	- Currently Building
	- Contact
- Theme toggle with persisted preference.
- Real social/contact links (GitHub, LinkedIn, Email).
- Smooth in-view animations via Framer Motion.
- Optimized production build via Vite.

## Tech Stack

- Frontend: React 18, TypeScript
- Build Tool: Vite 5
- Styling: Tailwind CSS + CSS variable theming
- Animation: Framer Motion
- Icons: Lucide React
- Routing: React Router
- Testing: Vitest + Testing Library

## Project Structure

```text
src/
	components/
		HeroSection.tsx
		Navbar.tsx
		ProjectsSection.tsx
		BlogsSection.tsx
		FeaturedProjectSection.tsx
		ContactSection.tsx
		...
	hooks/
		useActiveSection.ts
	pages/
		Index.tsx
		NotFound.tsx
	test/
		setup.ts
		useActiveSection.test.tsx
public/
	Sathvik-Konduri-Resume.pdf
	favicon-sk.svg
```

## Getting Started

### 1. Install dependencies

Using npm:

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview built app
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode

## Resume Integration

The hero section uses the resume PDF served from the public directory:

- Path: `/Sathvik-Konduri-Resume.pdf`
- View action opens in new tab with secure external attributes.
- Download action uses the HTML `download` attribute and a clean file name.

## Quality and Reliability Notes

- Scroll-spy uses a reusable IntersectionObserver hook (`useActiveSection`) with cleanup and efficient state updates.
- CTA/link behavior has been validated for:
	- External link target and rel safety
	- No placeholder links in source sections
	- Resume open/download behavior
- Unit tests cover scroll-spy edge cases, including fast scrolling and observer cleanup.

## Deployment

This is a static frontend app and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting that serves Vite build output (`dist/`)

Deploy command flow:

1. `npm run build`
2. Upload/serve the `dist/` folder

## Contact

- GitHub: https://github.com/aquasp3
- LinkedIn: https://linkedin.com/in/sathvikkonduri
- Email: sathvikkonduri14@gmail.com
