
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSession, Country } from '../types';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

interface HubProps {
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

const Hub: React.FC<HubProps> = ({ session, setSession }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      setSession({ isAuthenticated: false, email: null, country: null });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const tools = [
    { 
        id: 'mines', 
        name: 'MINES BOT', 
        desc: 'Sinais precisos para grid de minas.', 
        icon: '💣', 
        path: '/mines',
        color: 'border-cyan-500/30'
    },
    { 
        id: 'gen', 
        name: 'GERADOR MANUAL', 
        desc: 'Próximos horários com proteção.', 
        icon: '📊', 
        path: '/generator',
        color: 'border-pink-500/30'
    },
    { 
        id: 'auto', 
        name: 'AUTO SIGNAL', 
        desc: 'Sinais contínuos em tempo real.', 
        icon: '🤖', 
        path: '/auto',
        color: 'border-white/20'
    },
    { 
        id: 'back', 
        name: 'BACKGROUND', 
        desc: 'Análise detalhada de multiplicadores.', 
        icon: '🔍', 
        path: '/possible',
        color: 'border-yellow-500/30'
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-12">
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-glass p-6 rounded-2xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold">H</div>
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold neon-cyan">{session.email?.split('@')[0].toUpperCase()}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Membro Premium</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
                <span className="text-xl">{session.country === Country.Mozambique ? '🇲🇿' : '🇦🇴'}</span>
                <span className="text-xs font-bold uppercase tracking-widest">{session.country}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 border border-red-500/30 text-red-500 text-xs font-bold uppercase rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => {
                if (navigator.vibrate) navigator.vibrate(10);
                navigate(tool.path);
            }}
            className={`group cursor-pointer p-8 rounded-3xl bg-glass border ${tool.color} hover:scale-105 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-6xl">{tool.icon}</span>
            </div>
            <span className="text-5xl mb-6 transform group-hover:rotate-12 transition-transform">{tool.icon}</span>
            <h3 className="text-xl font-orbitron font-bold mb-2 group-hover:neon-cyan transition-colors">{tool.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
            <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-glass rounded-3xl text-center border border-white/5">
          <p className="text-gray-400 text-sm italic font-bold">"O sucesso não é sorte, é estratégia aliada à tecnologia."</p>
      </div>
    </div>
  );
};

export default Hub;
