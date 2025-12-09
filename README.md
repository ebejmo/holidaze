# Holidaze – Project Exam 2
![holidaze](https://github.com/user-attachments/assets/37799953-edbb-4897-b97f-6fb3f3ef8bae)
Hompage on desktop

## Description

Holidaze is a responsive booking platform built for the Noroff Holidaze API. Users can browse and search venues, book stays, manage their bookings, and (optionally) register as a venue manager to create and maintain venues. The goal of this project is to demonstrate the ability to work with a real API, build a complete front-end application with authentication, and create a smooth booking experience.

## Overview

Holidaze includes a full user flow: searching venues, viewing details, using a calendar to see availability, booking stays, creating and managing venues, updating your profile, and reviewing your upcoming and previous bookings. The interface is designed with Bootstrap and custom SCSS, and the project uses Vite for fast development and build performance.

## Features

- Browse and search for venues
- View detailed venue pages with calendar availability
- Register, log in, manage your profile and log out
- Create, update, and delete venues (for venue managers/hosts)
- Book stays and view your upcoming and completed bookings
- Update profile avatar/profile picture

## Built With

- **Framework:** React (Vite)
- **Styles:** Bootstrap 5 + SCSS
- **Validation:** React Hook Form + Yup
- **State and Context:** Custom React Contexts (Auth, Modal and Toast)
- **Hosting:** Netlify
- **API:** [Noroff Holidaze API](https://docs.noroff.dev/docs/v2/holidaze/bookings)

## Getting Started

### Prerequisites
- Node.js
- Git

### Installation

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

- **Live Demo:** [Holidaze](https://holidazeeb.netlify.app/)
- **GitHub Repo:** [GitHub](https://github.com/ebejmo/holidaze/tree/main)
- **Kanban Board:** [Trello](https://trello.com/invite/b/689cda05a23aeb34724c9984/ATTId17499b63261c975838b427850ff6bedAE0AA9C2/project-exam-2-holidaze)
- **Gantt Chart:** [Sheets](https://docs.google.com/spreadsheets/d/1AjBWml0lZGPY74u5x5r2rqai_6qxReYozd57WqC2uik/edit?usp=sharing)

## Acknowledgments

Built using the Noroff API and course resources.

[![Lint](https://github.com/ebejmo/holidaze/actions/workflows/lint.yml/badge.svg)](https://github.com/ebejmo/holidaze/actions/workflows/lint.yml)
[![Build](https://github.com/ebejmo/holidaze/actions/workflows/build.yml/badge.svg)](https://github.com/ebejmo/holidaze/actions/workflows/build.yml)
