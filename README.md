<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🍿 PopcornSync - Real-Time Movie Watching Platform

## 🚀 Project Overview

PopcornSync is a real-time movie watching platform where two or more friends can watch the same movie together, even from different locations. They can chat, react with emojis, and experience the movie together as if they are in the same room.

## 🌟 Features

* Real-time movie synchronization (play, pause, seek).
* Secure room creation with room codes for private watching.
* Real-time chat with emoji reactions.
* User authentication (login, signup, JWT security).
* Customizable UI (dark mode, light mode).
* Room history for users to rejoin their favorite rooms.

## 🚀 Tech Stack

* **Frontend:** React + Vite + TailwindCSS
* **Backend:** Node.js + Express + Socket.io
* **Database:** MongoDB (User profiles, chat history, room history)
* **Deployment:** Vercel (Frontend), AWS EC2 (Backend)
* **Authentication:** JWT (JSON Web Token)

## 📌 Project Architecture

* **Frontend:**

  * React Components (ChatBox, VideoPlayer, RoomManager)
  * Socket.io Client for real-time chat and video sync.
  * TailwindCSS for beautiful and responsive UI.

* **Backend:**

  * Node.js (Express Server)
  * WebSocket (Socket.io for real-time communication)
  * MongoDB for user data and room history.
  * JWT for secure authentication.

## 📌 Learning Guide

### 🌐 Frontend (React)

* React Basics: Components, Props, State, Hooks.
* React Router: For page navigation (Room page, Home page).
* React Context API: For global state management (User data).
* Socket.io Client: For real-time communication (Chat and Video Sync).
* TailwindCSS: For UI design.

### 🛠️ Backend (Node.js + Express)

* Node.js Basics: HTTP Server, Express Routing.
* JWT Authentication: Secure user login.
* Socket.io: Real-time synchronization.
* MongoDB: User profiles, room management.

### 📊 Database (MongoDB)

* MongoDB Basics: Collections, Documents.
* Mongoose (for easy database interactions).

## 🚀 Getting Started

### Prerequisites

* Node.js installed on your system.
* MongoDB Atlas account for cloud database.
* Basic knowledge of React and Node.js.

### Project Setup

1. **Clone the Repository:**

```bash
git clone <your-repo-link>
```

2. **Navigate to Project Directory:**

```bash
cd PopcornSync
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Set Up Environment Variables (.env):**

```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. **Start Backend Server:**

```bash
npm run server
```

6. **Start Frontend:**

```bash
npm run client
```

## 🚀 How to Use

* Create a room and share the room code with a friend.
* Start or join the room to watch the movie together.
* Use the chat box to talk with your friend in real-time.

## 🚀 Future Improvements

* Voice chat using WebRTC.
* Watch history for each user.
* Room themes (Horror, Romantic, Action).

## 🌟 Contributing

Feel free to fork the project and make your own improvements.

## 💡 License

This project is licensed under the MIT License.


>>>>>>> c495bd07a22905c90376c3452bb2a838ed1020f1
