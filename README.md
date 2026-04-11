# 🚑 Smart Ambulance Tracking System

A real-time Smart Ambulance Tracking System built using **Spring Boot (Backend)** and **React (Frontend)**. This system helps track ambulance locations, reduce response time, and improve emergency management.

---

## 📌 Features

* 📍 Real-time ambulance tracking (GPS-based)
* 🚦 Route optimization & live traffic updates
* 🧑‍⚕️ Emergency request handling
* 🔔 Alerts & notifications system
* 📊 Dashboard for monitoring ambulances
* 🔐 Secure authentication (JWT-based)

---

## 🛠️ Tech Stack

### Backend:

* Spring Boot
* Spring Security
* REST APIs
* WebSocket (for real-time updates)
* MongoDB / MySQL (Database)

### Frontend:

* React.js
* Axios
* Redux / Context API
* Google Maps API

---

## 📂 Project Structure

```
smart-ambulance-tracking-system/
│
├── backend/ (Spring Boot)
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
│
├── frontend/ (React)
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── redux/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/smart-ambulance-tracking-system.git
cd smart-ambulance-tracking-system
```

### 2️⃣ Backend Setup (Spring Boot)

```
cd backend
mvn clean install
mvn spring-boot:run
```

* Configure database in `application.properties`

---

### 3️⃣ Frontend Setup (React)

```
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints (Sample)

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | /api/ambulances | Get all ambulances       |
| POST   | /api/ambulance  | Add new ambulance        |
| GET    | /api/track/{id} | Track ambulance          |
| POST   | /api/emergency  | Create emergency request |

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access (Admin / Driver / User)

---

## 🚀 Future Enhancements

* AI-based traffic prediction
* Integration with hospitals
* Voice-based emergency requests
* IoT device integration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Hritik singh**

---

⭐ If you like this project, give it a star on GitHub!
