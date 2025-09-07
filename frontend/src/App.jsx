import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

export default function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <nav style={{ display: "flex", gap: 12, padding: 12 }}>
        <Link to="/">Home</Link>
        {token ? <button onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>Logout</button> : <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>}
        <Link to="/create">Create Post</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
