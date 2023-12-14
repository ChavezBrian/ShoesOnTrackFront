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

import NavBar from "@/components/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

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
  const [size, setSize] = useState(0);
  const [canAddToCart, setCanAddToCart] = useState(false);
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
    if (size === 0) {
      setCanAddToCart(false);
    } else {
      setCanAddToCart(true);
    }
    console.log(size);
    console.log(canAddToCart);
  }, [size]);

  useEffect(() => {
    loadIdProduct();
  }, []);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleFavorite = () => {
    if (!user?.email) {
      setModalVisible(true);
      setModalMessage("To add to favorites, log in or register.");
      return;
    }
    if (isFav) {
      setIsFav(false);
      dispatch(removeFavoriteBack({ UserId: user.id, ProductId: id }));
      toast.error("Removed");
    } else {
      setIsFav(true);
      dispatch(AddFavoriteBack({ UserId: user.id, ProductId: id }));
      toast.success("Added!");
    }
  };

  const handleCarrito = async () => {
    const canAdd = await canAddToCart;
    console.log(canAdd);
    if (!user?.email) {
      setModalVisible(true);
      setModalMessage("To add to cart, log in or register.");
      return;
    }
    if (isCart) {
      setIsCart(false);
      dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
      toast.error("Removed");
    } else if (canAdd) {
      setIsCart(true);
      dispatch(
        AddCartBack({ UserId: user.id, ProductId: id, ProductSize: size })
      );
      toast.success("Added!");
    } else toast.error("Pick a size first");
  };

  return (
    <div>
      <Toaster />
      <NavBar user={user} />
      {Product && Product.id === id && (
        <div className={styles.bigContainer}>
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
                <h4 className={styles.subTitles}>Colores Disponibles:</h4>
                {Product?.color}
              </div>
              <div className={styles.color}>
                <h4 className={styles.subTitles}>Details:</h4>
                <ul>
                  {Product?.details.map((detail, index) => {
                    return (
                      <li key={index} className={styles.detail}>
                        {detail}
                      </li>
                    );
                  })}
                </ul>
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
              <br />
              <div className={styles.selectCont}>
                <span className={styles.subTitles}>Sizes:</span>
                <select
                  id="Sizes"
                  onChange={handleSizeChange}
                  className={styles.select}
                >
                  <option value={0}>{""}</option>
                  {Product.sizes.map((size, index) => {
                    return (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
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
        </div>
      )}
    </div>
  );
};

export default Detail;
