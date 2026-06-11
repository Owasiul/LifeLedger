# 🧾 LifeLedger

> A modern full-stack personal life management application built with the MERN stack.

**LifeLedger** helps users track and organize daily records, goals, finances, habits, and important events — all in one secure and centralized platform.

---

## 🌐 Live Demo

🔗 **Frontend (Vercel):**  
https://life-ledger-client.vercel.app  

> This repository contains the **frontend (client)** application.  
> Backend is built separately using Express.js and MongoDB.

---

## 🛠️ Tech Stack

### 🚀 Frontend
- **React 19 + Vite**
- **Tailwind CSS + DaisyUI**
- **React Router v7**
- **TanStack Query (React Query)**
- **Firebase Authentication**
- **Recharts**
- **React Hook Form**
- **Axios**
- **ESLint**
- **Deployed on Vercel**

### 🔧 Backend (Separate Repository)
- **Node.js**
- **Express.js**
- **MongoDB**

🔗 Backend Repository:  
https://github.com/Owasiul/LifeLedger-server

---

Admin:
-----
admin email = hasinhayder77@gmail.com
admin pass = hasinHaydar55@

## ✨ Features

- 🔐 Firebase authentication (email/password + Google)
- 📊 User and admin analytics dashboards with charts
- ⚡ Fast and responsive UI
- 📚 Public lesson browsing with premium access tiers
- 🔄 Optimized API calls with caching (TanStack Query)
- 🧾 Form validation using React Hook Form
- 📱 Fully responsive design
- 🧩 Modular and scalable folder structure
- 🚀 Environment-based API configuration
- 🚀 Optimized production build with Vite

---

## 🖼️ Screenshots


### 🏠 Homepage
<img width="1862" height="811" alt="image" src="https://github.com/user-attachments/assets/67953c8f-be36-4c2a-98c7-9cd3a80f0405" />


### 📊 Dashboard
<img width="1851" height="625" alt="image" src="https://github.com/user-attachments/assets/3787bdb5-1c8c-45b4-b4b6-a446bc167ebd" />


### 📌 Feature View
<img width="1851" height="625" alt="image" src="https://github.com/user-attachments/assets/acbb359b-2e6e-4605-89db-75f657cc06b5" />


---

## 📂 Project Structure (Frontend)

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── routes/
 ├── layouts/
 └── assets/
```

---

## ⚙️ Installation & Setup (Frontend)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Owasiul/LifeLedger.git
cd LifeLedger
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=https://life-ledger-server.vercel.app
```

Copy `.env.example` to `.env` and fill in your values.

### 4️⃣ Run development server

```bash
npm run dev
```

Open:  
http://localhost:5173

---

## 🏗️ Production Build

Build the project:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## 🔐 Environment Variables

| Variable        | Description              |
|----------------|--------------------------|
| VITE_API_URL   | Backend API base URL     |

---

## 📌 Roadmap

- [x] User Authentication (Firebase)
- [x] Analytics dashboard
- [ ] Habit & Expense Tracking Modules
- [ ] Dark/Light theme toggle
- [x] Premium feature access
- [x] Role-based authorization

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository  
2. Create your feature branch  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit changes  
   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push to GitHub  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request  

---


## 👨‍💻 Author

**MD. Owasiul Islam**  
GitHub: https://github.com/Owasiul  

---

⭐ If you like this project, consider giving it a star!
