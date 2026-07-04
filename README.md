# ORCare Web Application

![Banner Placeholder](assets/screenshots/banner.png)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Production](https://img.shields.io/badge/production-ready-success.svg)

## Project Overview
ORCare is an enterprise-level oral health companion designed to help users build great habits, learn about dental health, and catch problems early. It features an AI-powered Chatbot, a Symptom Checker, Learning Modules, and Smart Reminders.

## Features
- **AI Chatbot**: 24/7 AI-powered dental health assistant utilizing Google Gemini AI.
- **Symptom Checker**: Interactive symptom evaluation and triage.
- **Learning Center**: Expert-written educational modules with gamification.
- **Smart Reminders**: Automated push notifications for consistent oral care routines.
- **Secure Authentication**: Traditional Email/Password and Google OAuth Sign-In.

## Architecture
ORCare is designed as a modular full-stack application within a unified monorepo.
- **Frontend**: Vanilla JS engineered into a modular, framework-less ES architecture for ultimate performance and zero framework overhead.
- **Backend**: Scalable Node.js & Express API with robust security middleware (Helmet, Rate Limiting).
- **Database**: Supabase PostgreSQL for fully managed relational storage and authentication.

![Architecture Placeholder](assets/architecture.png)

## Folder Structure
```
orcare-webapp/
├── src/                # Frontend application
│   ├── components/     # UI components
│   ├── pages/          # Application screens
│   ├── api/            # API configurations
│   ├── constants/      # Static data and configurations
│   ├── assets/         # Images and icons
│   ├── styles/         # Global stylesheets
│   └── main.js         # Core entry point
├── server/             # Backend API (Node.js/Express)
│   ├── controllers/    # Route controllers
│   ├── routes/         # Express routes
│   ├── middleware/     # Security and Auth middleware
│   ├── config/         # Server configurations
│   └── server.js       # Express server entry point
├── docs/               # Enterprise documentation
├── scripts/            # Build and utility scripts
├── tests/              # Test suites
└── assets/screenshots/ # High-resolution application screenshots
```

## Technology Stack
- **Frontend**: Vanilla JS (ES Modules), HTML5, CSS3, Vite
- **Backend**: Node.js, Express.js, Cors, Helmet
- **Database / Auth**: Supabase (PostgreSQL), JWT
- **AI**: Google Generative AI (Gemini)
- **Tooling**: ESLint, Prettier, Docker, GitHub Actions

## Deployment
- **Frontend (Production)**: [https://orcare-webapp.vercel.app](https://orcare-webapp.vercel.app)
- **Backend API**: [https://orcare-webapp.onrender.com](https://orcare-webapp.onrender.com)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full deployment details.

## Screenshots
| Home (Desktop) | Home (Mobile) | Tablet |
|----------------|---------------|--------|
| ![Desktop Home](assets/screenshots/desktop-home.png) | ![Mobile Home](assets/screenshots/mobile-home.png) | ![Tablet](assets/screenshots/tablet.png) |

| Google Login | Chatbot | Learning Center |
|--------------|---------|-----------------|
| ![Google Login](assets/screenshots/google-login.png) | ![Chatbot](assets/screenshots/chatbot.png) | ![Learning Center](assets/screenshots/learning-center.png) |

| Disease Details | Profile | Settings |
|-----------------|---------|----------|
| ![Disease Details](assets/screenshots/disease-details.png) | ![Profile](assets/screenshots/profile.png) | ![Settings](assets/screenshots/settings.png) |

## Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/nandakishore-reddy/orcare_webapp.git
   cd orcare_webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy `.env.example` to `.env` and fill in your Supabase and Gemini credentials.

4. **Run both Frontend and Backend concurrently**
   ```bash
   npm run dev
   ```
   - Frontend will run on `http://localhost:3000`
   - Backend will run on `http://localhost:5000` (or as configured in `.env`)

5. **Build Instructions**
   ```bash
   npm run build
   ```

## Production Readiness
- **Responsive Design**: Flawless scaling from 320px mobile up to 4K desktop screens.
- **Performance**: Zero-framework frontend yields ultra-fast load times. Asset optimization enforced.
- **Accessibility**: High contrast ratios, ARIA labels, and semantic HTML implemented.

## Roadmap
See our future plans and milestones in [ROADMAP.md](ROADMAP.md).

## Contributing
Please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide and read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License
MIT License

## Author
Nandakishore Reddy

## Acknowledgements
- [Supabase](https://supabase.com/)
- [Google Gemini](https://ai.google.dev/)
- [Vite](https://vitejs.dev/)
