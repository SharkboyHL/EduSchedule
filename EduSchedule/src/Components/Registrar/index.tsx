import React, { useState } from 'react';
import { createUserWithEmailAndPassword, Auth, updateProfile } from 'firebase/auth';
import { doc, setDoc, Firestore } from 'firebase/firestore';
import { auth, db } from '../../Services/firebaseConnection'
import { useNavigate } from 'react-router-dom';

interface RegistrationFormProps {
    onRegister: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRegister = async () => {
        try {
            //Criar usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            //Atualizar o perfil do usuário com um nome (opcional)
            await updateProfile(userCredential.user, { displayName: 'Novo usuário' });
            navigate('/');

            //Adicionar informações adicionais ao Firestore
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
            })

            onRegister();
        } catch (error) {
            console.error('Erro no registro:', error.message);
        }
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
