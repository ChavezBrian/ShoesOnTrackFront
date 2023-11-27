import React from 'react';
import styles from "./Filters.module.css"

const FilterCategory = ({ name, options, handleChange, state }) => (

    <div className={styles?.filter}>
      <select  name={name} onChange={handleChange} value={state || ""}>
        <option value="" disabled hidden>{name}</option>
        {options?.map((option, index) => (
            <option key={index} value={option[0]}>
            {option[1]}
          </option>
        ))}
      </select>
      </div>
  );

export default FilterCategory;