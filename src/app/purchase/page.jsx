"use client"
import { Provider } from "react-redux"
import store from "@/redux/store"
import Purchase from "./purchase/purchase";

const LoginPage = () => {
  return (
      <div>
        <Provider store={store}>
            <Purchase/>
      </Provider>
      </div>
  );
};

export default LoginPage;