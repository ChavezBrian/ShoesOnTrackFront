"use client";

import validateForm from "@/utils/validate";
import style from "../create-shoe/create.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateShoes = () => {
  const dispatch = useDispatch();

  const [shoe, setShoe] = useState({
    name: "",
    brandName: "",
    price: "",
    description: "",
    image: "", // Aquí se almacenará la URL de la imagen
    category: "",
    color: "",
    details: "",
    stock: "",
    sizes: "",
    user: "",
    // Cambié el nombre de 'user' para asignarlo después
  });

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setShoe({ ...shoe, [e.target.name]: e.target.value });
    setErrors(validateForm({ ...shoe, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(shoe);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await dispatch(createShoes(shoe));

        if (!response.error) {
          setMessage("You created a new shoe!");
          setShoe({
            name: "",
            brandName: "",
            price: "",
            description: "",
            image: "", // Aquí se almacenará la URL de la imagen
            category: "",
            color: "",
            details: "",
            stock: "",
            sizes: "",
            user: "",
          });
        } else {
          setMessage(`There is a problem: ${response.error.message}`);
        }
      } catch (error) {
        setMessage(`There is a problem: ${error.message}`);
      }
    }
  };

  const handleDisabled = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };

  return (
    <div className={style.conte}>
      <form className={style.forcreate} onSubmit={handleSubmit}>
        <span>
          User:
          {/* {user.name} */}
        </span>
        <h2>ENTER SHOE DATA</h2>
        <div className="mb-4">
          <label>Name:</label>
          <input
            name="name"
            placeholder="Enter a name..."
            type="name"
            value={shoe.name}
            onChange={handleChange}
          />
          <span>{errors.name}</span>
          <br />
          <label>Brand Name:</label>
          <input
            name="brandName"
            value={shoe.brandName}
            placeholder="Enter a Brand Name..."
            type="text"
            onChange={handleChange}
          />
          <span>{errors.brandName}</span>
          <br />
          <label>Price:</label>
          <input
            name="price"
            placeholder="Enter a Price"
            type="price"
            value={shoe.price}
            onChange={handleChange}
          />
          <span>{errors.price}</span>
          <br />
          <label>Image:</label>
          <input type="file" accept="image/" />
          <span>{errors.image}</span>

          <br />
          {/* <label>New Event Category:</label>
          <input
            placeholder="Enter a new event category"
            name="eventType"
            onChange={handleChange}
            value={shoe.category}
          />
          <br /> */}
          <label>Event Category:</label>
          <select name="category" onChange={handleChange} value={shoe.category}>
            <option value="">Select Shoe Category</option>
          </select>

          <span>{errors.category}</span>
          <br />

          <label>Color:</label>
          <input
            name="color"
            placeholder="Enter Colors..."
            type="text"
            value={shoe.color}
            onChange={handleChange}
          />
          <span>{errors.color}</span>
          <br />
          <label>Details:</label>
          <input
            name="details"
            placeholder="Enter details..."
            type="details"
            value={shoe.details}
            onChange={handleChange}
          />
          <span>{errors.details}</span>
          <br />
          <label>Sizes:</label>
          <input
            name="sizes"
            placeholder="Enter Sizes..."
            type="sizes"
            value={shoe.sizes}
            onChange={handleChange}
          />
          <span>{errors.sizes}</span>
          <br />
          <label>Description:</label>
          <input
            name="description"
            placeholder="Enter a description..."
            type="text"
            value={shoe.description}
            onChange={handleChange}
          />
          <span>{errors.description}</span>
          <br />
          {message && <span>{message}</span>}
          <Link href="/admin">Cancel</Link>
          <button
            disabled={handleDisabled()}
            type="submit"
            className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShoes;
