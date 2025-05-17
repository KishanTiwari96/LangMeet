LangMeet is a real-time chat and video call application designed to connect people around the world for language exchange. Whether you're looking to practice a new language or help others learn yours, LangMeet makes it seamless and fun.

🌐 Live Demo: https://langmeet.onrender.com

✨ Features
✅ Real-Time Chat – Instant messaging with your language partners

✅ Video Calls – High-quality video communication

✅ Language Matching – Connect with users based on native and learning languages

✅ User Profiles – Show what you speak and what you're learning

✅ Friend System – Send and accept friend requests

✅ Notifications – Stay updated on new messages and friend requests

🧰 Tech Stack
⚙️ Frontend
React.js – Component-based UI

Vite – Fast dev server and build tool

Tailwind CSS – Utility-first styling

🔧 Backend
Node.js + Express.js – RESTful API

MongoDB – Database for users, messages, and friends

Stream (GetStream.io) – Used for real-time chat and video caing Ks

🚀 Getting Started
🔄 Prerequisites
Node.js & npm

MongoDB (local or Atlas)

📦 Installation
# Clone the repo
git clone https://github.com/KishanTiwari96/LangMeet.git
cd LangMeet

# Backend setup
cd backend
npm install
# Add your .env file here (see below)

# Frontend setup
cd ../frontend
npm install
🔐 Environment Variables
Create a .env file in the backend folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
▶️ Run the App
# In backend/
npm start

# In frontend/
npm run dev
Then visit: http://localhost:5173

📁 Project Structure

LangMeet/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
🤝 Contributing
Have ideas or improvements? Feel free to fork and open a PR!

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Creator
Kishan Tiwari
🔗 @KishanTiwari96
