"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./style.module.css";

import SearchBar from "@/components/searchBar/searchBar";
import logo from "@/helpers/assets/Logo.png";
import Image from "next/image";
import LoginAuth from "../loginauth/LoginAUTH";
import { useEffect } from "react";

const NavBar = ({
  initialFilters,
  setInitialFilters,
  initialPageSet,
  setInitialPageSet,
  user,
}) => {
  const pathname = usePathname();

  useEffect(()=>{
    console.log(user)
  },[])

  return (
    <nav className={style.nav}>
      <div className={style.imagen}>
        <Link href={"/"}>
          <Image src={logo} width={160} height={120} alt="Search" />
        </Link>
      </div>
      <SearchBar
        initialFilters={initialFilters}
        setInitialFilters={setInitialFilters}
        initialPageSet={initialPageSet}
        setInitialPageSet={setInitialPageSet}
      />

      {pathname !== "/" && (
        <Link href={"/"} className={style.link}>
          <button className={style.button}>
            <span>Home</span>
          </button>
        </Link>
      )}
      {pathname !== "/contact" && (
        <Link href={"/contact"} className={style.link}>
          <button className={style.button}>
            <span>Contact</span>
          </button>
        </Link>
      )}
      {pathname !== "/about" && (
        <Link href={"/about"} className={style.link}>
          <button className={style.button}>
            <span>About</span>
          </button>
        </Link>
      )}

<Link href={"/admin"} className={style.link}>
      {user?.isAdmin && <button className={style.button}>
            <span>Admin</span>
          </button>}
        </Link> 

      <LoginAuth />
    </nav>
  );
};

export default NavBar;
