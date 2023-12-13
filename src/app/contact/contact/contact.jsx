"use client";
import { useState } from "react";
import Newsletter from "@/components/newsletter/Newsletter";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "@/redux/actions";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
} from "@/utils/formValidation";
import "./Contact.css";
// Sweetalert
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Loader
import { showLoader, hideLoader } from "@/redux/actions";

function Contact() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "", // Nuevo campo para el correo electrónico
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handlerInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Realiza validaciones según el campo cambiado
    switch (name) {
      case "name":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: validateName(value),
        }));
        break;
      case "email":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value),
        }));
        break;
      case "phone":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          phone: validatePhone(value),
        }));
        break;
      case "message":
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          message: validateMessage(value),
        }));
        break;
      default:
        break;
    }
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    console.log("FormData before send:", formData); // Agrega este log para verificar

    setFormErrors({
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message),
    });

    if (
      formErrors.name ||
      formErrors.email ||
      formErrors.phone ||
      formErrors.message
    ) {
      Swal.fire("Error", "Please fix the form errors.", "error");
      return;
    }

    try {
      dispatch(showLoader());

      // Dispatch de la acción sendEmail
      await dispatch(sendEmail({ ...formData }));

      Swal.fire("Message sent", "", "success");
    } catch (error) {
      console.error("Error en el envío del correo electrónico:", error.message);
      Swal.fire(
        "Error sending message",
        "There was a problem sending the message. Please try again later.",
        "error"
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  // Validacion

  // Renderizado
  return (
    <div className="background">
      <NavBar user={user} />
      <form class="form" onSubmit={handlerSubmit}>
        <h3 className="title">Contact Us!</h3>

        <label>
          <input
            className="input"
            type="text"
            required
            id="name"
            name="name"
            value={formData.name}
            onChange={handlerInputChange}
          />
          <span className="label">Name</span>
        </label>
        {formErrors.name !== "" ? (
          <span className="error">{formErrors.name}</span>
        ) : null}

        <label>
          <input
            className="input"
            type="email"
            required
            id="email"
            name="email"
            value={formData.email}
            onChange={handlerInputChange}
          />
          <span className="label">Email</span>
        </label>
        {formErrors.email !== "" ? (
          <span className="error">{formErrors.email}</span>
        ) : null}

        <label>
          <input
            className="input"
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={handlerInputChange}
            required
          />
          <span className="label">Number</span>
        </label>
        {formErrors.phone !== "" ? (
          <span className="error">{formErrors.phone}</span>
        ) : null}

        <label>
          <textarea
            className="input01"
            rows="3"
            id="message"
            name="message"
            value={formData.message}
            onChange={handlerInputChange}
            required
          ></textarea>
          <span className="label">Message</span>
        </label>
        {formErrors.message !== "" ? (
          <span className="error">{formErrors.message}</span>
        ) : null}

        {formErrors.name ||
        formErrors.email ||
        formErrors.phone ||
        formErrors.message ? (
          <button className="button" type="submit" disabled="true">
            <p class="submit">Submit</p>
          </button>
        ) : (
          <button className="button" type="submit">
            <p class="submit">Submit</p>
          </button>
        )}
      </form>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Contact;
