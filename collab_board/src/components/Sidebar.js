// src/components/Sidebar.js
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Sidebar({ boardId }) {
  const [logs, setLogs] = useState([]);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    if (!boardId) return;
    api.get(`/api/boards/${boardId}`).then(res => setBoard(res.data)).catch(()=>{});
    api.get(`/api/boards/${boardId}/activity`).then(res => setLogs(res.data.logs || [])).catch(()=>{});
  }, [boardId]);

  return (
    <>
      <div className="card">
        <h4 style={{margin:0}}>{board?.title || "Board"}</h4>
        <div className="small" style={{marginTop:8}}>Owner: {board?.owner?.name || "—"}</div>
        <div style={{marginTop:8}}>
          <strong className="small">Members</strong>
          <ul style={{paddingLeft:16}}>
            {(board?.members || []).map(m => <li key={m._id}>{m.name} <small style={{color:"var(--muted)"}}>({m.email})</small></li>)}
          </ul>
        </div>
      </div>

      <div className="card activity-list">
        <h4 style={{marginTop:0}}>Activity</h4>
        {logs.length === 0 ? <div className="small">No recent activity</div> : logs.map(l => (
          <div key={l._id} className="activity-item">
            <div style={{fontSize:13, fontWeight:600}}>{l.userId?.name || "Unknown"}</div>
            <div style={{fontSize:13}} className="small">{l.action}</div>
            <div style={{fontSize:12, color:"var(--muted)", marginTop:6}}>{new Date(l.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </>
  );
}
