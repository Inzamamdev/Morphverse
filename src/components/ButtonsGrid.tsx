import React from "react"

interface Props {
    setShape: React.Dispatch<React.SetStateAction<string>>
}

export default function ButtonsGrid({ setShape }: Props) {
    return (
        <div className="w-full h-20 border-2 bg-slate-500 flex justify-evenly items-center">
            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setShape('square')}>Square</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setShape('plank')}>Plank</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setShape('circle')}>Circle</button>
        </div>
    )
}