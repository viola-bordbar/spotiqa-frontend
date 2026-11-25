# Spotiqa - University Seat-Finding Prototype

Spotiqa is a university group project helping students find available seating in campus study areas. This repository showcases the frontend portion of the collaborative application.

## My Contribution

Developed the frontend interface, styling and interaction logic using JavaScript, JSX and Vue. Worked with the project's model–presenter–view structure to implement user-facing functionality and integrate frontend components.

The original project also included backend communications and hardware components developed by other team members.

## Features

- Browse university buildings and study areas.
- View area information, seating availability and environmental readings.
- User authentication and account-related interfaces.
- Navigate between the start page, area information and favorites.
- Admin-facing interfaces for managing spaces and notifications.
- Visualize sensor-history data using charts.

## Technologies

- JavaScript and JSX
- Vue and Vue Router
- HTML and CSS
- Firebase Authentication and Cloud Firestore
- Chart.js
- Vite

## Project Structure

The frontend follows a model–presenter–view structure:

- **Model:** Shared application state and Firebase-related data integration.
- **Presenters:** Application logic connecting the model and views.
- **Views:** UI components and pages.
- **Styles:** Page-specific and shared CSS.

## Running Locally

**Requirements:** Node.js and npm.

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Configure Firebase using your own Firebase project and the required environment variables.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL provided by Vite.

To create an optimized production build:

```bash
npm run build
```

## Project Scope

This repository contains a frontend-focused portfolio extract of a collaborative university project developed at KTH Royal Institute of Technology. My contributions focused on frontend development, including UI design, styling and interaction logic.

Some functionality relies on Firebase services and sensor data from the original project. The repository is therefore not a complete standalone reproduction of the original application.
