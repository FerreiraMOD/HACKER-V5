
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, UserSession } from '../types';

interface CountrySelectProps {
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ setSession }) => {
  const [selected, setSelected] = useState<Country | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected) {
      sessionStorage.setItem('selectedCountry', selected);
      setSession(prev => ({ ...prev, country: selected }));
      if (navigator.vibrate) navigator.vibrate(20);
      navigate('/hub');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050510]">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-3xl font-orbitron font-bold mb-4 uppercase tracking-tighter">
          SELECIONE SUA <span className="neon-cyan">REGIÃO</span>
        </h2>
        <p className="text-gray-400 mb-12">Segmentação necessária para precisão dos sinais.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div 
            onClick={() => setSelected(Country.Mozambique)}
            className={`cursor-pointer p-8 rounded-2xl bg-glass border-2 transition-all duration-300 ${
              selected === Country.Mozambique ? 'border-cyan-500 scale-105 shadow-[0_0_30px_rgba(0,243,255,0.2)]' : 'border-transparent hover:border-white/20'
            }`}
          >
            <div className="text-5xl mb-4">🇲🇿</div>
            <h3 className="text-xl font-orbitron font-bold">MOÇAMBIQUE</h3>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Região Sul/Norte</p>
          </div>

          <div 
            onClick={() => setSelected(Country.Angola)}
            className={`cursor-pointer p-8 rounded-2xl bg-glass border-2 transition-all duration-300 ${
              selected === Country.Angola ? 'border-pink-500 scale-105 shadow-[0_0_30px_rgba(255,0,153,0.2)]' : 'border-transparent hover:border-white/20'
            }`}
          >
            <div className="text-5xl mb-4">🇦🇴</div>
            <h3 className="text-xl font-orbitron font-bold">ANGOLA</h3>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Região Central</p>
          </div>
        </div>

        <button 
          onClick={handleContinue}
          disabled={!selected}
          className="px-12 py-4 bg-white text-black font-orbitron font-bold rounded-full disabled:opacity-20 hover:bg-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          Confirmar e Continuar
        </button>
      </div>
    </div>
  );
};

export default CountrySelect;
