import React from 'react';
import style from "./style.module.css"


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
    <button className={style.button} onClick={handleLogin}>Login</button>
  );
};

export default Login;
