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

Form-life/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── form/
│   │   │   ├── MultiStepForm.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── SuccessState.tsx
│   │   │   └── Steps/
│   │   │       ├── PersonalInfoStep.tsx
│   │   │       ├── ExperienceStep.tsx
│   │   │       ├── SkillsStep.tsx
│   │   │       └── ReviewStep.tsx
│   │   └── ui/        # Radix + shadcn components
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── useFormPersistence.ts
│   ├── lib/
│   │   ├── formSchema.ts
│   │   └── utils.ts
│   └── tests/
│       └── form.spec.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md






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
All tests should pass:
2 passed

##  Live Demo
https://form-life.vercel.app/
