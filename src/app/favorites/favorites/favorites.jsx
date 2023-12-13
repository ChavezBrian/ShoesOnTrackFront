"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavs, removeFavoriteBack  } from "@/redux/actions";
import NavBar from "@/components/navbar/Navbar";
import Cards from "@/components/cardsContainer/cards";
import Link from "next/link";

const Favorites = () => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const [client, setClient] = useState(false);
    const favs = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.user);

    const loadFavs = ()=>{
        if(user?.id && (refresh || !client)){
            dispatch(getAllFavs(user.id));
            setRefresh(false);
            setClient(true);
        }
    }
    useEffect(() => {
        loadFavs()
      }, [favs, refresh]);

      const handleFavorite = async(id) => {
        await dispatch(removeFavoriteBack({ UserId: user.id, ProductId: id }));
        setRefresh(true); 
      };

      useEffect(()=>{
        console.log(favs)
      },[favs])

  return (
    <div>
        <NavBar user={user}/>
        {favs?.length > 0 ? (
        <>
          <h2>Favoritos de {user?.name}</h2>
          <div>
            {favs.map((fav) => (
              <div key={fav.id}>
                <button onClick={() => handleFavorite(fav.id)}>
                  {'❤️'}
                </button>
                <Link href={`/detail/${fav.id}`}>
                  <div>
                  <img src={fav.image} alt={fav.name}></img>
                  <div >
                     <span>{fav.brandName}</span>
                     <h4 >{fav.name}</h4>
                     </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>

          <p>Nada por acá...</p>
        <p>Aún no tenés productos en Favoritos</p>
        </div>
      )}
        
    </div>
  );
};

export default Favorites;