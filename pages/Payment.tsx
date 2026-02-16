
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAYMENT_PLANS } from '../types';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get('plan');
  
  const plan = PAYMENT_PLANS.find(p => p.id === planId) || PAYMENT_PLANS[0];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePaymentRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Por favor preencha os dados de acesso desejados.");

    const phoneNumber = "258879254044";
    const message = `SOLICITAÇÃO DE ACESSO VIP - H4CK3R F-A\n\n` +
                    `📦 Pacote: ${plan.name}\n` +
                    `💰 Valor: ${plan.price} ${plan.currency}\n` +
                    `⏳ Duração: ${plan.duration}\n\n` +
                    `👤 E-mail solicitado: ${email}\n` +
                    `🔑 Senha solicitada: ${password}\n\n` +
                    `Favor enviar as instruções de pagamento para ativação imediata.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen p-6 bg-[#050510] flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-glass p-8 rounded-3xl border border-cyan-500/20 shadow-2xl relative">
        <button onClick={() => navigate('/')} className="mb-6 text-gray-500 hover:text-white flex items-center gap-2 uppercase text-[10px] font-bold tracking-widest">
          ← Voltar ao Início
        </button>
        
        <h2 className="text-2xl font-orbitron font-bold text-center mb-2 neon-cyan">CONFIRMAÇÃO VIP</h2>
        <div className="bg-white/5 p-4 rounded-2xl mb-8 border border-white/10">
            <p className="text-center text-cyan-400 text-lg font-orbitron font-bold">
              {plan.name}
            </p>
            <p className="text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
              {plan.price} {plan.currency} - {plan.duration}
            </p>
        </div>

        <form onSubmit={handlePaymentRequest} className="space-y-6">
          <div>
            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-widest">E-mail para Login</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-widest">Senha para Login</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-cyan-600 to-cyan-400 text-black font-orbitron font-bold rounded-2xl shadow-[0_10px_30px_rgba(0,243,255,0.2)] hover:scale-[1.02] transition-all uppercase tracking-widest"
          >
            CONFIRMAR VIA WHATSAPP
          </button>
        </form>

        <p className="mt-8 text-[10px] text-gray-500 text-center uppercase tracking-[0.2em] leading-relaxed font-bold">
          Ativação manual processada em até 5 minutos após envio.
        </p>
      </div>
    </div>
  );
};

export default Payment;
