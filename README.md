# MiniChat App 🚀

A real-time messaging web application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## Screenshots



## Features

- **User Authentication:** Secure login and registration using JSON Web Tokens (JWT) and bcrypt for password hashing.
- **Real-time Messaging:** Instant bi-directional communication powered by Socket.io.
- **Online Status:** See which users are currently online in real-time.
- **Persistent Storage:** All messages and user data are securely stored in MongoDB.
- **Modern UI:** A clean, responsive, and dark-themed user interface built with React and Tailwind CSS.

## Tech Stack

### Frontend
- React.js (with Vite)
- Tailwind CSS
- Socket.io-client
- React Router DOM
- Axios

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.io
- JSON Web Tokens (JWT) & bcrypt

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running (or a MongoDB Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Chatapp
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup:**
   Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the App:**
   Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Project Structure

```text
Chatapp/
├── backend/          # Node.js + Express API and Socket.io server
│   ├── config/       # Database configuration
│   ├── controller/   # Request handlers for routes
│   ├── model/        # Mongoose schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Entry point for backend
└── frontend/         # React frontend application
    ├── src/
    │   ├── pages/    # React components for pages (Chat, Login, Register)
    │   ├── service/  # API and Socket services
    │   ├── App.jsx   # Main React component
    │   └── main.jsx  # Entry point for frontend
    └── package.json
```
