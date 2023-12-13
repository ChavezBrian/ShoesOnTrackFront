"use client"
import { Provider } from "react-redux"
import store from "@/redux/store"
import Carrito from "./carrito/carrito";

const LoginPage = () => {
  return (
      <div>
        <Provider store={store}>
          <Carrito />
      </Provider>
      </div>
  );
};

export default LoginPage;