/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        armLeftSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-30deg)" },
        },
        armRightSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(30deg)" },
        },
        legLeftSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-40deg)" },
        },
        legRightSwing: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(40deg)" },
        },
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-40px)" },
        },
      },
      animation: {
        "arm-left": "armLeftSwing 0.5s infinite ease-in-out",
        "arm-right": "armRightSwing 0.5s infinite ease-in-out",
        "leg-left": "legLeftSwing 0.5s infinite ease-in-out",
        "leg-right": "legRightSwing 0.5s infinite ease-in-out",
        jump: "jump 0.8s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
