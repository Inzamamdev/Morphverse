import React from "react";

interface Props {
  setShape: React.Dispatch<React.SetStateAction<string>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ButtonsGrid({ setShape, setStage }: Props) {
  return (
    <div className="w-full h-20 border-2 bg-slate-500 flex justify-evenly items-center  select-none">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setShape("square")}
      >
        Triangle
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setShape("plank")}
      >
        Plank
      </button>
      <button
        className="px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() => setShape("circle")}
      >
        Circle
      </button>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded"
        onClick={() => setStage(1)}
      >
        Stage 1
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setStage(2)}
      >
        Stage 2
      </button>

      <button
        className="px-4 py-2 bg-black text-white rounded"
        onClick={() => setStage(3)}
      >
        Stage 3
      </button>
    </div>
  );
}
