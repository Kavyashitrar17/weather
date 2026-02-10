# 🌦️ Live Weather App (React + Vite)

A modern responsive weather web application built using **React.js**.
The app allows users to search any city and view current weather conditions along with a 5-day forecast.

---

## 🚀 Features

* 🔍 Search weather by city name
* 🌡️ Current temperature display
* 📅 5-Day weather forecast
* 🌬️ Wind speed information
* ☁️ Dynamic weather icons & conditions
* 🌙 Glassmorphism UI design
* 🌡️ Celsius / Fahrenheit toggle
* ⚡ Fast loading (Vite powered)

---

## 🧠 Technologies Used

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| React.js          | Frontend Framework       |
| Vite              | Development & Build Tool |
| Tailwind CSS      | Styling & UI Design      |
| JavaScript (ES6+) | Logic & API handling     |
| Fetch API         | Weather data requests    |

---

## 📂 Project Structure

```
weather-react/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherApp/
│   │   │   ├── InfoBox/
│   │   │   ├── Forecast/
│   │   │   └── SearchBox/
│   │   ├── hooks/
│   │   │   └── useWeather.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-react.git
cd weather-react/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🖥️ How It Works

1. User enters a city name
2. The app requests weather data from an online weather API
3. React state updates automatically
4. UI re-renders with new weather details and forecast

---

## 🎯 Learning Outcomes

* React component architecture
* Custom React hooks
* API integration using Fetch
* Responsive UI design
* State management using `useState` & `useEffect`
* Frontend project structuring

---

## 📌 Future Improvements

* Location detection (GPS)
* Weather background animations
* Hourly forecast
* Dark/Light theme toggle
* Save favorite cities

---

