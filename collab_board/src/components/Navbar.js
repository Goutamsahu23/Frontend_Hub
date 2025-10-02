import React from "react";
import { logout } from "../services/auth";

export default function Navbar({ user }) {
  return (
    <div className="header">
      <div className="brand">
        <div className="logo">CB</div>
        <div>
          <div className="title">CollabBoard</div>
          <div style={{fontSize:12, color:"var(--muted)"}}>Real-time sticky notes</div>
        </div>
      </div>

      <div style={{display:"flex", alignItems:"center", gap:12}}>
        {user ? (
          <>
            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:700}}>{user.name}</div>
              <div style={{fontSize:12, color:"var(--muted)"}}>{user.email}</div>
            </div>
            <button className="btn secondary" onClick={logout}>Logout</button>
          </>
        ) : (
            <>
            <div style={{color:"var(--muted)"}}>Welcome</div>
            <button className="btn secondary" onClick={logout}>Logout</button>
            </>
          
          
        )}
      </div>
    </div>
  );
}