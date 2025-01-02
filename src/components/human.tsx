import React, { useState } from 'react';

const HumanAnimation: React.FC = () => {
  const [state, setState] = useState<'idle' | 'walk' | 'run' | 'jump'>('idle');

  const handleStateChange = (newState: 'idle' | 'walk' | 'run' | 'jump') => {
    setState(newState);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4 mb-8">
        <button onClick={() => handleStateChange('idle')} className="px-4 py-2 bg-blue-500 text-white rounded">Idle</button>
        <button onClick={() => handleStateChange('walk')} className="px-4 py-2 bg-green-500 text-white rounded">Walk</button>
        <button onClick={() => handleStateChange('run')} className="px-4 py-2 bg-red-500 text-white rounded">Run</button>
        <button onClick={() => handleStateChange('jump')} className="px-4 py-2 bg-yellow-500 text-white rounded">Jump</button>
      </div>
      <div className="w-32 h-32">
        {state === 'idle' && <Idle />}
        {state === 'walk' && <Walk />}
        {state === 'run' && <Run />}
        {state === 'jump' && <Jump />}
      </div>
    </div>
  );
};

const Idle: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-idle">
    <circle cx="50" cy="50" r="10" fill="black" />
    <line x1="50" y1="60" x2="50" y2="80" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="45" y2="90" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="55" y2="90" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="45" y2="70" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="55" y2="70" stroke="black" strokeWidth="2" />
  </svg>
);

const Walk: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-walk">
    <circle cx="50" cy="50" r="10" fill="black" />
    <line x1="50" y1="60" x2="50" y2="80" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="40" y2="90" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="60" y2="90" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="40" y2="70" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="60" y2="70" stroke="black" strokeWidth="2" />
  </svg>
);

const Run: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-run">
    <circle cx="50" cy="50" r="10" fill="black" />
    <line x1="50" y1="60" x2="50" y2="80" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="35" y2="85" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="65" y2="85" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="35" y2="65" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="65" y2="65" stroke="black" strokeWidth="2" />
  </svg>
);

const Jump: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-jump">
    <circle cx="50" cy="50" r="10" fill="black" />
    <line x1="50" y1="60" x2="50" y2="80" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="45" y2="90" stroke="black" strokeWidth="2" />
    <line x1="50" y1="80" x2="55" y2="90" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="45" y2="70" stroke="black" strokeWidth="2" />
    <line x1="50" y1="60" x2="55" y2="70" stroke="black" strokeWidth="2" />
  </svg>
);

export default HumanAnimation;