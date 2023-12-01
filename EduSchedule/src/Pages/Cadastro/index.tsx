import React from 'react';
import RegistrationForm from '../../Components/Registrar/index';

const RegistrationPage: React.FC = () => {
  const handleRegister = () => {
    // Adicione a lógica para registrar o usuário no Firebase aqui
    console.log('Usuário registrado com sucesso');
  };

  return (
    <div>
      <RegistrationForm onRegister={handleRegister} />
    </div>
  );
};

export default RegistrationPage;
