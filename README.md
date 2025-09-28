# User Management System - MERN Stack MVP

A complete User Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring CRUD operations, pagination, search functionality, and CSV export.

## Features

### Backend (Node.js + Express + MongoDB)
- ✅ CRUD APIs for User management
- ✅ Pagination support (limit + skip)
- ✅ Search functionality (by name or email)
- ✅ Export to CSV functionality
- ✅ Comprehensive error handling with proper status codes
- ✅ Input validation and sanitization
- ✅ MongoDB integration with Mongoose

### Frontend (React + Material-UI)
- ✅ React Router for navigation
- ✅ User List Page with pagination and search
- ✅ User Form Page (Add/Edit) with validation
- ✅ User Details Page with card layout
- ✅ Success/error notifications
- ✅ Responsive design (mobile + desktop)
- ✅ Modern Material-UI components

## Project Structure

```
user-management/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── config.env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── UserList.js
│   │   │   ├── UserForm.js
│   │   │   └── UserDetails.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `config.env` and update the MongoDB connection string if needed
   - Default MongoDB URI: `mongodb://localhost:27017/user_management`

4. Start MongoDB (if running locally):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

5. Start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users (with pagination and search)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/export/csv` - Export users to CSV

### Query Parameters for GET /api/users
- `page` - Page number (default: 1)
- `limit` - Number of users per page (default: 10)
- `search` - Search term for name or email

## User Model

```javascript
{
  name: String (required, 2-50 characters),
  email: String (required, unique, valid email),
  phone: String (required, valid phone number),
  address: String (required, 5-200 characters),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. **View Users**: Navigate to the home page to see the paginated list of users
2. **Search Users**: Use the search bar to filter users by name or email
3. **Add User**: Click "Add User" button to create a new user
4. **Edit User**: Click the edit icon in the user list or on the user details page
5. **View Details**: Click the view icon to see detailed user information
6. **Delete User**: Click the delete icon and confirm the action
7. **Export CSV**: Click "Export CSV" to download all users as a CSV file

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- CORS
- CSV Writer

### Frontend
- React.js
- React Router
- Material-UI (MUI)
- Axios
- React Toastify

## Development

### Backend Development
- The server uses nodemon for auto-restart during development
- Environment variables are loaded from `config.env`
- MongoDB connection is established on server startup
- Comprehensive error handling and validation

### Frontend Development
- React development server with hot reload
- Material-UI theme customization
- Responsive design with mobile-first approach
- Toast notifications for user feedback

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Use PM2 or similar process manager for Node.js applications

### Frontend
1. Build the React app: `npm run build`
2. Serve the `build` folder with a web server (nginx, Apache, etc.)
3. Configure the API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
