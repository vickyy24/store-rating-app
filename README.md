# Store Rating App

A full-stack Store Rating Platform built using React, Node.js, Express.js, MySQL, JWT Authentication, and Tailwind CSS.

The platform allows Admins to manage users and stores, Normal Users to rate stores, and Store Owners to monitor ratings received by their stores.

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt
* cookie-parser
* cors

### Database

* MySQL

---

## Features

### Authentication

* User Signup
* User Login
* JWT-based Authentication
* Role-based Authorization
* Secure Password Hashing using bcrypt
* Logout Functionality
* Change Password Functionality

---

## Roles

### Admin

Admin can:

* View Dashboard Statistics

  * Total Users
  * Total Stores
  * Total Ratings

* Add Users

  * Admin
  * Normal User
  * Store Owner

* Add Stores

* View Admin and Normal Users

  * Name
  * Email
  * Address
  * Role

* View All Users

  * Name
  * Email
  * Address
  * Role
  * Store Rating (for Store Owners)

* View Stores

  * Store Name
  * Email
  * Address
  * Rating

* Apply Filters

  * Name
  * Email
  * Address
  * Role
  * Rating

* Sort Data

  * Name
  * Email
  * Address
  * Role
  * Rating

---

### Normal User

Normal Users can:

* View All Stores
* View Store Address
* View Overall Store Rating
* View Submitted Rating
* Submit Rating
* Update Rating
* Change Password
* Logout

---

### Store Owner

Store Owners can:

* View Average Store Rating
* View Users Who Rated Their Store

  * Name
  * Email
  * Rating
* Sort Data

  * Name
  * Email
  * Rating
* Change Password
* Logout

---

## Database Schema

### Users Table

| Column   | Type         |
| -------- | ------------ |
| user_id  | INT (PK)     |
| name     | VARCHAR(60)  |
| email    | VARCHAR(255) |
| password | VARCHAR(255) |
| address  | VARCHAR(400) |
| role     | VARCHAR(20)  |

---

### Stores Table

| Column     | Type         |
| ---------- | ------------ |
| store_id   | INT (PK)     |
| user_id    | INT (FK)     |
| store_name | VARCHAR(255) |

---

### Ratings Table

| Column    | Type     |
| --------- | -------- |
| rating_id | INT (PK) |
| user_id   | INT (FK) |
| store_id  | INT (FK) |
| rating    | INT      |

---

## API Endpoints

### Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /signup          |
| POST   | /login           |
| POST   | /change-password |
| GET    | /verify-user     |
| GET    | /logout          |

---

### Admin

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /add-user           |
| POST   | /add-store          |
| GET    | /dashboard-counts   |
| GET    | /store-owners       |
| GET    | /store-list         |
| GET    | /admin-normal-users |
| GET    | /all-users          |

---

### Normal User

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /all-stores    |
| POST   | /submit-rating |
| PUT    | /update-rating |

---

### Store Owner

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /store-average-rating |
| GET    | /store-rating-users   |

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend

npm install

node server.js
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating

JWT_SECRET=your_secret_key
```

---

## Project Structure

```text
store-rating-app
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── storeOwnerController.js
│   │
│   ├── database
│   │   └── schema.sql
│   │
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Author

Vikas Sontakke
