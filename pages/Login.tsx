
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { UserSession } from '../types';

interface LoginProps {
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

const Login: React.FC<LoginProps> = ({ setSession }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userEmail', user.email || '');
      
      setSession(prev => ({
        ...prev,
        isAuthenticated: true,
        email: user.email,
      }));

      if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
      navigate('/paises');
    } catch (err: any) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[url('https://picsum.photos/seed/cyber/1920/1080')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#050510]/80 backdrop-blur-sm"></div>
      
      <div className="w-full max-w-md bg-glass-heavy p-8 rounded-2xl relative z-10 border border-cyan-500/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-orbitron font-bold mb-2">AUTENTICAÇÃO</h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Acesso Restrito</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 p-3 rounded mb-6 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">E-mail</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="exemplo@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Senha</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-cyan-500 text-black font-orbitron font-bold rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : 'ENTRAR NO SISTEMA'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 uppercase tracking-widest">
          H4CK3R F-A v2.0 &copy; 2024
        </div>
      </div>
    </div>
  );
};

export default Login;
