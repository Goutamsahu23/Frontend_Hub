// src/pages/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { register, login } from "../services/auth";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      // try to fetch boards
      fetchBoards();
      try {
        const jwtDecode = require("jwt-decode");
        const payload = jwtDecode(token);
        setUser({ name: payload.name || payload.email, email: payload.email, id: payload.id || payload._id });
      } catch (e) {}
    }
  }, []);

  async function handleAuth(e) {
    e.preventDefault();
    try {
      const data = mode === "register" ? await register(form) : await login({ email: form.email, password: form.password });
      setUser({ name: data.name, email: data.email, id: data.id });
      setForm({ name:"", email:"", password:"" });
      fetchBoards();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  async function fetchBoards() {
    try {
      const res = await api.get("/api/boards");
      setBoards(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function createBoard() {
    const title = prompt("Board title");
    if (!title) return;
    const res = await api.post("/api/boards", { title });
    router.push(`/boards/${res.data._id}`);
  }

  return (
    <div className="container">
      <Navbar user={user} />
      <div style={{display:"grid", gridTemplateColumns:"360px 1fr", gap:18}}>
        <div className="card">
          {!user ? (
            <form onSubmit={handleAuth}>
              <h3 style={{marginTop:0}}>{mode === "login" ? "Welcome back" : "Create account"}</h3>
              {mode === "register" && <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />}
              <div className="form-row">
                <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
              </div>
              <div className="form-row">
                <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
              </div>
              <div style={{display:"flex", gap:8}}>
                <button className="btn" type="submit">{mode === "login" ? "Login" : "Register"}</button>
                <button type="button" className="btn secondary" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create account":"Have account?"}</button>
              </div>
            </form>
          ) : (
            <>
              <h3 style={{marginTop:0}}>Hello, {user.name}</h3>
              <div style={{marginTop:10}}><button className="btn" onClick={createBoard}>+ New board</button></div>
            </>
          )}
        </div>

        <div>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
            <h3 style={{margin:0}}>Your boards</h3>
            <div style={{color:"var(--muted)", fontSize:13}}>{boards.length} boards</div>
          </div>

          <div className="boards-grid">
            {boards.map(b => (
              <div className="board-tile card" key={b._id} onClick={()=>router.push(`/boards/${b._id}`)}>
                <div className="board-title">{b.title}</div>
                <div className="board-meta">Owner: {b.owner?.name || "—"}</div>
              </div>
            ))}
            {boards.length === 0 && <div className="card">No boards yet. Create your first one!</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
