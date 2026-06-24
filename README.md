# Bundle Builder

A React + TypeScript implementation of the multi-step security system bundle builder from the provided Figma design.

## Features

* Multi-step accordion bundle builder
* Data-driven rendering from JSON
* Variant-specific quantity management
* Live review panel with synchronized quantity controls
* Dynamic total and savings calculations
* Responsive layout for desktop, tablet, and mobile
* localStorage persistence via "Save my system for later"

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
├── interfaces/
├── services/
├── assets/
└── App.tsx
```

### Architecture

* Product data is loaded from a JSON source.
* UI is generated entirely from data rather than hardcoded product markup.
* State is centralized and shared between the bundle builder and review panel.
* Variant quantities are tracked independently per color option.
* Review panel data is derived from the current application state.

## Key Implementation Details

### Variant Quantities

Each variant maintains its own quantity.

Example:

* White Camera ×2
* Black Camera ×1

Switching between variants updates the quantity stepper to reflect the selected variant while preserving quantities of other variants.

### Persistence

The "Save my system for later" action stores the current configuration in localStorage and restores it when the user returns to the application.

## Tradeoffs

* Product data is served from a local JSON file rather than a backend API.
* State management is implemented using React state rather than a dedicated state management library since the application size did not require additional complexity.

## Future Improvements

* Unit and integration tests
* Improved accessibility support
* Backend API integration
* Animation and transition enhancements
