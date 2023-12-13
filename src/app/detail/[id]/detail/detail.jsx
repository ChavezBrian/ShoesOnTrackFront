"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getByID,
  removeFavoriteBack,
  AddFavoriteBack,
  removeCartBack,
  AddCartBack,
} from "@/redux/actions";
import { Modal, Button } from "antd";
import { useRouter } from "next/navigation";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import NavBar from "@/components/navbar/Navbar";

const Detail = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleClick = async () => {
    if (!user?.email) {
      setModalVisible(true);
      setModalMessage("Para realizar esta acción, inicia sesión.");
      return;
    }
    const response = await fetch("https://deploy-back-wine.vercel.app/payment/create-order", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);

    window.location.href = data.links[1].href;
  };
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const Product = useSelector((state) => state.productDetail);
  const user = useSelector((state) => state.user);
  const favs = useSelector((state) => state.favorites);
  const carrito = useSelector((state) => state.carrito);

  const { id } = useParams();

  useEffect(() => {
    if (favs?.length) {
      favs?.forEach((fav) => {
        if (fav.id === id) {
          setIsFav(true);
        }
      });
    }
  }, [id, favs]);

  useEffect(() => {
    if (carrito?.length) {
      carrito?.forEach((cart) => {
        if (cart.id === id) {
          setIsCart(true);
        }
      });
    }
  }, [id, carrito]);

  const loadIdProduct = () => {
    if (id === Product.id) return;
    else dispatch(getByID(id));
  };

  useEffect(() => {
    loadIdProduct();
  }, []);

  const handleFavorite = () => {
    if (!user?.email) {
      setModalVisible(true);
      setModalMessage("To add to favorites, log in or register.");
      return;
    }
    if (isFav) {
      setIsFav(false);
      dispatch(removeFavoriteBack({ UserId: user.id, ProductId: id }));
    } else {
      setIsFav(true);
      dispatch(AddFavoriteBack({ UserId: user.id, ProductId: id }));
    }
  };

  const handleCarrito = () => {
    if (!user?.email) {
      setModalVisible(true);
      setModalMessage("To add to cart, log in or register.");
      return;
    }
    if (isCart) {
      setIsCart(false);
      dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
    } else {
      setIsCart(true);
      dispatch(AddCartBack({ UserId: user.id, ProductId: id }));
    }
  };
  return (
    <div>
      <NavBar user={user} />
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
              <div className={styles.name}>Stock: {Product.stock}</div>
            </div>
            <div className={styles.containerButton}>
              <div>
                <button className={styles.Button} onClick={handleCarrito}>
                  {isCart ? "Remove from Cart ❌" : "Add to Cart 🛒"}
                </button>
              </div>
              <div>
                <button className={styles.Button} onClick={handleFavorite}>
                  {isFav ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
                </button>
              </div>
            </div>
          </div>
          {!user?.email && (
            <div>
              <Modal
                title="¡Hello!"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                  <Button
                    key="login"
                    type="primary"
                    onClick={() => router.push("/api/auth/login")}
                  >
                    Log in
                  </Button>,
                ]}
                style={{ fontSize: "16px", width: "90%" }}
              >
                <p style={{ fontSize: "23px" }}>{modalMessage}</p>
              </Modal>
            </div>
          )}
          <div className={styles.line}></div>
        </div>
      )}
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
