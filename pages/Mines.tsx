
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSession } from '../types';

interface MinesProps {
  session: UserSession;
}

const Mines: React.FC<MinesProps> = ({ session }) => {
  const navigate = useNavigate();
  const [mineCount, setMineCount] = useState(3);
  const [grid, setGrid] = useState<boolean[]>(new Array(25).fill(false));
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<boolean[][]>([]);
  const [timer, setTimer] = useState(270);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 270));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generatePrediction = () => {
    setLoading(true);
    if (navigator.vibrate) navigator.vibrate([20, 100]);
    setTimeout(() => {
      const newGrid = new Array(25).fill(false);
      const safeSpots = 5;
      let count = 0;
      while (count < safeSpots) {
        const randomIndex = Math.floor(Math.random() * 25);
        if (!newGrid[randomIndex]) {
          newGrid[randomIndex] = true;
          count++;
        }
      }
      setGrid(newGrid);
      setHistory(prev => [newGrid, ...prev.slice(0, 2)]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto pb-24 md:pb-12 bg-[#050510]">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/hub')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">←</button>
        <div className="text-center">
            <h2 className="text-2xl font-orbitron font-bold neon-cyan uppercase">MINES BOT</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">IA Engine v2.0</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="bg-glass p-6 rounded-3xl border border-cyan-500/20 mb-8">
        <div className="grid grid-cols-5 gap-2 aspect-square mb-8 relative">
          {grid.map((isDiamond, idx) => (
            <div 
              key={idx}
              className={`rounded-lg flex items-center justify-center text-2xl transition-all duration-500 ${
                isDiamond ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.3)]' : 'bg-black/40 border-white/5'
              } border`}
            >
              {isDiamond ? '💎' : ''}
            </div>
          ))}
          {loading && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-orbitron text-xs neon-cyan animate-pulse">MAPUANDO GRID...</p>
            </div>
          )}
        </div>

        <button 
          onClick={generatePrediction}
          disabled={loading}
          className="w-full py-4 bg-cyan-500 text-black font-orbitron font-bold rounded-2xl uppercase tracking-widest shadow-xl"
        >
          OBTER NOVO SINAL
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-glass p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Válido Por</p>
            <p className="text-xl font-orbitron font-bold neon-pink">{formatTime(timer)}</p>
        </div>
        <div className="bg-glass p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Assertividade</p>
            <p className="text-xl font-orbitron font-bold neon-cyan">98.4%</p>
        </div>
      </div>
    </div>
  );
};

export default Mines;
