# MahoTravel 🌍✈️

A modern tourism platform offering car rentals, hotel bookings, and guided tours with a seamless user experience. Built using React, TypeScript, Tailwind CSS, MongoDB, and deployed on DigitalOcean.

🔗 **Live Website:** [mahotravel.com](https://mahotravel.com)

---

## 🚀 Features

- **Car, Hotel, and Tour Booking** – Simple and intuitive booking process
- **Embedded Calendar System** – Users can view availability and book dates directly
- **Automated Email Notifications** – Booking confirmations and updates powered by EmailJS
- **Admin Dashboard** – Manage bookings, cars, hotels, and tours with ease
- **Modern UI/UX** – Responsive, clean, and accessible design with Tailwind CSS
- **Secure & Scalable Backend** – MongoDB and Node.js provide robust data management
- **Full Deployment** – Production-ready, deployed on DigitalOcean with HTTPS

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB
- **Email Service:** EmailJS
- **Deployment:** DigitalOcean (Droplet + Nginx + SSL)

---

## 📂 Project Structure

```
mahotravel/
├── backend/              # Express + MongoDB backend
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── controllers/     # Logic for routes
│   ├── .env            # Environment variables (not committed)
│   └── server.js       # Backend entry point
│
├── public/              # Static assets
├── src/                 # React + TypeScript frontend
│   ├── assets/         # Images, icons
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom hooks
│   ├── pages/          # App pages (Home, Booking, Admin, etc.)
│   ├── App.tsx         # Main App component
│   └── main.tsx        # React entry point
│
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Clone the repo:

```bash
git clone https://github.com/lukalklikadze/mahorent.git
cd mahotravel
```

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Run backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd ..
npm install
npm run dev
```

Frontend will run on `http://localhost:5173` and backend on `http://localhost:5000` (or your configured port).

---

## 📌 Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)

---

## 👨‍💻 Author

Built by **Luka Liklikadze** 🚀

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
