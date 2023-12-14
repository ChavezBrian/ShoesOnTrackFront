"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFavoriteBack,
  getAllFavs,
  removeFavoriteBack,
} from "@/redux/actions";
import NavBar from "@/components/navbar/Navbar";
import Cards from "@/components/cardsContainer/cards";
import Link from "next/link";
import styles from "../favorites/favorites.module.css";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const Favorites = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [client, setClient] = useState(false);
  const [restored, setRestored] = useState([]);
  const favs = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);

  const loadFavs = () => {
    if (user?.id && (refresh || !client)) {
      dispatch(getAllFavs(user.id));
      setRefresh(false);
      setClient(true);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("focus", () => {
      loadFavs();
    });
  }

  useEffect(() => {
    loadFavs();
  }, [favs, refresh, restored]);

  const restoreFavorite = async () => {
    if (restored.length > 0) {
      console.log(restored);
      await Promise.all(
        restored.map(async (product) => {
          console.log("soy producto", product);
          await dispatch(
            AddFavoriteBack({ UserId: user.id, ProductId: product })
          );
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

  const handleFavorite = async (id) => {
    const deleted = favs.filter((fav) => fav.id === id);
    Swal.fire({
      title: "Do you want to delete this product from favorites?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setRestored([...restored, deleted]);
        console.log("soy restore", restored);
        await dispatch(removeFavoriteBack({ UserId: user.id, ProductId: id }));
        setRefresh(true);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  return (
    <div>
      <NavBar user={user} />
      {favs?.length > 0 ? (
        <>
          <Toaster />
          <div className={styles.titleCont}>
            <h1 className={styles.title}>Favorites</h1>
            <button onClick={restoreFavorite} className={styles.rstrBtn}>
              Restore
            </button>
          </div>
          <div className={styles.bigCont}>
            {favs.map((fav) => (
              <div key={fav.id}>
                <div className={styles.container}>
                  <div>
                    <Link href={`/detail/${fav.id}`}>
                      <img
                        className={styles.imagen}
                        src={fav.image}
                        alt={fav.name}
                      ></img>
                    </Link>
                  </div>
                  <div>
                    <span>{fav.brandName}</span>{" "}
                  </div>
                  <div className={styles.name}>
                    <h4>{fav.name}</h4>
                  </div>
                  <div>
                    <h4>Disponibilidad: {fav.stock}</h4>
                  </div>
                  <div>
                    <button
                      class={styles.button}
                      onClick={() => handleFavorite(fav.id)}
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
        </>
      ) : (
        <div>
          <h1 className={styles.title}>Favorites</h1>

          <div className={styles.btnCont}>
            <Link href={"/"} passHref>
              <button className={styles.homeBtn}>{"Let's go Shopping"}</button>
            </Link>
          </div>
          {restored[0] ? (
            <div className={styles.titleCont}>
              <button onClick={restoreFavorite} className={styles.rstrBtn}>
                Restore
              </button>
            </div>
          ) : (
            <h2 className={styles.filler}>{"You don't have favorites"}</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
