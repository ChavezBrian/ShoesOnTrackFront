import SearchBar from "@/components/searchBar/searchBar";
import Navbar from "@/components/navbar/Navbar";
import logo from "@/helpers/assets/pngwin.png";
import Image from "next/image";
import styles from "./header.module.css";

// C:\Users\TEMP\OneDrive\Escritorio\PF SHOES\FrontEnd-PF\src\helpers\assets\pngwing.com.png

function Header({initialFilters, setInitialFilters, initialPageSet, setInitialPageSet}) {
  return (
    <div className={styles?.header}>
      <div className={styles.imagen}>
        <Image src={logo} width={200} height={120} alt="Search" />
      </div>
      <SearchBar initialFilters={initialFilters} setInitialFilters={setInitialFilters} initialPageSet={initialPageSet} setInitialPageSet={setInitialPageSet}/>
      <Navbar />
    </div>
  );
}

export default Header;
