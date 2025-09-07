import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Signup(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await api("/user/signup", { method: "POST", body: { name, email, password } });
      localStorage.setItem("token", res.token);
      nav("/");
    }catch(err){
      alert(err.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400, margin:"20px auto"}}>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Sign up</button>
    </form>
  );
}
