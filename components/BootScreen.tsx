
import React, { useState, useEffect } from 'react';

const BootScreen: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const terminalLines = [
    "> INITIALIZING H4CK3R F-A v2.0...",
    "> CONNECTING TO FIREBASE CORE...",
    "> BYPASSING SECURITY PROTOCOLS...",
    "> LOADING NEURAL NETWORK MODELS...",
    "> SYNCING GAMBLING PREDICTION ALGORITHMS...",
    "> ESTABLISHING ENCRYPTED TUNNEL...",
    "> ACCESS GRANTED. WELCOME ARCHITECT."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#050510] flex flex-col items-center justify-center z-50 p-6">
      <div className="w-full max-w-xl bg-black border border-cyan-500/30 p-4 rounded font-mono text-sm sm:text-base">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="space-y-2">
          {lines.map((line, idx) => (
            <p key={idx} className="text-cyan-400">
              <span className="text-pink-500 mr-2">root@h4ck3r:~$</span>
              {line}
            </p>
          ))}
          <p className="animate-pulse text-white">_</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h1 className="text-4xl font-orbitron font-bold neon-cyan mb-2">H4CK3R F-A</h1>
        <p className="text-gray-400 tracking-widest uppercase">Version 2.0 Premium</p>
      </div>
    </div>
  );
};

export default BootScreen;
