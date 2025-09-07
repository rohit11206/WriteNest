import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function CreatePost(){
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      const res = await api("/blog/create", { method: "POST", body: { title, content }, token });
      nav(`/post/${res.blog._id}`);
    }catch(err){
      alert(err.data?.message || "Create failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:700, margin:"20px auto"}}>
      <h2>Create Post</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Content" rows={10} value={content} onChange={e=>setContent(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
