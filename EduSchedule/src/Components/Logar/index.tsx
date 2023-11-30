// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Services/firebaseConnection'; // Importe sua instância do Firebase
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      navigate('/teste')
    } catch (error) {
      console.error('Erro no login:', error.message);
    }
  };

  return (
    <div className="mae-login">
      <div className="titulo-login">
        <h2>Login</h2>
        <img src="../../src/assets/logo-eduS.png" alt="logo" style={{ width: '90px', height: '90px' }} />
      </div>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
        <a className="link-cadastro" href="/cadastro">Não possui cadastro ? Clique aqui e cadastra-se</a>
      </form>
    </div>
  );
};

export default LoginForm;
