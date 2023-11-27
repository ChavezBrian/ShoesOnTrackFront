"use client";
import Contact from "./contact/contact";
import { Provider } from "react-redux";
import store from "@/redux/store";

const Contacto = () => {
  return (
    <div>
      <Provider store={store}>
        <Contact />
      </Provider>
    </div>
  );
};

export default Contacto;
