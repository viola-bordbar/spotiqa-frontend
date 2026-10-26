# Spotiqa — University Seat-Finding Prototype (Frontend)

Spotiqa is a university group project exploring how students can find available seating in compact campus study areas. This repository is a **frontend-focused portfolio extract** of the collaborative prototype, not the complete original system.

## My contribution

I worked on the **frontend interface, styling, and interaction logic**, using the same Vue/JSX-based setup as a previous university web application. The original team project also included backend communications and hardware components developed by other team members; **I did not develop those parts**.

Some shared frontend integration/state files are retained so the interface code can be understood in context. The repository should not be interpreted as claiming sole authorship of the entire application.

## Features represented in the frontend

- Browse campus buildings and their study areas.
- View area details and displays for seating and environmental readings.
- Sign in, sign up, and manage account-related UI flows.
- Navigate between the start page, area information, and favorites.
- View admin-facing interface elements for managing spaces and notifications.
- Display sensor-history data with charts where readings are available.

## Technologies

- **JavaScript and JSX**, **Vue**, **Vue Router**
- **HTML and CSS**
- **Firebase Authentication** and **Cloud Firestore** (frontend integration)
- **Chart.js** for data visualizations
- **Vite** for local development/builds

## Project structure

```text
spotiqa-frontend/
├── src/
│   ├── views/          # UI pages
│   ├── presenters/     # Interaction and presentation logic
│   ├── styles/         # CSS
│   ├── model/          # Shared client-side state / Firebase integration
│   ├── VueRoot.jsx     # Routing/root UI
│   ├── index.jsx       # Application entry point
│   └── firebaseConfig.js  # Environment-based Firebase configuration
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .env.example
```

## Project scope & limitations

This repository contains the **frontend portion of Spotiqa**, a collaborative university project developed at KTH Royal Institute of Technology.

My contributions focused on frontend development, including user interface design, styling, and interaction logic. The original application also included backend services, communication systems, and hardware components developed by other team members.

Because this repository showcases only the frontend, it is **not intended to serve as a fully functional standalone version** of the original application. Some features depend on the original project's Firebase services and hardware-generated sensor data, which are not included. The interface may still be run or adapted locally with suitable configuration, but a complete demonstration requires replacement services or mock data.

The purpose of this repository is to demonstrate my frontend development contributions rather than reproduce the complete collaborative system.

## Running locally

To work with the authenticated app locally, configure a **separate Firebase project** with the necessary services, data structures, and security rules. A Firebase project alone will not recreate the sensor feed.

1. Install Node.js and npm versions compatible with the versions of Vite in `package.json`.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and fill in configuration for your **own demo Firebase project**.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (the dev server is configured to use port **8080**).

You can create an optimized build with `npm run build`.

## Portfolio status and attribution

This repository presents a selection of my university project contributions for internship and bachelor's thesis applications. Screenshots of the original working interface can be added here with the team's permission. Do not publish teammate-owned material, course-restricted solutions, or private data without authorization.
