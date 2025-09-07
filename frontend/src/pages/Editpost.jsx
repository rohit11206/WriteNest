import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";

export default function EditPost(){
  const { id } = useParams();
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const nav = useNavigate();

  useEffect(()=>{
    (async ()=>{
      try{
        const data = await api(`/blog/${id}`);
        setTitle(data.title);
        setContent(data.content);
      }catch(err){ console.error(err); }
    })();
  },[id]);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      const res = await api(`/blog/${id}`, { method: "PUT", body: { title, content }, token });
      nav(`/post/${id}`);
    }catch(err){
      alert(err.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:700, margin:"20px auto"}}>
      <h2>Edit Post</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea rows={10} value={content} onChange={e=>setContent(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}
