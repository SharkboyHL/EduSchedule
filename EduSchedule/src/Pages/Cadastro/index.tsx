import React from 'react';
import RegistrationForm from '../../Components/Registrar/index';

const RegistrationPage: React.FC = () => {
  const handleRegister = (email: string, password: string) => {
    // Adicione a lógica para registrar o usuário no Firebase aqui
    console.log(`Registrando usuário com email: ${email} e senha: ${password}`);
  };

  return (
    <div>
      <h1>Página de Cadastro</h1>
      <RegistrationForm onRegister={handleRegister} />
    </div>
  );
};

export default RegistrationPage;
