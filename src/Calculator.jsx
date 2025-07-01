import React, { useState } from "react";
import "./Calculator.css";


const buttons = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "C", "←"
];

export const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  console.log(process.env.VITE_BACKEND_URL)
  console.log("ENV:", import.meta.env);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(import.meta.env.VITE_BACKEND_URL);
  const calculate = async () => {
    const res = await fetch(apiUrl + "/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression }),
    });

    if (res.ok) {
      const data = await res.json();
      setResult(data.result.toString());
    } else {
      setResult("Error");
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setExpression("");
      setResult(null);
    } else if (value === "←") {
      setExpression((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      calculate();
    } else {
      setExpression((prev) => prev + value);
      setResult(null);
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">
        {(result ?? expression) || "0"}
      </div>

      <div className="buttons-grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className="calc-button"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
