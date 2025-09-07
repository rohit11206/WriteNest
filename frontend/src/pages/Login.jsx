import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav=useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await api("/user/login", { method: "POST", body: { email, password } });
      localStorage.setItem("token", res.token);
      nav("/");
    }catch(err){
      alert(err.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400, margin:"20px auto"}}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
