"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const day = time.getDay();
  const month = time.getMonth();
  const date = time.getDate();

  const scale = (num, in_min, in_max, out_min, out_max) =>
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  return (
    <div className="clock-container">
      <button className="toggle" onClick={() => setDarkMode((dm) => !dm)}>
        {darkMode ? "Light mode" : "Dark mode"}
      </button>
      <div className="clock">
        <div
          className="needle hour"
          style={{
            transform: `translate(-50%, -100%) rotate(${scale(
              hoursForClock,
              0,
              12,
              0,
              360
            )}deg)`,
          }}
        ></div>
        <div
          className="needle minute"
          style={{
            transform: `translate(-50%, -100%) rotate(${scale(
              minutes,
              0,
              60,
              0,
              360
            )}deg)`,
          }}
        ></div>
        <div
          className="needle second"
          style={{
            transform: `translate(-50%, -100%) rotate(${scale(
              seconds,
              0,
              60,
              0,
              360
            )}deg)`,
          }}
        ></div>
        <div className="center-point"></div>
      </div>
      <div className="time">
        {hoursForClock}:{minutes < 10 ? `0${minutes}` : minutes} {ampm}
      </div>
      <div className="date">
        {days[day]}, {months[month]} <span className="circle">{date}</span>
      </div>
    </div>
  );
}
