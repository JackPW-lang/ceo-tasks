# CEO Task Planner

Ultra-lightweight task planning application built with NestJS, MongoDB, and Vue.js.

## Prerequisites

Ensure the following are installed.

- [Node.js](https://nodejs.org) (v18 or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (via Homebrew recommended)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/JackPW-lang/ceo-tasks.git
cd ceo-tasks
```

### 2. Install dependencies

```bash
npm install
npm install --prefix backend --legacy-peer-deps
npm install --prefix frontend
```

### 3. Start MongoDB

```bash
brew services start mongodb-community
```

## Running the App

From the root `ceo-tasks` folder:

```bash
npm run dev
```

This starts both the backend and frontend simultaneously in a single terminal.

- Backend runs on http://localhost:3000
- Frontend runs on http://localhost:8080

To stop the app press **Ctrl+C**.

## Usage

1. Once the app is running, navigate to http://localhost:8080
2. Answer the security question: **When do you want it?**
   - Answer: **NOW!**
3. Type a task and press **Enter** to add it
4. Check the box next to a task to mark it complete
5. All tasks remain visible whether completed or not

## Design Decisions

- **No session/token management** — given the single-user nature, auth is handled as a simple client side state flag after the answer is verified.
- **Enter to submit** — no buttons required, which helps to achieve the rapid and successive addition of tasks.
- **MongoDB persistence** — all tasks survive server restarts and are consistent across devices.
- **concurrently** — both backend and frontend start and stop with a single command.
- **Minimal dependencies** — NestJS + Mongoose on the backend, Vue on the frontend.