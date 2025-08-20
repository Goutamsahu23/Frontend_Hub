"use client";
import { useState, useEffect } from "react";
import styles from "../styles/VerticalSlider.module.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const leftSlides = [
  { title: "Nature flower", text: "all in pink", color: "#FD3555" },
  { title: "Bluuue Sky", text: "with it's mountains", color: "#2A86BA" },
  { title: "Lonely castle", text: "in the wilderness", color: "#252E33" },
  { title: "Flying eagle", text: "in the sunset", color: "#FFB866" },
];

const rightSlides = [
  "https://images.unsplash.com/photo-1508768787810-6adc1f613514?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1519981593452-666cf05569a9?auto=format&fit=crop&w=715&q=80",
  "https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?auto=format&fit=crop&w=1002&q=80",
  "https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?auto=format&fit=crop&w=1050&q=80",
];

export default function VerticalSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesLength = rightSlides.length;

  const changeSlide = (direction: "up" | "down") => {
    if (direction === "up") {
      setActiveIndex((prev) => (prev + 1) % slidesLength);
    } else {
      setActiveIndex((prev) => (prev - 1 + slidesLength) % slidesLength);
    }
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("up");
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, []);


  

  return (
    <div className={styles.sliderContainer}>
      {/* Left Slide */}
      <div
        className={styles.leftSlide}
        style={{
          top: `-${(slidesLength - 1) * 100}vh`,
          transform: `translateY(${activeIndex * 100}vh)`,
        }}
      >
        {leftSlides.map((slide, index) => (
          <div key={index} style={{ backgroundColor: slide.color }}>
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
          </div>
        ))}
      </div>

      {/* Right Slide */}
      <div
        className={styles.rightSlide}
        style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
      >
        {rightSlides.map((image, index) => (
          <div key={index} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.actionButtons}>
        <button
          className={styles.downButton}
          onClick={() => changeSlide("down")}
        >
          <FaArrowDown />
        </button>
        <button
          className={styles.upButton}
          onClick={() => changeSlide("up")}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
}
