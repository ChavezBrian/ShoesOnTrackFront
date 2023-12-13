"use client"
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts, removeCartBack } from "@/redux/actions";
import styles from "./purchase.module.css";
import logo from "@/helpers/assets/Logo.png";
import Image from "next/image";

const Purchase = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const carrito = useSelector((state) => state.carrito);

  const loadFavsCarts = () => {
    if (user?.id) {
      dispatch(getAllCarts(user.id));
    }
  }

  const vaciarCarrito = async () => {
    carrito?.map((cart) => {
      console.log(cart.id)
      handleCarrito(cart.id)
    })
  }

  const handleCarrito = async (id) => {
    console.log("llegue aca")
    await dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
  };

  useEffect(() => {
    loadFavsCarts();
  }, []);

  useEffect(() => {
    console.log(user, carrito)
    vaciarCarrito()
  }, [carrito])

  return (
    <div className={styles["purchase-container"]}>
      <Image src={logo} alt="Logo" className={styles["logo"]} />
      <p className={styles["purchase-success"]}>THANK YOU FOR YOUR PURCHASE!</p>
      <p className={styles["purchase-message"]}>
        Your order has been successfully completed.
      </p>
      <p className={styles["confirmation-message"]}>
        We will send you an email with the confirmation of your purchase. 
        Please check your inbox.
      </p>
      <Link href="/" className={styles["home-link"]}>
        Go to the homepage
      </Link>
    </div>
  );
};

export default Purchase;