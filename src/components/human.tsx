import React, { useState } from "react";

export default function HumanAnimation() {
  const [state, setState] = useState<"idle" | "running" | "jumping">("idle");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className={`w-48 h-48 ${
          state === "running" ? "animate-run" : ""
        } ${state === "jumping" ? "animate-jump" : ""}`}
      >
        {/* Head */}
        <circle cx="100" cy="40" r="15" fill="black" />

        {/* Body */}
        <line
          x1="100"
          y1="55"
          x2="100"
          y2="100"
          stroke="black"
          strokeWidth="3"
        />

        {/* Arms (Running animation) */}
        <path
          d="M100 65 Q90 75 80 85"
          fill="none"
          stroke="black"
          strokeWidth="3"
          className={`transition-transform ${
            state === "running" ? "animate-arm-left" : ""
          }`}
        />
        <path
          d="M100 65 Q110 75 120 85"
          fill="none"
          stroke="black"
          strokeWidth="3"
          className={`transition-transform ${
            state === "running" ? "animate-arm-right" : ""
          }`}
        />

        {/* Legs (Running animation) */}
        <path
          d="M100 100 Q95 115 90 130"
          fill="none"
          stroke="black"
          strokeWidth="3"
          className={`transition-transform ${
            state === "running" ? "animate-leg-left" : ""
          }`}
        />
        <path
          d="M100 100 Q105 115 110 130"
          fill="none"
          stroke="black"
          strokeWidth="3"
          className={`transition-transform ${
            state === "running" ? "animate-leg-right" : ""
          }`}
        />
      </svg>

      <div className="mt-6 space-x-4">
        <button
          onClick={() => setState("idle")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Idle
        </button>
        <button
          onClick={() => setState("running")}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Run
        </button>
        <button
          onClick={() => setState("jumping")}
          className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
        >
          Jump
        </button>
      </div>
    </div>
  );
}
