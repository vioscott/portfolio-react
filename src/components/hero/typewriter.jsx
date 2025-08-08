import React, { useEffect, useState } from "react";

const Typewriter = ({ text = "", speed = 80, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    console.log("Typewriter received text:", text); // Debug log

    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <h2 className={`hero-subtitle ${className}`}>
      {displayedText}
      <span className="caret">|</span>
    </h2>
  );
};

export default Typewriter;
