"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByID, clearDetail } from "@/redux/actions";

const Detail = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("https://deploy-back-wine.vercel.app/payment/create-order", {
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data.links && data.links[1] && data.links[1].href) {
        window.location.href = data.links[1].href;
      } else {
        console.error("Invalid response format. Missing 'links' or 'href' in the response.");
      }
    } catch (error) {
      console.error("Error fetching create-order:", error.message);
    }
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
              <div className={styles.color}>
                <h5>Colores Disponibles:</h5>
                {Product?.color}
              </div>
              <div className={styles.color}>
                <h5>Material:</h5>
                {Product?.details}
              </div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.containerButton}>
              <button className={styles.Button}>Agregar al Carrito</button>
              <button className={styles.Button}>Añadir a Favoritos</button>
              <button className={styles.Button} onClick={handleClick}>
                Comprar
              </button>
            </div>
          </div>
          <div className={styles.line}></div>
        </div>
      )}
    </div>
  );
};

export default Detail;
