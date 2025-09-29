#  Data Dock – User Management System

A **MERN Stack User Management System** with CRUD, pagination, search, and CSV export.

---


Active URL: https://data-dock-ten.vercel.app/

##  Features
-  User CRUD (Add/Edit/Delete/View)
-  Search by name or email
-  Pagination support
-  Export users to CSV
-  Responsive UI with Material-UI
-  MongoDB + Mongoose backend

---

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
# Add your MongoDB URI in config.env
npm run dev   # Development
npm start     # Production
Runs at  http://localhost:5050

Frontend Setup
```bash

cd frontend
npm install
npm start
Runs at  http://localhost:3000

🔗 API Routes
Method	Endpoint	Description
GET	/api/users	List users (with search & pagination)
GET	/api/users/:id	Get single user
POST	/api/users	Add new user
PUT	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user
GET	/api/users/export/csv	Export users as CSV

 User Schema

{
  name: String,
  email: String,
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
 Tech Stack
Backend: Node.js, Express, MongoDB, Mongoose

Frontend: React, Material-UI, Axios, React Router, React Toastify

🌍Deployment
Backend: Render

Frontend: npm run build → Deploy on Vercel
