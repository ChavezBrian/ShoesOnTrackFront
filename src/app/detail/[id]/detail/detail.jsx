"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByID, clearDetail } from "@/redux/actions";


const Detail = () => {
  const handleClick = async () => {
    const response = await fetch("http://localhost:3001/payment/create-order", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);

    window.location.href = data.links[1].href;
  };
  const dispatch = useDispatch();

  const Product = useSelector((state) => state.productDetail);
  const { id } = useParams();

  const loadIdProduct = () => {
    if (id === Product.id) return;
    else dispatch(getByID(id));
  };

  useEffect(() => {
    loadIdProduct();
  }, []);

  useEffect(() => {
    console.log(Product);
  }, []);
  return (
    <div>
       {Product && Product.id === id && (
       <div className={styles.container}>
     
      <div className={styles.line1}></div>
      <div className={styles.containerDetail}>
        <div className={styles.containerImagen}>
          <Image
              className={styles.imagen}
              src={Product?.image}
              width={700}
               height={700}
             alt={Product?.name || id}
            />
        </div>
        <div className={styles.containerInfo}>
          <div className={styles.name}>{Product?.name}</div>
          <div className={styles.description}>{Product?.description}</div>
          <div className={styles.line}></div>
          <div className={styles.price}>${Product.price}</div>
          <div className={styles.color}><h5>Colores Disponibles:</h5>{Product?.color}</div>
          <div className={styles.color}><h5>Material:</h5>{Product?.details}</div>
          <div className={styles.line}></div>
        </div>
      <div className={styles.containerButton}>
        <button className={styles.Button} >Agregar al Carrito</button>
        <button className={styles.Button} >Añadir a Favoritos</button>
        <button className={styles.Button} onClick={handleClick}>Comprar</button> 
      </div>
     </div>  
     <div className={styles.line}></div>
     </div>
     )
     } 
    </div>
    // <div>
    //   <div className={styles.centrardiv}>
    //     {Product && Product.id === id && (
    //       <div className={styles?.productdetail}>
    //         <div className={styles?.productinfo}>
    //           <h2 className={styles.productname}>{Product?.name}</h2>
    //           <h2 className={styles.spacing}>Brand: {Product?.brandName}</h2>
    //           <h2 className={styles.spacing}>{`Price: $${Product.price}`}</h2>
    //           <h2 className={styles.spacing}>Colors: {Product?.color}</h2>
    //           <h2 className={styles.spacing}>{Product?.material}</h2>
    //           <h2 className={styles.spacing01}>Description:</h2>
    //           <h2>{Product?.description}</h2>
    //           <button className={styles.buttonCompra} onClick={handleClick}>
    //             Comprar
    //           </button>
    //         </div>
    //         <Image
    //           className={styles.image}
    //           src={Product?.image}
    //           width={600}
    //           height={600}
    //           alt={Product?.name || id}
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Detail;