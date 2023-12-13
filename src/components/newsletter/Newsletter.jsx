import React from "react";
import style from "./style.module.css";
import Link from "next/link";

const Newsletter = () => {
  return (
    <>
      <div className={style.container}>
        <Link href="/reviews">
          <button className={style.orangeButton}>
            Dejanos tu opinión sobre la pagina
          </button>
        </Link>
      </div>
    </>
  );
};

export default Newsletter;
