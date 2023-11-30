"use client";
import style from "../login/login.module.css";
import google from "../../helpers/assets/Google.png";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/newsletter/Newsletter";
import NavBar from "@/components/navbar/Navbar";
import Image from "next/image";

const LoginPage = () => {
  return (
    <Provider store={store}>
      <NavBar/>
      <Header />
      <div className={style.pageContainer}>
        <div className={style.container}>
          <h3 className={style.iniciar}> Iniciar sesión </h3>

          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="correo@gmail.com" />
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" placeholder="*******" />
          <button className={style.olvidaste}>
            ¿Olvidaste tu constraseña?
          </button>
          <button className={style.ingresar}>Ingresar</button>
          <button className={style.terceros}>
            <Image
              src={google}
              width={25}
              height={25}
              className={style.google}
              alt="google"
            />
            <a href="/api/auth/login" className={style.span}>
              Ingresa con tu cuenta de Google
            </a>
          </button>
          <button className={style.olvidaste}>¿No tienes cuenta?</button>
          <button className={style.crear}>Crear Usuario</button>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </Provider>
  );
};

export default LoginPage;
