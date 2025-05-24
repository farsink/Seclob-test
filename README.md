# MERN Product Management Application

A full-featured Product Management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This app enables users to register, authenticate, and manage products and categories through a modern UI with backend integration.

---

Live Link Frontend : https://seclob-test.netlify.app/
note : the backend deosnt hosted till now if data's are not present assume the local server is down

## ✨ Features

* User authentication (Sign In/Sign Up)
* Role-based protected routes
* CRUD operations for products and categories
* File uploads for product images using Multer
* Responsive frontend with Tailwind CSS
* API calls managed using Axios
* State managed using React Context API
* Star rating system for products
* Pagination and modal components

---

## 🧰 Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer (file uploads)
* JWT for authentication
* bcryptjs (password hashing)
* Helmet & CORS for security
* Morgan for logging

### Frontend

* React.js (with TypeScript)
* Tailwind CSS
* Vite (build tool)
* Axios
* React Context API

---

## 📁 Project Structure

```
farsink-seclob-test/
├── backend-Node/
│   ├── Controller/
│   ├── Routes/
│   ├── Model/
│   ├── middlewares/
│   ├── config/
│   └── Server.js
└── product-management-frontend/
    ├── src/
    │   ├── Pages/
    │   ├── Components/
    │   ├── Context/
    │   ├── api/
    │   └── App.tsx
```

---

## ⚙️ Setup Instructions

### Prerequisites

* Node.js & npm
* MongoDB (local or cloud like MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/your-username/mern-product-management.git
cd farsink-seclob-test
```

### Backend Setup

```bash
cd backend-Node
npm install

# Create a .env file
cp .env.example .env
# Add MONGO_URI and JWT_SECRET in .env

npm start
```

### Frontend Setup

```bash
cd ../product-management-frontend
npm install
npm run dev
```

---

## ⚖️ API Endpoints Summary

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Products

* `GET /api/product`
* `POST /api/product`
* `PUT /api/product/:id`
* `DELETE /api/product/:id`

### Categories

* `GET /api/categories`
* `POST /api/categories`

---

## ✈ Deployment

You can deploy the backend to platforms like Heroku, Render, or Railway, and the frontend to Vercel or Netlify.


## ✨ Acknowledgements

* [MongoDB](https://www.mongodb.com/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)

---


---
