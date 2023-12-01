import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Services/firebaseConnection';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState(''); // Pode ser um email ou nickname
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // Verificar se o identificador parece ser um email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      let userCredential;

      if (isEmail) {
        // Se for um email, fazer login diretamente
        userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      } else {
        // Se for um nickname, buscar o usuário no Firestore
        // (Você precisa implementar a lógica para buscar o usuário pelo nickname no Firestore)
        // Aqui está um exemplo básico usando o campo 'nickname':
        const q = query(collection(db, 'users'), where('nickname', '==', identifier));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const user = querySnapshot.docs[0].data();

          // Fazer login com email do usuário encontrado e senha fornecida
          userCredential = await signInWithEmailAndPassword(auth, user.email, password);
        } else {
          throw new Error('Usuário não encontrado.');
        }
      }

      onLogin();
      navigate('/teste');
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
          <label>Email ou Usuário:</label>
          <input type="text" value={identifier} onChange={handleIdentifierChange} />
        </div>
        <div>
          <label>Digite sua Senha:</label>
          <input id="input-login-senha" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
        <a className="link-cadastro" href="/cadastro">Não possui cadastro? Clique aqui e cadastre-se</a>
      </form>
    </div>
  );
};

export default LoginForm;
