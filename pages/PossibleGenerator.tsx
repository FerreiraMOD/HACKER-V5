
import React, { useState } from 'react';
import { UserSession, Prediction, MOZAMBIQUE_HOUSES, ANGOLA_HOUSES, Country } from '../types';
import { useNavigate } from 'react-router-dom';

interface PossibleGeneratorProps {
  session: UserSession;
}

const PossibleGenerator: React.FC<PossibleGeneratorProps> = ({ session }) => {
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState('');
  const [signals, setSignals] = useState<Prediction[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);

  const houses = session.country === Country.Mozambique ? MOZAMBIQUE_HOUSES : ANGOLA_HOUSES;

  const scanBackground = () => {
    if (!selectedHouse) return alert("Selecione a plataforma para escaneamento.");
    setLoading(true);
    setTimeout(() => {
      const data: Prediction[] = [];
      const baseTime = new Date();
      for (let i = 0; i < 6; i++) {
        const t = new Date(baseTime.getTime() + (Math.random() * 30 * 60 * 1000));
        const val = Number((Math.random() * 5 + 10).toFixed(2));
        data.push({
          time: t.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          multiplier: val.toFixed(2) + 'x',
          type: 'Rosa',
          target: val.toFixed(2) + 'x',
          protection: (val * 0.4).toFixed(2) + 'x',
          risk: (val * 1.5).toFixed(2) + 'x'
        });
      }
      setSignals(data.sort((a,b) => a.time.localeCompare(b.time)));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto pb-24 md:pb-12">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/hub')} className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">← Back</button>
        <div className="text-center">
            <h2 className="text-2xl font-orbitron font-bold neon-pink uppercase">BACKGROUND</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Deep Scan</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="bg-glass p-6 rounded-3xl border border-white/5 mb-6">
        <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-3">Plataforma Alvo:</label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-pink-500">
            {houses.map(h => (
                <button 
                    key={h}
                    onClick={() => setSelectedHouse(h)}
                    className={`py-2 px-3 text-[10px] font-bold rounded-lg border transition-all ${
                        selectedHouse === h ? 'border-pink-500 bg-pink-500/20 text-white shadow-[0_0_10px_rgba(255,0,153,0.2)]' : 'border-white/5 text-gray-500 hover:border-white/20'
                    }`}
                >
                    {h}
                </button>
            ))}
        </div>

        <button 
            onClick={scanBackground}
            disabled={loading}
            className="w-full py-4 bg-glass border border-pink-500/50 text-pink-500 font-orbitron font-bold rounded-2xl hover:bg-pink-500/10 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-20"
        >
            {loading ? <span className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></span> : 'ESCANEAMENTO PROFUNDO'}
        </button>
      </div>

      <div className="space-y-4">
        {signals.map((sig, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedSignal(sig)}
            className="bg-glass-heavy p-5 rounded-2xl border border-white/5 cursor-pointer hover:border-pink-500/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
                <span className="font-orbitron text-xl text-pink-400">{sig.time}</span>
                <div className="h-8 w-px bg-white/10"></div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Trend Analysis</p>
                    <p className="text-xs uppercase font-bold text-white">Rosa Detetado</p>
                </div>
            </div>
            <span className="text-gray-600 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        ))}
      </div>

      {selectedSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedSignal(null)}></div>
            <div className="relative w-full max-w-sm bg-glass-heavy p-8 rounded-3xl border border-pink-500/50 shadow-[0_0_50px_rgba(255,0,153,0.3)] animate-fadeIn">
                <button 
                  onClick={() => setSelectedSignal(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >✕</button>

                <div className="text-center mb-8">
                    <p className="text-xs text-pink-400 font-orbitron font-bold uppercase mb-2">Relatório Estrutural</p>
                    <h3 className="text-3xl font-orbitron font-bold">HORA: {selectedSignal.time}</h3>
                </div>

                <div className="space-y-6">
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-2">VALOR POSSÍVEL</p>
                        <p className="text-3xl font-orbitron font-bold neon-pink">{selectedSignal.target}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em] mb-1">PROTEÇÃO</p>
                            <p className="text-xl font-orbitron font-bold text-green-400">{selectedSignal.protection}</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em] mb-1">RISCO</p>
                            <p className="text-xl font-orbitron font-bold text-red-500">{selectedSignal.risk}</p>
                        </div>
                    </div>
                </div>

                <button 
                  onClick={() => setSelectedSignal(null)}
                  className="w-full mt-8 py-3 bg-white text-black font-orbitron font-bold rounded-xl uppercase tracking-widest text-xs"
                >
                    FECHAR
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PossibleGenerator;
