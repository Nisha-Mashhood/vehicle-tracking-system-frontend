# Vehicle Tracking System - Frontend

## Overview

This is the frontend application for the **Vehicle Tracking System** built using **React, Vite, and TypeScript**.

The application allows users to:

* Login to the system
* Upload GPS CSV trip data
* View trips on an interactive map
* Analyze trip details such as:

  * Distance travelled
  * Idling duration
  * Stoppage duration
  * Overspeed segments

The frontend communicates with the backend APIs built using **Express + MongoDB + TypeScript**.

---

# Tech Stack

* React
* Vite
* TypeScript
* Axios
* React Router
* ESLint
* Leaflet (for map visualization)

---

# Project Setup

### 1 Install Dependencies

```
npm install
```

### 2 Start Development Server

```
npm run dev
```

Application runs at:

```
http://localhost:5173
```

Backend API should be running at:

```
http://localhost:5000
```

---

# Project Structure

```
src
│
├── api
│   └── axiosInstance.ts
│
├── components
│   └── common
│
├── pages
│   ├── Login
│   ├── Upload
│   └── Trips
│
├── services
│
├── types
│
├── routes
│
├── App.tsx
├── main.tsx
```

---

# Code Quality

ESLint is configured to enforce:

* Strict TypeScript rules
* No usage of `any`
* React Hooks rules
* Consistent code structure

Run ESLint using:

```
npm run lint
```

---

# API Communication

All API requests are handled through a centralized **Axios instance**.

Backend Base URL:

```
http://localhost:5000/api
```

Example API usage:

```
POST /auth/login
POST /trip/upload
GET /trip/list
GET /trip/:id
```

---

# Future Features

* CSV Upload for GPS trip data
* Map visualization using Leaflet
* Display of stoppage and idling points
* Overspeed route highlighting
* Trip reports and analytics

---

# Author

Nisha Mashhood
