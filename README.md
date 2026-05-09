# Ddlcktrckr

A mobile app that fetches live and historical data from the Deadlock API and visualizes it with smooth animations, GPU-accelerated rendering, and a clean adaptive UI.

Built with React Native + Expo, featuring real-time hero stats, match tracking, and visually rich hero pages powered by custom shaders via React Native Skia.

> Currently in active development.

---

## ![Reel](images/reel.mov)

## Tech Stack

| Category      | Libraries                                        |
| ------------- | ------------------------------------------------ |
| Framework     | React Native 0.81, Expo 54, Expo Router          |
| Rendering     | React Native Skia (`@shopify/react-native-skia`) |
| Animations    | React Native Reanimated 4, Worklets              |
| Data Fetching | TanStack Query v5                                |
| Styling       | React Native Unistyles v3                        |
| Navigation    | React Navigation (Bottom Tabs)                   |
| Performance   | Shopify FlashList, Nitro Modules                 |
| Language      | TypeScript                                       |

---

## Features

- **Live & historical Deadlock data** — hero stats, match history, and more pulled from the Deadlock API
- **GPU-accelerated hero pages** — custom GLSL shaders rendered via RNSkia with per-hero visual identity
- **Smooth animations** — UI transitions and data loading states powered by Reanimated 4
- **Adaptive UI** — clean layout that responds to content and screen size via Unistyles
- **Type-safe throughout** — full TypeScript coverage across API, hooks, components, and query options

---

## Project Structure

```
├── app/              # Expo Router screens and layouts
├── components/       # Reusable UI components
├── api/              # Deadlock API client and fetchers
├── hooks/            # Custom React hooks
├── queryOptions/     # TanStack Query query option factories
├── types/            # Shared TypeScript types
├── data/             # Static/seed data
├── android/          # Android native project
├── ios/              # iOS native project
└── unistyles.ts      # Theme and style configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- For iOS: macOS with Xcode installed
- For Android: Android Studio with an emulator or a physical device

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/7akoda/Ddlcktrckr.git
cd Ddlcktrckr

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

### Running on a Device / Emulator

```bash
# iOS (macOS only)
npm run ios

# Android
npm run android

# Web (limited — shaders require a native device for full effect)
npm run web
```

> **Note for reviewers:** The hero page shaders are GPU-rendered and won't be fully visible in screenshots. Running on a physical device or emulator is recommended to see the animations in action.

---

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm start`       | Start the Expo dev server         |
| `npm run ios`     | Build and run on iOS simulator    |
| `npm run android` | Build and run on Android emulator |
| `npm run web`     | Start the web version             |
| `npm run lint`    | Run ESLint                        |

---

## Status

This project is actively under development. Core features are functional; additional screens and polish are ongoing.
