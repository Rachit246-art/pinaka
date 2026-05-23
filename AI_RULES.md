# AI Development Rules & Guidelines for Pigglitz

This document outlines the tech stack, design system, and development rules for the Pigglitz 3D Printing Pitara web application.

## Tech Stack
* **Frontend Framework:** React 19 (Vite-powered) for fast, modern, and reactive UI rendering.
* **Routing:** React Router DOM v7 for client-side navigation and page routing.
* **Icons:** Lucide React for clean, consistent, and scalable vector icons.
* **Styling:** Custom CSS with CSS Variables, utilizing a playful, vibrant color palette.
* **Typography:** 'Nunito' Google Font (extra bold weights) for a friendly, toy-store aesthetic.
* **State Management:** React Hooks (`useState`, `useEffect`, `useContext`) and `localStorage` for persistent user sessions and cart state.

## Library & Styling Rules
1. **Styling & Aesthetic:**
   * Maintain the playful, vibrant "toy-store" aesthetic.
   * Always use the defined CSS variables in `src/index.css` for colors:
     * `--primary-color` (#6a0dad - Playful Purple)
     * `--accent-pink` (#ff2a7a)
     * `--accent-yellow` (#ffb703)
     * `--accent-blue` (#00bbf9)
     * `--accent-orange` (#fb8500)
   * Use pill-shaped buttons (`border-radius: 50px`), thick borders, and playful shadows (`box-shadow: 8px 8px 0 var(--accent-blue)`) to keep the design consistent.
2. **Icons:**
   * Always use `lucide-react` for icons. Do not install or import other icon libraries.
3. **Routing:**
   * Keep all routes defined in `src/App.jsx`.
   * Use `<Link>` from `react-router-dom` for internal navigation to prevent full page reloads.
4. **Component Structure:**
   * Keep components small, focused, and modular.
   * Place pages in `src/pages/` and reusable components in `src/components/`.
   * Accompany each component/page with its own dedicated `.css` file for clean separation of concerns.