# Chemnitz_Sites


## Features

* User authentication and authorization
* CRUD operations with MongoDB
* Responsive React frontend running at `http://localhost:5173`
* RESTful API backend running at `http://localhost:5000`

---

## Prerequisites

* Node.js (v16 or higher)
* MongoDB installed locally and running
* npm (comes with Node.js)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/hklea/Chemnitz_Sites.git
cd  Chemnitz_Sites
```

### 2. Backend setup

```bash
cd backend
npm install
```

* Create a `.env` file in the `backend` folder with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
PORT=5000
JWT_SECRET=your_jwt_secret
```

* Start the backend server:

```bash
nodemon index.js
```

The backend will run on `http://localhost:5000`.

### 3. Frontend setup

Open a new terminal window/tab:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

### 5.## Sample Data Initialization

To insert a sample user into the database:

```bash
node init.js


## Usage

* Open your browser and go to `http://localhost:5173`
* Register or log in
* Use the app to interact with data stored locally in MongoDB

---


## Contributer

Klea Haxhiu

