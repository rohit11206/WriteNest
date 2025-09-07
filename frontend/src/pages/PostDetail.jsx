import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function PostDetail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [post,setPost]=useState(null);
  useEffect(()=>{
    (async ()=>{
      try{
        const data = await api(`/blog/${id}`);
        setPost(data);
      }catch(err){ console.error(err); }
    })();
  },[id]);

  const remove = async () => {
    if (!confirm("Delete this post?")) return;
    try{
      const token = localStorage.getItem("token");
      await api(`/blog/${id}`, { method: "DELETE", token });
      nav("/");
    }catch(err){
      alert(err.data?.message || "Failed to delete");
    }
  };

  if(!post) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h1>{post.title}</h1>
      <p>By {post.author?.name}</p>
      <div>{post.content}</div>
      {localStorage.getItem("token") && post.author && (
        <>
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button onClick={remove}>Delete</button>
        </>
      )}
    </div>
  );
}
