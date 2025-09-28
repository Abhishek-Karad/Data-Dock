# User Management Backend

Node.js + Express + MongoDB backend for the User Management System.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (if running locally):
```bash
# macOS
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## Environment Variables

Create a `config.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management
NODE_ENV=development
```

## API Endpoints

### Users
- `GET /api/users` - Get all users (with pagination and search)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/export/csv` - Export users to CSV

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Users per page (default: 10)
- `search` - Search term for name or email

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- express-validator: Input validation
- csv-writer: CSV export functionality
- nodemon: Development auto-restart
