import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Services/firebaseConnection';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormProps {
   onRegister: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [nickname, setNickname] = useState('');
   const navigate = useNavigate();

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
   };

   const toggleShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const handleRegister = async () => {
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);

         await updateProfile(userCredential.user, { displayName: 'Novo usuário' });
         navigate('/');

         const userDocRef = doc(db, 'users', userCredential.user.uid);
         await setDoc(userDocRef, {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            nickname: nickname,
         });

         onRegister();
      } catch (error) {
         console.error('Erro no registro:', error.message);
      }
   };

   return (
      <div className="mae-cadastro">
         <form>
            <div className="titulo-cadastro">
               <h2>CADASTRO</h2>
               <img src="../../src/assets/logo-eduS.png" alt="logo" style={{ width: '90px', height: '90px' }} />
            </div>
            <div>
               <label>Email:</label>
               <input id="cadastro-input-email" type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
               <label>Senha:</label>
               <input
                  id="cadastro-input-senha"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
               />
               {showPassword ? (
                  <FiEyeOff onClick={toggleShowPassword} />
               ) : (
                  <FiEye onClick={toggleShowPassword} />
               )}
            </div>
            <div>
               <label>Usuário:</label>
               <input type="text" value={nickname} onChange={handleNicknameChange} />
            </div>
            <button type="button" onClick={handleRegister}>
               Registrar
            </button>

            <a className="link-cadastro" href="/">Já possui uma conta ? Então clique aqui !</a>
         </form>
      </div>
   );
};

export default RegistrationForm;
