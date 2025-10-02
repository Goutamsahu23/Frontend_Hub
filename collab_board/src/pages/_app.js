// src/pages/_app.js
import { useEffect } from "react";
import "../styles/globals.css";
import api, { setAuthToken } from "../services/api";
import jwtDecode from "jwt-decode";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // If token exists in localStorage, attach it to axios default headers
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
