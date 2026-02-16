
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_PLANS } from '../types';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-20">
        <div className="mb-8 animate-pulse">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=H4ck3r&backgroundColor=050510" alt="Logo" className="w-32 h-32 rounded-full border-4 border-cyan-500 p-1 shadow-[0_0_20px_rgba(0,243,255,0.5)] bg-black" />
        </div>
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-4">
          H4CK3R <span className="neon-cyan">F-A</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-light">
          A inteligência artificial definitiva para predição de <span className="text-pink-500 font-bold">Aviator</span> e <span className="text-pink-500 font-bold">Mines</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-20">
          <button 
            onClick={() => navigate('/login')}
            className="flex-1 py-4 bg-cyan-500 text-black font-orbitron font-bold rounded hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)] uppercase tracking-wider"
          >
            Acessar Sistema
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('pricing');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 py-4 border border-cyan-500/50 text-cyan-400 font-orbitron font-bold rounded hover:bg-cyan-500/10 transition-all uppercase tracking-wider"
          >
            Ver Planos
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="p-8 max-w-6xl mx-auto w-full mb-20">
        <h2 className="text-4xl font-orbitron text-center mb-4 neon-cyan">PLANOS DE ACESSO</h2>
        <p className="text-gray-500 text-center mb-12 uppercase tracking-widest text-xs font-bold">Libere o poder da predição avançada</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PAYMENT_PLANS.map((plan) => (
            <div key={plan.id} className="bg-glass border border-white/5 rounded-3xl p-6 flex flex-col hover:border-cyan-500/30 transition-all group">
              <h3 className="font-orbitron text-lg font-bold mb-1 text-white group-hover:text-cyan-400 transition-colors">{plan.name}</h3>
              <p className="text-[10px] text-gray-500 uppercase mb-4 font-bold tracking-widest">{plan.duration}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold font-orbitron text-white">{plan.price}</span>
                <span className="text-xs text-gray-500 ml-2 uppercase font-bold">{plan.currency}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-cyan-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => navigate(`/payment?plan=${plan.id}`)}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-orbitron font-bold hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all uppercase tracking-widest"
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="p-8 text-center text-gray-600 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold">
        H4CK3R F-A v2.0 &copy; 2024 - Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Landing;
