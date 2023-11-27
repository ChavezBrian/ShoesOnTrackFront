"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByID, clearDetail } from "@/redux/actions";

const Detail = () => {
  const dispatch = useDispatch();

  const Product = useSelector((state) => state.productDetail);
  const { id } = useParams()

  const loadIdProduct = () => {
    if (id === Product.id) return;
    else dispatch(getByID(id));
  }

  useEffect(() => {
    loadIdProduct()
  }, [])

  useEffect(() => {
    console.log(Product)
  }, [])
  return (
    <div>
      <div className={styles.centrardiv}>

        {Product && Product.id === id && (
          <div className={styles?.productdetail}>
            <div className={styles?.productinfo}>

              <h2 className={styles.productname}>{Product?.name}</h2>
              <h2 className={styles.spacing}>Brand: {Product?.brandName}</h2>
              <h2 className={styles.spacing}>{`Price: $${Product.price}`}</h2>
              <h2 className={styles.spacing}>Colors: {Product?.color}</h2>
              <h2 className={styles.spacing}>{Product?.material}</h2>
              <h2 className={styles.spacing01}>Description:</h2>
              <h2>{Product?.description}</h2>
            </div>
            <Image
              className={styles.image}
              src={Product?.image}
              width={600}
              height={600}
              alt={Product?.name || id}
            />
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Detail;