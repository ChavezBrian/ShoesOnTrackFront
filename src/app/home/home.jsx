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
import { getFiltersAndPagination } from "@/redux/actions";
import { useLocalStorage } from "@/helpers/localStorage/useLocalStorage";

const HomePage = () => {
  const Page = useSelector((state) => state.indexProductShow);
  const [initialPageSet, setInitialPageSet] = useState(1);
  const [initialFilters, setInitialFilters] = useLocalStorage('initialFilters', {});
  const [isClient, setIsClient] = useState(false)
  const user = useSelector((state) => state.user);
  const maxPages = Math.ceil(Page?.info?.total / 8);
  const currentPage = Page?.info?.page;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialPageSet) {
      dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
      setInitialPageSet(true);
      setIsClient(true)
    }
  }, [initialPageSet, dispatch]);

  const loadProducts = async () => {
    if (!Page.length) {
      await dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name === "marcas"){name = "brandName"}
    if(name === "price-order"){name = "priceOrd"}
    if(name === "categorias"){name = "CategoryId"}
    console.log(name)
    setInitialFilters({ ...initialFilters, [name]: value });
    setInitialPageSet(1);
    setIsClient(true)
  };
  
  
  const handleFilterRemove = (filterName) => {
    const newInitialFilters = { ...initialFilters };
    delete newInitialFilters[filterName];
    setInitialFilters(newInitialFilters);
    dispatch(getFiltersAndPagination(newInitialFilters, 1));
  };
  
  useEffect(()=>{
    dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
  },[initialFilters, initialPageSet])
  
  useEffect(()=>{
    setIsClient(true)
    console.log(initialFilters)
    console.log(user)
  }, [handleChange, loadProducts]);

  const marcasOpt = ["Nike", "Adidas"];
  const categoriaOpt = [
[1,"ZAPATILLAS HIGH TOP"],
    [2,"ZAPATILLAS MID TOP"],
    [3,"ZAPATILLAS DEPORTIVAS"],
    [ 4,"ZAPATILLAS LOW TOP"],
    [5, "CHANCLAS"],
   [ 6,"SANDALIAS"],
    [7,"BOTAS"],
    [8,"BOTINES"]
  ]
  const colorOpt = ["negro", "rojo", "azul", "amarillo", "rosa", "blanco", "naranja", "oro"]
  //ordenamiento
  const PriceOpt = ["highest", "lowest"];
  return (
    <div className={styles?.home}>
      
      <Header 
      initialFilters={initialFilters}
      setInitialFilters={setInitialFilters}
      initialPageSet={initialPageSet}
      setInitialPageSet={setInitialPageSet}
      />
      <NavBar/>
      <Filters
          name="marcas"
          options={marcasOpt}
          handleChange={handleChange}
          state={null}
        />
        <FilterCategory
          name="categorias"
          options={categoriaOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          name="color"
          options={colorOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          name="price-order"
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
          <button className={styles['active-filter']} onClick={() => handleFilterRemove('brandName')}>
            {initialFilters?.brandName}
          </button>
        )}
        {isClient && initialFilters?.CategoryId && (
          <button className={styles['active-filter']} onClick={() => handleFilterRemove('CategoryId')}>
            {categoriaOpt[initialFilters?.CategoryId - 1][1]}
          </button>
        )}
        {isClient && initialFilters?.color && (
          <button className={styles['active-filter']} onClick={() => handleFilterRemove('color')}>
            {initialFilters?.color}
          </button>
        )}
        {isClient && initialFilters?.priceOrd && (
          <button className={styles['active-filter']} onClick={() => handleFilterRemove('priceOrd')}>
            {initialFilters?.priceOrd}
          </button>
        )}
        
      <Cards shoes={Page.results}/>
      <Paginate
      maxPages={maxPages}
      currentPage={currentPage}
      setInitialPageSet={setInitialPageSet}
      />
      <Newsletter/>
      <Footer />
      
    </div>
  );
};

export default HomePage;
