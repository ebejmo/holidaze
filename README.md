# Holidaze – Project Exam 2

## Overview

Holidaze is a responsive front-end application for the Noroff Holidaze API.  
Users can browse venues, view availability, book stays (and if they’re feeling frisky) register as a venue manager (host) to create and manage listings.

## Features

- Browse and search venues
- View detailed venue pages with calendar availability
- Register, log in, manage your profile and log out
- Create, update, and delete venues (for venue managers/hosts)
- Book stays and view your upcoming and completed bookings
- Update profile avatar/profile picture

## Tech

- **Framework:** React (Vite)
- **Styles:** Bootstrap 5 + SCSS
- **Validation:** React Hook Form + Yup
- **State and Context:** Custom React Contexts (Auth, Modal and Toast)
- **Hosting:** Netlify
- **API:** [Noroff Holidaze API](https://docs.noroff.dev/docs/v2/holidaze/bookings)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ebejmo/holidaze.git
cd holidaze
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file and your environment variables:

```bash
VITE_API_BASE_URL=https://v2.api.noroff.dev
VITE_API_KEY=noroff-api-key-here
```

4. Run the development server:

```bas
npm run dev
```

## Links

Live Demo: [Holidaze](https://holidazeeb.netlify.app/)
Repo: [GitHub](https://github.com/ebejmo/holidaze/tree/main)
Gantt Chart: [Trello](https://trello.com/b/wJIz4dVX/project-exam-2-holidaze)

[![Lint](https://github.com/ebejmo/holidaze/actions/workflows/lint.yml/badge.svg)](https://github.com/ebejmo/holidaze/actions/workflows/lint.yml)
[![Build](https://github.com/ebejmo/holidaze/actions/workflows/build.yml/badge.svg)](https://github.com/ebejmo/holidaze/actions/workflows/build.yml)
