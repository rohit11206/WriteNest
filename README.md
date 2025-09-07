✍️ WriteNest

A modern blogging platform built with React (frontend) and Node.js + Express + MongoDB (backend).
Users can sign up, log in, and create, edit, or delete their own blog posts — while only being able to view other users’ posts. 🚀

🌟 Features

🔐 Authentication & Authorization (JWT based)

📝 Create, Edit, Delete Blogs (only your own)

👥 Multi-user support (no one can touch someone else’s posts)

⚡ Fast frontend with React + Vite

🗄️ MongoDB Atlas integration

🎨 Clean UI with responsive design

🗂️ Project Structure
WriteNest-main/
│
├── backend/ # Express.js + MongoDB server
│ ├── controllers/ # Auth & blog controllers
│ ├── middleware/ # JWT auth middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── db.js # Database connection
│ ├── index.js # Server entry
│ ├── .env.example # Backend env example
│ └── package.json
│
├── frontend/ # React app (Vite)
│ ├── src/pages/ # Home, Login, Signup, Blog pages
│ ├── src/lib/ # API helper
│ ├── .env.example # Frontend env example
│ └── package.json
│
├── .gitignore
├── .gitattributes
└── README.md

🚀 Getting Started
  1️⃣ Clone the repo
    git clone https://github.com/rohit11206/WriteNest.git
     cd WriteNest-main

  2️⃣ Backend setup
       cd backend
       npm install
     Create a .env file inside backend/:
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_key
     PORT=5000
    Run the backend:
    npm run dev
    Server should be running at http://localhost:5000.

   3️⃣ Frontend setup
      cd frontend
      npm install
    Create a .env file inside frontend/:
    VITE_API_URL=http://localhost:5000
     Run the frontend:
      npm run dev
      Frontend should be available at http://localhost:5173.

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

 
 


   



   

