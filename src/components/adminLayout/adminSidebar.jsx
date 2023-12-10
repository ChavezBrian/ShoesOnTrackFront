"use client";

import style from "../adminLayout/admin.module.css";
import React from "react";
import Link from "next/link";

const adminSidebar = () => {
  return (
    <nav className={style.contenedor}>
      <Link href={`/`}>
        <div className={style["button-container"]}>
          <button className={style["button-link"]}>HOME</button>
        </div>
      </Link>
      <div className={style.item}>
        {/* Contenedor para centrar los botones enlaces */}
        <div className={style["button-container"]}>
          <Link className={style["button-link"]} href="/admin">
            <span>DASHBOARD</span>
          </Link>

          <Link className={style["button-link"]} href="/admin/create-shoe">
            <span>POST NEW SHOE</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default adminSidebar;
