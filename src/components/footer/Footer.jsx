import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoYoutube,
} from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";
import google from "@/helpers/assets/google_play.png";
import appStore from "@/helpers/assets/app_store.png";
import style from "./style.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className={style.footer}>
        <div className={style.social_media}>
          Logo
          <img src="" alt="" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil,
            necessitatibus?
          </p>
          <div>
            <ul className={style.ul}>
              <li className={style.li}>
                <Link href={"#"} to={""} className={style.social_link}>
                  <BiLogoFacebook className={style.icon} />
                </Link>
              </li>
              <li className={style.li}>
                <Link href={"#"} to={""} className={style.social_link}>
                  <BiLogoInstagram className={style.icon} />
                </Link>
              </li>
              <li className={style.li}>
                <Link href={"#"} to={""} className={style.social_link}>
                  <RiTwitterXFill className={style.icon} />
                </Link>
              </li>
              <li className={style.li}>
                <Link href={"#"} to={""} className={style.social_link}>
                  <BiLogoTiktok className={style.icon} />
                </Link>
              </li>
              <li className={style.li}>
                <Link href={"#"} to={""} className={style.social_link}>
                  <BiLogoYoutube className={style.icon} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={style.about}>
          <p className={style.tittle}>Sobre nosotros</p>
          <ul className={style.ul}>
            <li>
              <Link href={"#"} to={""} className={style.link}>
                Sobre Nosotros
              </Link>{" "}
            </li>
            <li>
              <Link href={"#"} to={""} className={style.link}>
                Nuestra Tienda
              </Link>{" "}
            </li>
            <li>
              <Link href={"#"} to={""} className={style.link}>
                Categorias
              </Link>{" "}
            </li>
            <li>
              <Link href={"#"} to={""} className={style.link}>
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.information}>
          <p className={style.tittle}>Informaci&#243;n</p>
          <ul className={style.ul}>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Centro de ayuda
              </Link>
            </li>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Devoluciones
              </Link>
            </li>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Envios
              </Link>
            </li>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Contactanos
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.information}>
          <p className={style.tittle}>Usuario</p>
          <ul className={style.ul}>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Iniciar Sesi&#243;n
              </Link>
            </li>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Registro
              </Link>
            </li>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Configuraci&#243;n
              </Link>
            </li>
            <li className={style.li}>
              <Link href={"#"} to={""} className={style.link}>
                Mis compras
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={style.tittle}>Obten nuestra App</p>
          <ul className={style.ul}>
            
            <Image src={google} width={125} height={45} alt="google"/>

            <br />
            <Image src={appStore} width={125} height={45} alt="app"/>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
