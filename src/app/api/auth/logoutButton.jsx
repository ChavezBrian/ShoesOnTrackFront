import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/actions";

import style from "./style.module.css";

const Logout = ({ asLink, textoBoton }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    router.push("/api/auth/logout");
    dispatch(clearUser());
  };

  if (asLink) {
    return (
      <a href="#" onClick={handleLogout} className={style.logoutLink}>
        {textoBoton}
      </a>
    );
  }

  return (
    <span onClick={handleLogout} className={style.logoutText}>
      {textoBoton}
    </span>
  );
};

export default Logout;
