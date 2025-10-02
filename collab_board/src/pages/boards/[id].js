// src/pages/boards/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import BoardCanvas from "../../components/BoardCanvas";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import useWebSocket from "../../hooks/useWebSocket";

export default function BoardPage() {
  const router = useRouter();
  const { id: boardId } = router.query;
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const jwtDecode = require("jwt-decode");
        const payload = jwtDecode(token);
        setUser({ id: payload.id || payload._id, name: payload.name || payload.email, email: payload.email });
      } catch(e){}
    }
  }, []);

  useEffect(() => {
    if (!boardId) return;
    api.get(`/api/boards/${boardId}/notes`).then(res => setNotes(res.data)).catch(()=>{});
  }, [boardId]);

  const sendEvent = useWebSocket(boardId, (data) => {
    if (!data) return;
    if (data.type === "note_created") setNotes(prev => [...prev, data.note]);
    if (data.type === "note_updated") setNotes(prev => prev.map(n => n._id === data.noteId ? { ...n, ...data.updates } : n));
    if (data.type === "note_deleted") setNotes(prev => prev.filter(n => n._id !== data.noteId));
  }, user?.id);

  const createNote = async () => {
  try {
    const payload = { text: "To-DOs :-", x: 40, y: 40, color: "#FFF59D" }; // empty text -> placeholder
    const res = await api.post(`/api/boards/${boardId}/notes`, payload);
    const note = res.data;
    // broadcast created note
    sendEvent && sendEvent({ type: "note_created", boardId, note });
    setNotes(prev => [...prev, note]);
  } catch (err) {
    console.error("createNote failed", err);
  }
};

 const updateNote = async (noteId, updates) => {
  try {
    // if move-only (move:true) send move flag in body so server does not increment version
    await api.put(`/api/boards/${boardId}/notes/${noteId}`, updates);
    if (updates.move) {
      // broadcast move event
      sendEvent && sendEvent({ type: "note_updated", boardId, noteId, updates: { x: updates.x, y: updates.y } });
      // update local state
      setNotes(prev => prev.map(n => n._id === noteId ? { ...n, position: { x: updates.x, y: updates.y } } : n));
    } else {
      // content update — server increments version and returns note if you refetch; but we optimistically update
      sendEvent && sendEvent({ type: "note_updated", boardId, noteId, updates });
      setNotes(prev => prev.map(n => n._id === noteId ? { ...n, ...updates, version: (n.version||1)+1 } : n));
    }
  } catch (err) {
    console.error("updateNote failed", err);
  }
};

const deleteNote = async (noteId) => {
  try {
    await api.delete(`/api/boards/${boardId}/notes/${noteId}`);
    sendEvent && sendEvent({ type: "note_deleted", boardId, noteId });
    setNotes(prev => prev.filter(n => n._id !== noteId));
  } catch (err) {
    console.error("deleteNote failed", err);
  }
};

  return (
    <div className="container">
      <Navbar user={user} />
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <div>
          <h2 style={{margin:0}}>Board</h2>
          <div style={{color:"var(--muted)"}}>Collaborate in real-time</div>
        </div>
        <div>
          <button className="btn" onClick={createNote}>Add note</button>
          <button className="btn secondary" style={{marginLeft:8}} onClick={()=>router.push("/")}>Back</button>
        </div>
      </div>

      <BoardCanvas notes={notes} onUpdate={updateNote} onDelete={deleteNote}>
        <Sidebar boardId={boardId} />
      </BoardCanvas>
    </div>
  );
}
