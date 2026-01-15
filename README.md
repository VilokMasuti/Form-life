## Multi-Step Job Application Form

A modern, responsive multi-step job application form built with React 19, TypeScript, Vite, React Hook Form, Zod, Tailwind CSS, Radix UI, and Playwright.

This project demonstrates real-world frontend skills: complex form state management, validation, persistence, and end-to-end testing.




## Features

 Multi-step form flow (4 steps)

Personal Information

Work Experience (dynamic fields)

Skills (searchable multi-select)



## Review & Submit

 Form validation using React Hook Form + Zod

 Dynamic fields using useFieldArray

 State persistence with localStorage

 Mock API submit with loading & success state

 Fully responsive layout (Tailwind CSS)
Radix UI components for accessible UI

End-to-end tests using Playwright




## Tech Stack

React 19 + TypeScript

Vite (fast dev server)

React Hook Form (form state)

Zod (schema validation)

Tailwind CSS (styling)

Radix UI (accessible UI primitives)

Playwright (E2E testing)


## Project Structure

form/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ form/
│  │  │  ├─ Steps/
│  │  │  │  ├─ ExperienceStep.tsx
│  │  │  │  ├─ PersonalInfoStep.tsx
│  │  │  │  ├─ ReviewStep.tsx
│  │  │  │  └─ SkillsStep.tsx
│  │  │  ├─ MultiStepForm.tsx
│  │  │  ├─ StepIndicator.tsx
│  │  │  └─ SuccessState.tsx
│  │  └─ ui/
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button-group.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ empty.tsx
│  │     ├─ field.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-group.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ item.tsx
│  │     ├─ kbd.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ spinner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     └─ tooltip.tsx
│  ├─ hooks/
│  │  ├─ use-mobile.ts
│  │  └─ useFormPersistence.ts
│  ├─ lib/
│  │  ├─ formSchema.ts
│  │  └─ utils.ts
│  ├─ tests/
│  │  └─ form.spec.ts
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ test-results/
│  └─ .last-run.json
├─ .gitignore
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts





## setup & Run Locally

Install dependencies:

npm install


Start development server:

npm run dev





## App runs at:

http://localhost:5173

 Running Tests (Playwright)

npx playwright test




## Current tests cover:

User can complete Step 1 and go to Step 2

Form data persists to localStorage after continuing

https://form-life.vercel.app/

All tests should pass:

2 passed

##  Live Demo
https://form-life.vercel.app/
