"use client";

import Shoe from "./shoe";
import style from "../dashboard/shoe.module.css"
import React, { useState, useEffect } from "react";



const ShoeList = ({ shoes }) => {


    return (
      <div className={style.todo} >
        {shoes.map((shoe) => (
          <Shoe
            key={shoe.id}
            id={shoe.id}
            name={shoe.name}
            brandName={shoe.brandName}
            price={`$${shoe.price}`}
            image={shoe.image}
            stock={shoe.stock}
            color={shoe.color}
            status={shoe.status} />
        ))}
      </div>
    );
  };
  
  export default ShoeList;
  