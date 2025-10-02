// src/components/BoardCanvas.js
import Note from "./Note";
import { useRef } from "react";

export default function BoardCanvas({ notes, onUpdate, onDelete, children }) {
  const containerRef = useRef();
  return (
    <div style={{display:"flex", gap:16}}>
      <div className="canvas card" ref={containerRef}>
        {notes.map(n => (
          <Note key={n._id} note={n} containerRef={containerRef} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
      <div className="sidebar">
        {children}
      </div>
    </div>
  );
}