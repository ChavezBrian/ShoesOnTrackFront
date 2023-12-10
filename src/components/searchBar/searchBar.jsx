"use client";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import lupa from "@/helpers/assets/Lupa.png";
import Image from "next/image";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getFiltersAndPagination } from "@/redux/actions";

const SearchBar = ({
  initialFilters,
  setInitialFilters,
  initialPageSet,
  setInitialPageSet,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event?.target?.value);
    handleSearch();
  };

  const handleSearch = useDebouncedCallback(() => {
    setInitialFilters({ ...initialFilters, name });
    setInitialPageSet(1);
    dispatch(getFiltersAndPagination(initialFilters, initialPageSet));
  }, 300);

  return (
    <div className={styles?.searchbar}>
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Search for a product..."
        className={styles?.input}
      />
      <button onClick={() => setName("")} className={styles?.button}>
        <Image
          src={lupa}
          className={styles?.Lupa}
          width={25}
          height={25}
          alt="Search"
        />
      </button>
    </div>
  );
};

export default SearchBar;
