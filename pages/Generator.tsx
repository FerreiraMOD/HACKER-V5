
import React, { useState } from 'react';
import { UserSession, Country, MOZAMBIQUE_HOUSES, ANGOLA_HOUSES, Prediction } from '../types';
import { useNavigate } from 'react-router-dom';

interface GeneratorProps {
  session: UserSession;
}

const Generator: React.FC<GeneratorProps> = ({ session }) => {
  const navigate = useNavigate();
  const [house, setHouse] = useState('');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [signals, setSignals] = useState<Prediction[]>([]);

  const houses = session.country === Country.Mozambique ? MOZAMBIQUE_HOUSES : ANGOLA_HOUSES;

  const generateSignals = () => {
    if (!house) return alert('Selecione uma casa primeiro!');
    
    setLoading(true);
    if (navigator.vibrate) navigator.vibrate([10, 50, 10]);

    setTimeout(() => {
      const newSignals: Prediction[] = [];
      const now = new Date();
      
      for (let i = 0; i < count; i++) {
        const signalTime = new Date(now.getTime() + (Math.random() * 60 * 60 * 1000));
        const timeStr = signalTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        const typeRand = Math.random();
        let type: 'Azul' | 'Roxo' | 'Rosa' = 'Azul';
        let mult = '';
        
        if (typeRand > 0.9) {
            type = 'Rosa';
            mult = (Math.random() * 5 + 10).toFixed(2) + 'x';
        } else if (typeRand > 0.4) {
            type = 'Roxo';
            mult = (Math.random() * 7 + 2).toFixed(2) + 'x';
        } else {
            type = 'Azul';
            mult = (Math.random() * 0.9 + 1).toFixed(2) + 'x';
        }

        newSignals.push({
          time: timeStr,
          multiplier: mult,
          type: type
        });
      }

      setSignals(newSignals.sort((a, b) => a.time.localeCompare(b.time)));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto pb-24 md:pb-12">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/hub')} className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">← Back</button>
        <div className="text-center">
            <h2 className="text-2xl font-orbitron font-bold neon-pink uppercase">CRASH ANALYZER</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Manual Input</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="bg-glass-heavy p-6 rounded-3xl border border-pink-500/20 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase font-bold text-gray-500 tracking-widest mb-3">Plataforma:</label>
            <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-500">
              {houses.map(h => (
                <button 
                  key={h}
                  onClick={() => setHouse(h)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                    house === h ? 'border-pink-500 bg-pink-500/20 text-white shadow-[0_0_15px_rgba(255,0,153,0.1)]' : 'border-white/5 text-gray-500 hover:border-white/20'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-gray-500 tracking-widest mb-3">Qtd. de Entradas:</label>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                <span>1</span>
                <span className="text-pink-400">{count} SINAIS</span>
                <span>15</span>
            </div>
          </div>

          <button 
            onClick={generateSignals}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-400 text-white font-orbitron font-bold rounded-2xl shadow-[0_5px_20px_rgba(255,0,153,0.3)] active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-3"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'GERAR ENTRADAS'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {signals.map((sig, idx) => (
          <div 
            key={idx} 
            className="bg-glass p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-pink-500/20 transition-all animate-fadeIn"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/40 flex flex-col items-center justify-center border border-white/5">
                    <span className="font-orbitron text-sm neon-pink">{sig.time}</span>
                </div>
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">{house}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Confirmed</p>
                </div>
            </div>
            <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-xs font-bold font-orbitron ${
                    sig.type === 'Rosa' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 
                    sig.type === 'Roxo' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                    {sig.multiplier}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Generator;
