
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserSession, Country, MOZAMBIQUE_HOUSES, ANGOLA_HOUSES } from '../types';
import { useNavigate } from 'react-router-dom';

interface AutoGeneratorProps {
  session: UserSession;
}

const AutoGenerator: React.FC<AutoGeneratorProps> = ({ session }) => {
  const navigate = useNavigate();
  const [showSentimentModal, setShowSentimentModal] = useState(true);
  const [isPaying, setIsPaying] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState('');
  const [currentSignal, setCurrentSignal] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isAutoActive, setIsAutoActive] = useState(false);
  
  const houses = session.country === Country.Mozambique ? MOZAMBIQUE_HOUSES : ANGOLA_HOUSES;

  // Relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Motor de Countdown e Auto-Geração
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0 && selectedHouse && !scanning && isAutoActive) {
      generateNewSignal();
    }
    return () => clearInterval(timer);
  }, [countdown, selectedHouse, scanning, isAutoActive]);

  const generateNewSignal = useCallback(() => {
    if (!selectedHouse) return alert("Selecione uma casa de apostas primeiro.");
    
    setScanning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setTimeout(() => {
      const typeRand = Math.random();
      let type: 'Azul' | 'Roxo' | 'Rosa';
      let value: number;
      
      if (typeRand > 0.85) {
        type = 'Rosa';
        value = Number((Math.random() * 5.99 + 10).toFixed(2)); // 10.00x a 15.99x
      } else if (typeRand > 0.4) {
        type = 'Roxo';
        value = Number((Math.random() * 7.99 + 2).toFixed(2)); // 2.00x a 9.99x
      } else {
        type = 'Azul';
        value = Number((Math.random() * 0.99 + 1).toFixed(2)); // 1.00x a 1.99x
      }

      const protectionValue = Number((value - (Math.random() * 0.5 + 0.1)).toFixed(2));
      const riskValue = Number((value + (Math.random() * 2 + 0.5)).toFixed(2));

      setCurrentSignal({
        type,
        possible: value.toFixed(2) + 'x',
        protection: (protectionValue < 1 ? 1.10 : protectionValue).toFixed(2) + 'x',
        risk: riskValue.toFixed(2) + 'x',
        probability: Math.floor(Math.random() * 20 + 78) + '%'
      });
      
      setCountdown(Math.floor(Math.random() * 21 + 30)); // 30-50s
      setScanning(false);
      if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
    }, 1500);
  }, [selectedHouse]);

  const toggleAutoMode = () => {
    if (!selectedHouse) return alert("Selecione uma casa antes de ativar o modo automático.");
    setIsAutoActive(!isAutoActive);
    if (!isAutoActive && !currentSignal && !scanning) {
        generateNewSignal();
    }
    if (navigator.vibrate) navigator.vibrate(20);
  };

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto pb-24 md:pb-12 bg-[#050510]">
      {/* Modal de Sentimento do Mercado */}
      {showSentimentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-lg">
            <div className="bg-glass-heavy p-8 rounded-3xl border border-cyan-500/30 text-center max-w-sm w-full">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">📊</span>
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-4 neon-cyan">MARKET SCANNER</h3>
                <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest font-bold">A inteligência detectou fluxo. O mercado está a pagar agora?</p>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => { setIsPaying(true); setShowSentimentModal(false); }}
                      className="py-4 bg-green-500 text-black font-bold rounded-2xl hover:scale-105 transition-all uppercase text-xs"
                    >PAGANDO</button>
                    <button 
                      onClick={() => { setIsPaying(false); setShowSentimentModal(false); }}
                      className="py-4 bg-red-500 text-white font-bold rounded-2xl hover:scale-105 transition-all uppercase text-xs"
                    >RETENDO</button>
                </div>
            </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/hub')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">←</button>
        <div className="text-center">
            <h2 className="text-xl font-orbitron font-bold neon-cyan uppercase">AUTO SIGNAL</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">{currentTime}</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="bg-glass p-6 rounded-3xl border border-white/5 mb-8 shadow-2xl">
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Plataforma de Operação:</label>
                <button 
                  onClick={toggleAutoMode}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${
                    isAutoActive ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-transparent text-gray-500 border-white/10'
                  }`}
                >
                  Modo Auto: {isAutoActive ? 'ON' : 'OFF'}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500">
                {houses.map(h => (
                    <button 
                      key={h}
                      onClick={() => setSelectedHouse(h)}
                      className={`py-2 px-3 text-[10px] font-bold rounded-lg border transition-all ${
                        selectedHouse === h ? 'border-cyan-500 bg-cyan-500/20 text-white' : 'border-white/5 text-gray-500'
                      }`}
                    >
                      {h}
                    </button>
                ))}
            </div>
        </div>

        <div className={`p-8 rounded-2xl border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${
            scanning ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/5 bg-black/40'
        }`}>
            {scanning ? (
                <div className="text-center py-6">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                    <p className="text-[10px] uppercase tracking-[0.3em] neon-cyan animate-pulse">Sincronizando Rede {progress}%</p>
                </div>
            ) : currentSignal ? (
                <div className="w-full text-center space-y-6">
                    <div className="flex justify-center items-center gap-4">
                        <div className={`w-3 h-3 rounded-full animate-ping ${
                            currentSignal.type === 'Rosa' ? 'bg-pink-500' : (currentSignal.type === 'Roxo' ? 'bg-purple-500' : 'bg-blue-500')
                        }`}></div>
                        <span className="font-orbitron text-xl font-bold uppercase tracking-widest">SINAL ATIVO</span>
                    </div>

                    <div className="bg-white/5 py-4 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Expira em</p>
                        <div className="text-3xl font-orbitron font-bold neon-cyan">00:{countdown.toString().padStart(2, '0')}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Cor Alvo</p>
                            <p className={`font-orbitron text-lg font-bold ${
                                currentSignal.type === 'Rosa' ? 'text-pink-400' : (currentSignal.type === 'Roxo' ? 'text-purple-400' : 'text-blue-400')
                            }`}>{currentSignal.type}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Possível</p>
                            <p className="font-orbitron text-lg font-bold text-white">{currentSignal.possible}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Proteção</p>
                            <p className="font-orbitron text-lg font-bold text-green-400">{currentSignal.protection}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Risco</p>
                            <p className="font-orbitron text-lg font-bold text-red-500">{currentSignal.risk}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    <div className="text-5xl mb-4">⚡</div>
                    <p className="text-xs uppercase tracking-widest font-bold">IA Aguardando Comando</p>
                    <p className="text-[10px] text-gray-600 mt-2 uppercase">{selectedHouse || 'Selecione uma casa para iniciar'}</p>
                </div>
            )}
        </div>

        <button 
          onClick={generateNewSignal}
          disabled={scanning}
          className="mt-8 w-full py-4 bg-cyan-500 text-black font-orbitron font-bold rounded-2xl shadow-[0_0_20px_rgba(0,243,255,0.3)] active:scale-95 transition-all uppercase tracking-widest disabled:opacity-20"
        >
          {scanning ? 'SCANNEANDO...' : 'OBTER SINAL AGORA'}
        </button>
      </div>

      <div className="bg-glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isAutoActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-[10px] font-bold uppercase text-gray-400">
                {isAutoActive ? 'Modo Automático Ativo' : 'Modo Manual Ativo'}
              </span>
          </div>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Bot Online</span>
      </div>
    </div>
  );
};

export default AutoGenerator;
