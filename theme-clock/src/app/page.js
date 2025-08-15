"use client";
import dynamic from "next/dynamic";
import "./globals.css";

const Clock = dynamic(() => import("../components/Clock"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Clock />
    </main>
  );
}
