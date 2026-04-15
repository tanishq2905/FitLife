# FitLife
**FitLife is a full-stack fitness app where users log workouts with exercise name, reps, and weight. Data is stored in MongoDB Atlas and displayed using a React frontend. A Vercel serverless backend handles API requests. The app supports real-time updates and can be extended with features like editing, goals, and user authentication.**
Here’s a clean, **Copilot-style README** you can paste directly into your GitHub repo:

---

# FitLife – Fitness Tracker App

## Description

FitLife is a full-stack fitness tracking web application that allows users to log and manage their workouts. Users can add exercises with details like name, reps, and weight, which are stored in a cloud database and displayed in real time on the frontend.

---

## Features

* Add workouts (exercise, reps, weight)
* View workout history
* Real-time data updates
* Simple and clean UI
* Serverless backend API

---

## Tech Stack

* Frontend: React
* Backend: Node.js (serverless functions)
* Database: MongoDB Atlas
* Deployment: Vercel
* HTTP Client: Axios

---

## Project Structure

```
fitlife_app/
  api/
    workouts.js
  client/
    src/
      App.js
    package.json
```

---

## Installation (Local Setup)

### 1. Clone the repository

```
git clone <your-repo-url>
cd fitlife_app
```

### 2. Setup frontend

```
cd client
npm install
npm start
```

### 3. Setup backend

* Create a MongoDB Atlas cluster
* Replace connection string in `api/workouts.js`

---

## Deployment

* Push code to GitHub
* Import project into Vercel
* Set root directory to `client`
* Deploy

---

## Future Improvements

* Edit and delete workouts
* User authentication
* Habit tracking
* Progress dashboard
* Improved UI/UX

---

## License

This project is for educational purposes.
