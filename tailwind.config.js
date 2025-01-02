/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        armLeftSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-30deg) translateY(5px)" }, // Bend at elbow
          "50%": { transform: "rotate(0deg) translateY(0px)" },
          "75%": { transform: "rotate(30deg) translateY(5px)" }, // Bend at elbow
        },
        armRightSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(30deg) translateY(5px)" }, // Bend at elbow
          "50%": { transform: "rotate(0deg) translateY(0px)" },
          "75%": { transform: "rotate(-30deg) translateY(5px)" }, // Bend at elbow
        },
        legLeftSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-45deg) translateY(10px)" }, // Bend at knee
          "50%": { transform: "rotate(0deg) translateY(0px)" },
          "75%": { transform: "rotate(45deg) translateY(10px)" }, // Bend at knee
        },
        legRightSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(45deg) translateY(10px)" }, // Bend at knee
          "50%": { transform: "rotate(0deg) translateY(0px)" },
          "75%": { transform: "rotate(-45deg) translateY(10px)" }, // Bend at knee
        },
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-40px)" },
        },
      },
      animation: {
        "arm-left": "armLeftSwing 1s infinite ease-in-out",
        "arm-right": "armRightSwing 1s infinite ease-in-out",
        "leg-left": "legLeftSwing 1s infinite ease-in-out",
        "leg-right": "legRightSwing 1s infinite ease-in-out",
        jump: "jump 0.8s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
