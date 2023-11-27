"use client"
import HomePage from "./home/home"
import { Provider } from "react-redux"
import store from "@/redux/store"

const LoginPage = () => {
  return (
      <div>
        <Provider store={store}>
          <HomePage />
      </Provider>
      </div>
  );
};

export default LoginPage;
