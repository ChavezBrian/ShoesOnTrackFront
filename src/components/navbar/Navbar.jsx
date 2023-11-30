import Link from "next/link";
import style from "./style.module.css";
import LoginAuth from "../loginauth/LoginAUTH";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <Link href={"/" } className={style.button} >
        Home
      </Link>
      <Link href={"/contact" } className={style.button} >
        Contact
      </Link>
      <Link href={"/about" } className={style.button} >
        About
      </Link>
      <LoginAuth/>
    </nav>
  );
};

export default NavBar;
