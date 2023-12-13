"use client";

import validateModify from "@/utils/validationsModify";
import style from "./modify.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateShoe } from "@/redux/actions";
import { useParams } from "next/navigation";

const ModifyShoe = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!user?.isAdmin) window.location.href = "/";
    else setIsClient(true);
  }, [user]);

  const [inputDisabled, setInputDisabled] = useState(false);

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

  const [shoe, setShoe] = useState({
    id: id,
    name: "",
    // brandName: "",
    price: "",
    description: "",
    image: "",
    category: "",
    // color: "",
    stock: "",
    // details: [],
    sizes: [],
    // user: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Validar que se haya seleccionado un archivo
    if (file) {
      // Puedes realizar más validaciones aquí, si es necesario
      const reader = new FileReader();

      reader.onloadend = () => {
        const updatedShoe = { ...shoe };
        updatedShoe.image = reader.result;
        setShoe(updatedShoe);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const updatedShoe = { ...shoe };
    let updatedErrors = { ...errors };

    updatedShoe[name] = value;

    if (name === "category" && value !== "") {
      setInputDisabled(true);
      delete updatedErrors[name]; // Limpiar el error si se selecciona una categoría
    } else {
      setInputDisabled(false);
      updatedErrors[name] = "Category is required"; // Mostrar error si no se selecciona una categoría
    }

    setShoe(updatedShoe);
    setErrors(updatedErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedShoe = { ...shoe };
    let updatedErrors = { ...errors };

    updatedShoe[name] = value;

    if (name === "category") {
      // Validación para los detalles
      if (value.trim() === "") {
        updatedErrors[name] = "Category is required";
      } else {
        delete updatedErrors[name]; // Limpiar el error si los detalles se ingresan correctamente
      }
    } else {
      // Aquí podrías agregar más validaciones para otros campos si es necesario
    }

    setShoe(updatedShoe);
    setErrors(updatedErrors);
  };

  const handleChange = (e) => {
    let updatedShoe = { ...shoe };

    if (e.target.type === "checkbox" && e.target.name === "sizes") {
      const size = e.target.value;
      const isChecked = e.target.checked;

      if (isChecked && !updatedShoe.sizes.includes(size)) {
        updatedShoe.sizes.push(size);
      } else if (!isChecked && updatedShoe.sizes.includes(size)) {
        updatedShoe.sizes = updatedShoe.sizes.filter((item) => item !== size);
      }
    } else {
      updatedShoe[e.target.name] = e.target.value;
    }

    setShoe(updatedShoe);
    setErrors(validateModify(updatedShoe));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateModify(shoe);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await dispatch(updateShoe(shoe));

        if (!response.error) {
          // Mostrar alerta cuando se crea exitosamente un "shoe"
          toast.success("Successfully shoe modify!");

          // Resetear el estado del formulario después de un envío exitoso
          setShoe({
            id: "",
            name: "",
            price: "",
            description: "",
            image: "",
            category: "",
            stock: "",
            sizes: [],
          });

          // Recargar la página después de 1.5 segundos
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error(`Ups! ${response.error.message || "Error desconocido"}`);
          setTimeout(() => setMessage(""), 5000);
        }
      } catch (error) {
        toast.error(
          `Ups! Hubo un problema: ${error.message || "Error desconocido"}`
        );
        setTimeout(() => setMessage(""), 5000);
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
    if (id && !shoe.id) {
      setShoe((prevShoe) => ({
        ...prevShoe,
        id: id,
      }));
    }
  }, [id]); // solo ejecutar cuando id cambia

  //   useEffect(() => {
  //     dispatch(getProductsname(name))
  //   }, [name]);

  console.log(id);
  console.log(shoe);

  return (
    <div className={style.conte}>
      <div>
        <Toaster />
      </div>
      <form className={style.forcreate} onSubmit={handleSubmit}>
        <h4>User: {user.email}</h4>
        <h2>MODIFY YOUR SHOE</h2>
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
    </div>
  );
};

export default ModifyShoe;
