import React from 'react';


//const Login = () => {
//  return <a href="/api/auth/login">Login</a>;
//};

//export default Login;

import { useRouter } from 'next/navigation';

const Login = () => {
 
  const router = useRouter();

  const handleLogin = () => {
    
    router.push('/api/auth/login');
  };

  return (
    <button className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none   md:mr-0 md:inline-block rounded-lg" onClick={handleLogin}>Login</button>
  );
};

export default Login;
