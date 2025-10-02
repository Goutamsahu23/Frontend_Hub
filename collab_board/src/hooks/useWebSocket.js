// src/hooks/useWebSocket.js
import { useEffect, useRef } from "react";

export default function useWebSocket(boardId, onMessage, userId) {
  const wsRef = useRef(null);
  const reconnectRef = useRef(0);

  useEffect(() => {
    if (!boardId) return;
    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";
    let ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectRef.current = 0;
      // send join event; include userId if available (server should validate)
      ws.send(JSON.stringify({ type: "join_board", boardId, userId }));
    };

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        onMessage && onMessage(data);
      } catch (err) { console.error("WS parse err", err); }
    };

    ws.onclose = () => {
      // simple reconnect backoff
      setTimeout(() => {
        reconnectRef.current = Math.min(30000, (reconnectRef.current || 1000) * 2);
        wsRef.current = new WebSocket(WS_URL);
      }, reconnectRef.current || 1000);
    };

    ws.onerror = (err) => { console.error("WS err", err); ws.close(); };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "leave_board", boardId }));
        ws.close();
      }
    };
  }, [boardId, userId, onMessage]);

  const sendEvent = (evt) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(evt));
  };

  return sendEvent;
}
