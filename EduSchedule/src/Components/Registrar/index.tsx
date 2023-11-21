import React, { useState } from 'react';

interface RegistrationFormProps {
    onRegister: (email: string, password: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRegister = () => {
        // Adicione validação ou chamada para o Firebase aqui
        onRegister(email, password);
    };

    return (
        <div>
            <h2>Registro</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="button" onClick={handleRegister}>
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
