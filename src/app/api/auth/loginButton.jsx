import React from "react";
import style from "./style.module.css";

//const Login = () => {
//  return <a href="/api/auth/login">Login</a>;
//};

//export default Login;

import { useRouter } from "next/navigation";
import { Style } from "@mui/icons-material";

const Login = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/api/auth/login");
  };

  return (
    <button onClick={handleLogin} className={style.logOutButton}>
      Login
    </button>
  );
};

export default Login;
