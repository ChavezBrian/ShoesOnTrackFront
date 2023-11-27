import React from 'react';
import { useAuth0 } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

const RegisterButton = () => {
  const { loginWithRedirect } = useAuth0();
  const router = useRouter();

  const handleRegister = () => {
    // Utiliza loginWithRedirect con el parámetro 'screen_hint' configurado como 'signup' para ir a la pantalla de registro.
    loginWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <button
      className="rounded mr-3 hidden bg-green-500 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none md:mr-0 md:inline-block rounded-lg"
      onClick={handleRegister}
    >
      Register
    </button>
  );
};

export default RegisterButton;