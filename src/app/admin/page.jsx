"use client";

import React from "react";
import { getUserProducts } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoeList from "../../components/dashboard/ShoeList";

const ShoesPage = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.userProducts);
    
     return (
       <div>
        <h1>CARDS DEL USER MODIFICABLES</h1>
        <ShoeList/>
      </div>
    );
  };
  
  export default ShoesPage;
  