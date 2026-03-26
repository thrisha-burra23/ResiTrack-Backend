# ResiTrack Backend

Backend API for **ResiTrack – Smart Apartment Complaint Management System**.

---

## 🚧 Project Status

Backend development is in progress.

* Authentication module is implemented ✅
* Other modules (complaints, roles, real-time features) are under development

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Redis (planned)
* Socket.IO (planned)
* Zod Validation

---

## Implemented Features

### Authentication

* User registration
* User login
* JWT-based authentication (access & refresh tokens)

---

## Planned Features

* Role-based access control (Resident / Admin / Staff)
* Complaint management system
* Complaint lifecycle tracking
* Redis caching & rate limiting
* Real-time updates using Socket.IO

---

## API Endpoints (Auth)

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

---

## Installation

```bash
git clone https://github.com/yourusername/resitrack-backend
npm install
npm run dev
```

---

## Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIERY=1m(example)
REFRESH_TOKEN_EXPIERY=7d(example)
```

---

## Frontend Repository

Frontend:

https://github.com/thrisha-burra23/ResiTrack-Frontend

---

## Author

Thrisha
