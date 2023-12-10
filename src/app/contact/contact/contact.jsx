"use client";
import { useState } from "react";
import Header from "@/components/header/header";
import Newsletter from "@/components/newsletter/Newsletter";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { sendEmail } from "@/redux/actions";
import { validateName, validateEmail, validatePhone, validateMessage } from "@/utils/formValidation";
import "./Contact.css";
// Sweetalert
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Loader
import { showLoader, hideLoader } from "@/redux/actions";

function Contact() {
  const dispatch = useDispatch();

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
      Swal.fire("Error sending message", "There was a problem sending the message. Please try again later.", "error");
    } finally {
      dispatch(hideLoader());
    }
  };



  // Validacion


  // Renderizado
  return (
    <>
      <NavBar />
      <section className="bg-blue-400 contactSection">
        <div className="contentContact max-w-screen-lg mx-auto p-4">
          {/*Loader*/}

          <div className="contact-container flex">
            {/*1era columna*/}

            <div className="contact-info flex-col items-center w-5/12 p-4">
              <h1 className="text-[1.5rem] font-bold mb-2  mt-1">
                Leave us your message!
              </h1>
              <br />

              <div className="d-flex align-items-center">
                <i
                  className="bi bi-person-check mr-2"
                  style={{ fontSize: "1.9rem" }}
                ></i>
                <p className="contact-detail-options">
                  <b>Managed by:</b> ShoesOnTrack Team{" "}
                </p>
              </div>

              <div className="d-flex align-items-center m-1">
                <i
                  className="bi bi-house-check mr-2"
                  style={{ fontSize: "1.9rem" }}
                ></i>
                <p className="contact-detail-options">
                  <b>Adress: </b> Avenida Libertaria 2023
                </p>
              </div>

              <div className="d-flex align-items-center m-1">
                <i
                  className="bi bi-telephone mr-2"
                  style={{ fontSize: "1.9rem" }}
                ></i>
                <p className="contact-detail-options">
                  <b>Phone:</b> 3116412467
                </p>
              </div>

              <div className="d-flex align-items-center m-1">
                <i
                  className="bi bi-envelope-at mr-2"
                  style={{ fontSize: "1.9rem" }}
                ></i>
                <p className="contact-detail-options">
                  <b>Email:</b> ShoesOnTrack@gmail.com
                </p>
              </div>
            </div>

            {/*2nda columna, Form*/}
            <div className="contact-form flex-col items-center w-7/12 p-4">
              <h5 className="text-lg font-bold mb-4">
                Complaints or suggestions? Let us know and we will be with you as soon as possible.
              </h5>

              <form onSubmit={handlerSubmit}>
                <div>
                  <label htmlFor="name" className="contact-label-text">
                    Name and surname
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="contact-input"
                    value={formData.name}
                    onChange={handlerInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="contact-label-text">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="contact-input"
                    value={formData.email}
                    onChange={handlerInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="contact-label-text">
                    Phone number or whatsapp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="contact-input"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handlerInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="contact-label-text">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-input"
                    value={formData.message}
                    onChange={handlerInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="buttonSubmit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Contact;
