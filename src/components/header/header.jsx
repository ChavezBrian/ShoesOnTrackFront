import SearchBar from "@/components/searchBar/searchBar";
import Navbar from "@/components/navbar/Navbar";
import logo from "@/helpers/assets/Logo.png";
import Image from "next/image";
import styles from "./header.module.css";
import LoginAuth from "../loginauth/LoginAUTH";

// C:\Users\TEMP\OneDrive\Escritorio\PF SHOES\FrontEnd-PF\src\helpers\assets\pngwing.com.png

function Header({
  initialFilters,
  setInitialFilters,
  initialPageSet,
  setInitialPageSet,
}) {
  return (
    <div className={styles?.header}>
      <div className={styles.imagen}>
        <Image src={logo} width={40} height={20} alt="Search" />
      </div>
      <SearchBar
        initialFilters={initialFilters}
        setInitialFilters={setInitialFilters}
        initialPageSet={initialPageSet}
        setInitialPageSet={setInitialPageSet}
      />
      <LoginAuth />
    </div>
  );
}

export default Header;
