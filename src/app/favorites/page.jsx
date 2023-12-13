"use client"
import Favorites from "./favorites/favorites";
import { Provider } from "react-redux"
import store from "@/redux/store"

const LoginPage = () => {
  return (
      <div>
        <Provider store={store}>
          <Favorites />
      </Provider>
      </div>
  );
};

export default LoginPage;