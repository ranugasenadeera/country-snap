# CountrySnap 🌍

[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://countrysnap.vercel.app/)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-purple?logo=tailwind-css)

An interactive platform to explore detailed country information, manage user authentication, and save favorite countries for quick access.

## Features ✨

- 🔍 Search and explore country data
- ⭐ Save favorite countries
- 🔒 User authentication
- 📱 Fully responsive design

## Tech Stack 🛠️

- **Frontend**: React 19, Vite  
- **Backend**: REST Countries API (used for fetching country data)  
- **Styling**: Tailwind CSS  
- **State Management**: React Query  
- **Routing**: React Router  
- **Deployment**: Vercel  

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ranugasenadeera/country-snap.git
   cd country-snap
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Create an environment file:
   ```bash
   cp .env.example .env
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Build for production:
   ```bash
   npm run build
   ```

3. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure 📂

```
country-snap/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   └── App.jsx           # Main application
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## Hosted App 🌐

Check out the live app here: [CountrySnap on Vercel](https://countrysnap.vercel.app/)

---

Made with ❤️ by [Ranuga Senadeera](https://github.com/ranugasenadeera)
