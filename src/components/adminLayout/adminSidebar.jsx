"use client";

import style from "../adminLayout/admin.module.css";
import React from "react";
import Link from "next/link";

const adminSidebar = () => {
  return (
    <nav className={style.contenedor}>
        <div className={style.item}>
      <Link className={style.punto} href="/admin">
        <span>Dashboard</span>
      </Link>

      <Link className={style.punto} href="/admin/create-shoe">
        <span>Shoes</span>
      </Link>
      </div>
    </nav>
  );
};

export default adminSidebar;
