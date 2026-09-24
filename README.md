# TaskFlow

TaskFlow is a responsive productivity dashboard for creating, organizing, and completing daily tasks. It is built with React, Vite, Tailwind CSS, and browser `localStorage` - no backend or external services required.

## Features

- Add tasks with the form button or the Enter key
- Edit task titles with save and cancel controls
- Mark tasks as active or completed
- Delete individual tasks through a custom confirmation modal
- Clear all completed tasks through the same confirmation flow
- Filter tasks by all, active, or completed status
- Search task titles while preserving the active filter
- View total, active, and completed task counts
- Persist tasks after browser refreshes with `localStorage`
- Responsive dashboard interface for desktop, tablet, and mobile

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- JavaScript
- React Hooks
- Browser `localStorage`

## Getting Started

### Prerequisites

Install a current LTS version of [Node.js](https://nodejs.org/).

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal. The default application URL is typically `http://127.0.0.1:5173`.

## Available Commands

```bash
# Start the local development server
npm run dev

# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── ConfirmationModal.jsx  # Reusable delete and clear confirmation dialog
│   ├── TodoFilter.jsx         # Status filters and search input
│   ├── TodoForm.jsx           # New task form
│   ├── TodoItem.jsx           # Individual task item and inline editing
│   ├── TodoList.jsx           # Task and empty-state rendering
│   └── TodoStats.jsx          # Task count summary
├── hooks/
│   └── useTodos.js             # Task state and localStorage persistence
├── App.jsx                     # Dashboard composition and modal actions
├── main.jsx                    # React entry point
└── index.css                   # Tailwind layers and application styles
```

## Data Persistence

Tasks are stored locally in the browser under the `taskflow.todos` key. Each task follows this shape:

```js
{
  id: 'unique-id',
  title: 'Plan the weekly review',
  completed: false,
  createdAt: '2026-09-24T09:30:00.000Z',
}
```

Clearing browser site data or local storage for this app will remove saved tasks.

## Confirmation Modal

`ConfirmationModal` is a reusable component used before destructive actions. It supports:

- A clear action description and confirmation label
- Cancel through the visible button, backdrop, or Escape key
- Scroll locking while the modal is open
- Separate confirmations for single-task deletion and clearing completed tasks
