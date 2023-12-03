"use client";

import Shoe from "./shoe";
import style from "../dashboard/shoe.module.css"


const ShoeList = ({ shoes }) => {
    return (
      <div className={style.allshoes} >
        <div>
        <h2>Shoes</h2>
        </div>
        {/* {shoes.map((shoe) => (
          <Shoe key={shoe.id} shoe={shoe} />
        ))} */}
      </div>
    );
  };
  
  export default ShoeList;
  