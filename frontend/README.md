# User Management Frontend

React frontend for the User Management System with Material-UI.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

App runs on `http://localhost:3000`

## Features

- **User List Page**: Paginated table with search functionality
- **User Form Page**: Add/Edit users with validation
- **User Details Page**: Detailed user information in card layout
- **Responsive Design**: Works on mobile and desktop
- **Notifications**: Success/error toast messages
- **Export**: Download users as CSV

## Pages

- `/` or `/users` - User List
- `/users/new` - Add New User
- `/users/:id/edit` - Edit User
- `/users/:id` - User Details

## Dependencies

- react: UI library
- react-router-dom: Client-side routing
- @mui/material: Material-UI components
- @mui/icons-material: Material-UI icons
- axios: HTTP client
- react-toastify: Toast notifications

## Development

The app uses Material-UI for styling and includes:
- Responsive design with mobile-first approach
- Form validation with real-time feedback
- Loading states and error handling
- Modern card-based layouts
