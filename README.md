# Guardian: Emergency Stray Cattle Dispatch & Accident Prevention 🐮🛡️

Guardian is a full-stack web application designed to prevent highway and road accidents by allowing commuters to report stray cattle. Using the browser's Geolocation API, Guardian captures the precise coordinates of the hazard and automatically dispatches emergency alerts via Twilio SMS to nearby rescue and animal management teams.

---

## 🚀 Key Features

* **Instant GPS Reporting**: Captures coordinates in real-time via the browser's Geolocation API.
* **Photo Proof Upload**: Accepts image uploads of the stray cattle for verification.
* **Automated Dispatch System**: Automatically sends Twilio SMS notifications to emergency dispatchers containing location coordinates.
* **Incident Ledger**: Stores persistent data in a local database (SQLite/JSON) for auditing and progress tracking.
* **Responsive Dashboard**: Beautiful, mobile-friendly interface designed for users on the road.

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js, Twilio API, Body-Parser, Multer
* **Database**: SQLite3 / Local JSON ledger
* **Frontend**: HTML5, CSS3, JavaScript (ES6)

---

## ⚙️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file at the root:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
DISPATCH_PHONE_NUMBER=number_to_receive_alerts
```

### 3. Start the Server
```bash
npm start
```
Open `http://localhost:3000` in your web browser.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions to improve GPS precision or emergency routing, please open a Pull Request.
