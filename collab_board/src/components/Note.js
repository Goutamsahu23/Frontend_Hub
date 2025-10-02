// src/components/Note.js
import { useState } from "react";

export default function Note({ note, containerRef, onUpdate, onDelete }) {
  const [text, setText] = useState(note.text || "");

  const handleDragEnd = (e) => {
    if (!containerRef?.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 80; // center offset
    const y = e.clientY - rect.top - 20;
    // move-only update: pass move: true
    onUpdate(note._id, { x: Math.max(0, x), y: Math.max(0, y), move: true });
  };

  return (
    <div
      className="note"
      style={{
        left: note.position?.x ?? 20,
        top: note.position?.y ?? 20,
        background: note.color ?? "#FFD670",
      }}
      draggable
      onDragEnd={handleDragEnd}
    >
      <textarea
        className="note-text"
        placeholder="Write something..."   /* <-- watermark */
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if ((note.text || "") !== text) {
            onUpdate(note._id, { text }); // content update — server increments version
          }
        }}
      />
      <div className="note-footer">
        <div className="small">v{note.version || 1}</div>
        <div style={{display:"flex", gap:8}}>
          <input
            type="color"
            value={note.color || "#FFD670"}
            onChange={(e) => onUpdate(note._id, { color: e.target.value })}
            title="Change color"
            style={{width:34, height:28, borderRadius:6, border:0}}
          />
          <button className="btn secondary" onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
