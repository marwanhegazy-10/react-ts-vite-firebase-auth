# React + TypeScript + Vite Firebase Authentication

This project is a React application bootstrapped with Vite, using TypeScript for type safety and Firebase for authentication. The app includes features such as sign-in, sign-up, Google Sign-In, and profile management, protected by authentication.

## Features

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Vite**: A fast build tool and development server.
- **Firebase Authentication**: Provides backend services to authenticate users.
- **Google Sign-In**: Allows users to sign in with their Google account.

## Project Structure

```plaintext
├── public
│   ├── firebase-logo.svg          # Firebase logo image
│   └── ...                        # Other public assets
├── src
│   ├── assets                     # Assets directory
│   ├── components
│   │   ├── ui                     # UI components
│   │   └── Protected.tsx          # Protected route component
│   ├── context                    # Context providers
│   ├── lib                        # Utility libraries
│   ├── pages
│   │   ├── sign-in.tsx            # Sign-in page
│   │   ├── sign-up.tsx            # Sign-up page
│   │   └── profile.tsx            # Profile page
│   ├── App.tsx                    # Main application component
│   ├── RootLayout.tsx             # Root layout component
│   ├── globals.css                # Global CSS file
│   ├── main.tsx                   # Entry point of the application
│   └── config.ts                  # Firebase configuration file
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── components.json                # UI components configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package-lock.json              # Lock file for dependencies
├── package.json                   # Project dependencies and scripts
├── tsconfig.app.json              # TypeScript configuration for app
├── tsconfig.json                  # Base TypeScript configuration
├── tsconfig.node.json             # TypeScript configuration for Node.js
└── vite.config.ts                 # Vite configuration
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/marwanhegazy-10/react-ts-vite-firebase-auth.git
cd react-ts-vite-firebase-auth
```

2. Install the dependencies:

```bash
npm install
```

### Firebase Setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable Email/Password and Google authentication in the Authentication section.
3. Copy your Firebase config and update your environment variables.

Create a file named `.env` in the root of your project and add your Firebase configuration:

```plaintext
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Next, update the `src/config.ts` file with your Firebase configuration:

```typescript name=src/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebase);
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

Build the application for production:

```bash
npm run build
```

### Linting

Run ESLint to lint your code:

```bash
npm run lint
```

## Acknowledgements

- Google Student Developer Club at UTD
