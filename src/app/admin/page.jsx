"use client";
import { getUserProducts } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoeList from "../../components/dashboard/ShoeList";

const ShoesPage = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.userProducts);
  const user = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const loadShoes = () => {
    if (user?.id && (refresh || !isClient)) {
      dispatch(getUserProducts);
      setRefresh(false);
      setIsClient(true);
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) window.location.href = "/";
    else setIsClient(true);
  }, [user]);

  useEffect(() => {
    dispatch(getUserProducts());
  }, []);

  return (
    <div>
      {isClient && (
        <div>
          <h2>ADMIN: {user?.name}</h2>
          <ShoeList shoes={shoes} />
        </div>
      )}
    </div>
  );
};

export default ShoesPage;
