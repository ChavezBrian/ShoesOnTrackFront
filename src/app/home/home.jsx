"use client";
import Link from "next/link";
import Cards from "@/components/cardsContainer/cards.jsx";
import Header from "@/components/header/header";
import Filters from "@/components/filters/Filters";
import FilterCategory from "@/components/filters/filterCategory";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/newsletter/Newsletter";
import Paginate from "@/components/paginate/paginate.jsx";
import NavBar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import button from "@/helpers/assets/clockwise.svg";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersAndPagination, getAllFavs, getAllCarts } from "@/redux/actions";
import { useLocalStorage } from "@/helpers/localStorage/useLocalStorage";

const HomePage = () => {
  const Page = useSelector((state) => state.indexProductShow);
  const [initialPageSet, setInitialPageSet] = useState(1);
  const [initialFilters, setInitialFilters] = useLocalStorage(
    "initialFilters",
    {}
  );
  const [isClient, setIsClient] = useState(false);
  const user = useSelector((state) => state.user);
  const maxPages = Math.ceil(Page?.info?.total / 8);
  const currentPage = Page?.info?.page;
  const favs = useSelector((state) => state.favorites);
  const carrito = useSelector((state)=> state.carrito);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialPageSet) {
      dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
      setInitialPageSet(true);
      setIsClient(true);
    }
  }, [initialPageSet, dispatch]);

  const loadProducts = async () => {
    if (!Page.length) {
      await dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
    }
  };

  const loadFavsCarts = ()=>{
    if(user?.id){
       dispatch(getAllFavs(user.id));
       dispatch(getAllCarts(user.id));
    }
   }

  useEffect(() => {
    loadProducts();
    loadFavsCarts();
  }, [user]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "Marcas") {
      name = "brandName";
    }
    if (name === "Price-order") {
      name = "priceOrd";
    }
    if (name === "Categorias") {
      name = "CategoryId";
    }
    if (name === "Color") {
      name = "color";
    }
    console.log(name);
    setInitialFilters({ ...initialFilters, [name]: value });
    setInitialPageSet(1);
    setIsClient(true);
  };

  const handleFilterRemove = (filterName) => {
    const newInitialFilters = { ...initialFilters };
    delete newInitialFilters[filterName];
    setInitialFilters(newInitialFilters);
    dispatch(getFiltersAndPagination(newInitialFilters, 1));
  };

  useEffect(() => {
    dispatch(getFiltersAndPagination(initialFilters, initialPageSet));

  },[initialFilters, initialPageSet])
  
  useEffect(()=>{
    setIsClient(true)
    console.log(initialFilters)
    console.log(user)
    console.log(favs, carrito);

  }, [handleChange, loadProducts]);

  const marcasOpt = ["Nike", "Adidas"];
  const categoriaOpt = [
    [1, "ZAPATILLAS HIGH TOP"],
    [2, "ZAPATILLAS MID TOP"],
    [3, "ZAPATILLAS DEPORTIVAS"],
    [4, "ZAPATILLAS LOW TOP"],
    [5, "CHANCLAS"],
    [6, "SANDALIAS"],
    [7, "BOTAS"],
    [8, "BOTINES"],
  ];
  const colorOpt = [
    "negro",
    "rojo",
    "azul",
    "amarillo",
    "rosa",
    "blanco",
    "naranja",
    "oro",
  ];
  //ordenamiento
  const PriceOpt = ["highest", "lowest"];
  return (
    <div className={styles?.home}>
      {/* <Header
        initialFilters={initialFilters}
        setInitialFilters={setInitialFilters}
        initialPageSet={initialPageSet}
        setInitialPageSet={setInitialPageSet}
      /> */}
      <NavBar
        initialFilters={initialFilters}
        setInitialFilters={setInitialFilters}
        initialPageSet={initialPageSet}
        setInitialPageSet={setInitialPageSet}
        user={user}
      />

      <Filters
        name="Marcas"
        options={marcasOpt}
        handleChange={handleChange}
        state={null}
      />
      <FilterCategory
        name="Categorias"
        options={categoriaOpt}
        handleChange={handleChange}
        state={null}
      />
      <Filters
        name="Color"
        options={colorOpt}
        handleChange={handleChange}
        state={null}
      />
      <Filters
        name="Price-order"
        options={PriceOpt}
        handleChange={handleChange}
        state={null}
      />
      <button
        onClick={() => {
          setInitialPageSet(1); // Reiniciar a la página 1 cuando se hace clic en el botón de reset
          dispatch(getFiltersAndPagination({}, 1));
          setInitialFilters({});
        }}
        className={styles?.button}
      >
        <Image
          className={styles?.reset}
          src={button}
          width={25}
          height={25}
          alt="Reset"
        />
      </button>

      <br />
      {isClient && initialFilters?.brandName && (
        <button
          className={styles["active-filter"]}
          onClick={() => handleFilterRemove("brandName")}
        >
          {initialFilters?.brandName}
        </button>
      )}
      {isClient && initialFilters?.CategoryId && (
        <button
          className={styles["active-filter"]}
          onClick={() => handleFilterRemove("CategoryId")}
        >
          {categoriaOpt[initialFilters?.CategoryId - 1][1]}
        </button>
      )}
      {isClient && initialFilters?.color && (
        <button
          className={styles["active-filter"]}
          onClick={() => handleFilterRemove("color")}
        >
          {initialFilters?.color}
        </button>
      )}
      {isClient && initialFilters?.priceOrd && (
        <button
          className={styles["active-filter"]}
          onClick={() => handleFilterRemove("priceOrd")}
        >
          {initialFilters?.priceOrd}
        </button>
      )}

      <Cards shoes={Page.results} />
      <Paginate
        maxPages={maxPages}
        currentPage={currentPage}
        setInitialPageSet={setInitialPageSet}
      />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
