"use client";

import validateForm from "@/utils/validate";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import style from "../create-shoe/create.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShoe, getAllCategories } from "@/redux/actions";

const CreateShoes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) window.location.href = "/";
    else setIsClient(true);
  }, [user]);

  const medidas = [
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
  ];

  const categories = [
    "ZAPATILLAS HIGH TOP",
    "ZAPATILLAS MID TOP",
    "ZAPATILLAS DEPORTIVAS",
    "ZAPATILLAS LOW TOP",
    "CHANCLAS",
    "SANDALIAS",
    "BOTAS",
    "BOTINES",
  ];

  const shoeBrands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "New Balance",
    "Converse",
    "Vans",
  ];

  const [shoe, setShoe] = useState({
    name: "",
    brandName: "",
    price: "",
    description: "",
    image: "",
    category: "",
    color: "",
    stock: "",
    details: [],
    sizes: [],
    user: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const updateForm = (fieldName, value) => {
    setShoe((prevShoe) => ({
      ...prevShoe,
      [fieldName]: value,
    }));
  };

  const handleBrandNameSelectChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);

    const updatedErrors = { ...errors };
    if (name === "brandName" && value !== "") {
      setInputDisabled(true);
      delete updatedErrors[name];
    } else {
      setInputDisabled(false);
      updatedErrors[name] = "Brand name is required";
    }

    setErrors(updatedErrors);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const updatedShoe = { ...shoe };
        updatedShoe.image = reader.result;
        setShoe(updatedShoe);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBrandNameInputChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);

    const updatedErrors = { ...errors };
    if (name === "brandName") {
      if (value.trim() === "") {
        updatedErrors[name] = "Brand name is required";
      } else {
        delete updatedErrors[name];
      }
    }

    setErrors(updatedErrors);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);

    const updatedErrors = { ...errors };
    if (name === "category" && value !== "") {
      setInputDisabled(true);
      delete updatedErrors[name];
    } else {
      setInputDisabled(false);
      updatedErrors[name] = "Category is required";
    }

    setErrors(updatedErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateForm(name, value);

    const updatedErrors = { ...errors };
    if (name === "category") {
      if (value.trim() === "") {
        updatedErrors[name] = "Category is required";
      } else {
        delete updatedErrors[name];
      }
    }

    setErrors(updatedErrors);
  };

  const handleChange = (e) => {
    let updatedShoe = { ...shoe };

    if (e.target.name === "category" && e.target.value !== "") {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }

    if (e.target.type === "checkbox" && e.target.name === "sizes") {
      const size = e.target.value;
      const isChecked = e.target.checked;

      if (isChecked && !updatedShoe.sizes.includes(size)) {
        updatedShoe.sizes.push(size);
      } else if (!isChecked && updatedShoe.sizes.includes(size)) {
        updatedShoe.sizes = updatedShoe.sizes.filter((item) => item !== size);
      }
    } else if (e.target.name === "details") {
      updatedShoe.details = [e.target.value];
    } else if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          updatedShoe.image = reader.result;
          setShoe(updatedShoe);
          setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
        };

        reader.readAsDataURL(file);
      }
    } else {
      updatedShoe[e.target.name] = e.target.value;
    }

    setShoe(updatedShoe);
    setErrors(validateForm(updatedShoe));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(shoe);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await dispatch(createShoe(shoe));

        if (!response.error) {
          // Mostrar alerta cuando se crea exitosamente un "shoe"
          toast.success("Successfully created shoe!");

          // Resetear el estado del formulario después de un envío exitoso
          setShoe((prevShoe) => ({
            ...prevShoe,
            name: "",
            brandName: "",
            price: "",
            description: "",
            image: "",
            category: "",
            color: "",
            stock: "",
            details: [],
            sizes: [],
            user: user?.id,
          }));

          // Recargar la página después de un envío exitoso
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error(`Ups! Hubo un problema`);
        }
      } catch (error) {
        toast.error(`Ups! Hubo un problema`);
      }
    }
  };

  const handleDisabled = () => {
    for (let error in errors) {
      if (errors[error] !== "") return true;
    }
    return false;
  };

  useEffect(() => {
    if (user && user.id && !shoe.user) {
      setShoe((shoe) => ({
        ...shoe,
        user: user.id,
      }));
    }
  }, [user, shoe.user]);

  console.log(shoe);

  return (
    <div className={style.conte}>
      <div>
        <Toaster />
      </div>
      {isClient && (
        <form className={style.forcreate} onSubmit={handleSubmit}>
          <h4>User: {user.email}</h4>
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
            <select
              name="brandName"
              value={shoe.brandName}
              onChange={handleBrandNameSelectChange}
            >
              <option value="">Select Brand</option>
              {shoeBrands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <label>Create New Brand Name:</label>
            <input
              name="brandName"
              placeholder="Enter a New Brand"
              type="text"
              value={shoe.brandName}
              onChange={handleBrandNameInputChange}
              disabled={inputDisabled}
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
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <span>{errors.image}</span>
            <br />

            <label>Shoe Category:</label>
            <select
              name="category"
              onChange={handleSelectChange}
              value={shoe.category}
            >
              <option value="">Select Shoe Category</option>
              {categories?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br />

            <label>Create New Category:</label>
            <input
              name="category"
              placeholder="Enter new category..."
              type="text"
              value={shoe.category}
              onChange={handleInputChange}
              disabled={inputDisabled}
            />
            <span>{errors.category}</span>
            <br />
            <label>Stock:</label>
            <input
              name="stock"
              placeholder="Enter stock..."
              type="text"
              value={shoe.stock}
              onChange={handleChange}
            />
            <span>{errors.stock}</span>
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
              type="text"
              value={shoe.details}
              onChange={handleChange}
            />
            <span>{errors.details}</span>

            <br />
            <div>
              <label>Select the sizes of your shoe:</label>
              <br />
              <span>{errors.sizes}</span>
              <div className={style.checkboxContainer}>
                {Array.isArray(medidas) && medidas.length > 0 ? (
                  medidas.map((med, index) => (
                    <div key={index} className={style.checkboxOption}>
                      <p htmlFor={`opcion${index}`}>{med}</p>
                      <input
                        type="checkbox"
                        id={`opcion${index}`}
                        name="sizes"
                        value={med}
                        onChange={handleChange}
                      />
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
                <br />
              </div>
            </div>
            <br />
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter a description..."
              type="text"
              value={shoe.description}
              onChange={handleChange}
              rows={4}
              cols={55}
            />
            <span>{errors.description}</span>
            <br />
            {message && <span>{message}</span>}

            <div className={`${style.buttonContainer} mb-4`}>
              <Link legacyBehavior href="/admin">
                <a className={style.cancelButton}>CANCEL</a>
              </Link>

              <button
                disabled={handleDisabled()}
                type="submit"
                className={style.submitButton}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateShoes;
