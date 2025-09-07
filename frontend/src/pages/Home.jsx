import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Home(){
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    (async ()=>{
      try{
        const data = await api("/blog", {});
        setPosts(data);
      }catch(err){
        console.error(err);
      }
    })();
  },[]);
  return (
    <div style={{padding:20}}>
      <h1>All Posts</h1>
      {posts.map(p=>(
        <article key={p._id} style={{border:"1px solid #ddd",padding:12,marginBottom:8}}>
          <h3><Link to={`/post/${p._id}`}>{p.title}</Link></h3>
          <p>By: {p.author?.name || "Unknown"}</p>
          <p>{p.content.slice(0,200)}...</p>
        </article>
      ))}
    </div>
  );
}
