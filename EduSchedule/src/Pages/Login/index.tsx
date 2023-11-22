import React from 'react';
import LoginForm from '../../Components/Logar/index';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Implemente qualquer lógica adicional após o login, se necessário
    console.log('Usuário logado com sucesso!');
  };

  return (
    <div>
      <h1>Página de Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
