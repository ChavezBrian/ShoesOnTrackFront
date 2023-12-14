"use client";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AddCartBack, getAllCarts, removeCartBack } from "@/redux/actions";

import NavBar from "@/components/navbar/Navbar";
import Link from "next/link";

import styles from "../carrito/carrito.module.css";
import { typographyClasses } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Carrito = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carrito);
  const [restored, setRestored] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [client, setClient] = useState(false);
  const user = useSelector((state) => state.user);

  const loadCarts = () => {
    if (user?.id && (refresh || !client)) {
      dispatch(getAllCarts(user.id));
      setRefresh(false);
      setClient(true);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("focus", () => {
      loadCarts();
    });
  }

  useEffect(() => {
    loadCarts();
    calcularTotal();
  }, [carts, refresh, restored]);

  const restoreCart = async () => {
    if (restored.length > 0) {
      console.log(restored);
      await Promise.all(
        restored.map(async (cart) => {
          console.log("soy producto", cart);
          await dispatch(AddCartBack({ UserId: user.id, ProductId: cart }));
        })
      );
      toast.success("Restored");
      setRestored([]);
      setRefresh(true);
    } else
      toast("Nothing to restore", {
        duration: 750,
      });
  };

  const handleCarrito = async (id) => {
    const deleted = carts.filter((fav) => fav.id === id);
    Swal.fire({
      title: "Do you want to delete this product from cart?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setRestored([...restored, deleted]);
        console.log("soy restore", restored);
        await dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
        setRefresh(true);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  const calcularTotal = () => {
    let total = 0;
    carts.forEach((car) => {
      total += car.price;
    });
    setTotalPrice(total);
  };

  const handleClick = async () => {
    if (!user?.email) {
      setModalVisible(true);
      return;
    }

    const response = await fetch("https://deploy-back-wine.vercel.app/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: totalPrice,
        userEmail: user.email, // Pasa el correo electrónico al backend
      }),
    });

    const data = await response.json();
    console.log(data);

    window.location.href = data.links[1].href;
  };

  useEffect(() => {
    console.log(carts);
    console.log(totalPrice);
  }, [carts, calcularTotal, refresh]);

  return (
    <div>
      <Toaster />
      <NavBar user={user} />

      {carts?.length > 0 ? (
        <>
          <h1 className={styles.title}>Shopping Cart</h1>

          <div className={styles.bigCont}>
            <div className={styles.otherCont}>
              <div>
                {carts.map((car) => (
                  <div key={car.id}>
                    <div className={styles.container}>
                      <div>
                        <Link href={`/detail/${car.id}`}>
                          <img
                            className={styles.imagen}
                            src={car.image}
                            alt={car.name}
                          />
                        </Link>
                      </div>
                      <div>{car.brandName}</div>
                      <div className={styles.name}>{car.name}</div>
                      <div>${car.price}</div>
                      <div>
                        <button
                          class={styles.button}
                          onClick={() => handleCarrito(car.id)}
                        >
                          <svg viewBox="0 0 448 512" class={styles.svgIcon}>
                            <path
                              className={styles.path}
                              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.scndCont}>
              <div className={styles.pay}>
                <h3 className={styles.price}>{`TOTAL: ${totalPrice}`}</h3>
                <br />
                <button onClick={handleClick} className={styles.Btn}>
                  Pay
                  <svg viewBox="0 0 576 512" className={styles.svgIcon2}>
                    <path
                      className={styles.path}
                      d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"
                    ></path>
                  </svg>
                </button>
              </div>
              <button onClick={restoreCart} className={styles.rstrBtn}>
                Restore
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className={styles.title}>Shopping Cart</h1>
          <h2 className={styles.filler}>No products in the cart</h2>
          <div className={styles.btnCont}>
            <Link href={"/"} passHref>
              <button className={styles.homeBtn}>{"Let's go Shopping"}</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
