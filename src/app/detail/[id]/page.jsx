
"use client"
import Detail from "./detail/detail";
import { Provider } from "react-redux"
import store from "@/redux/store"

const LoginPage = () => {
  return (
      <div>
        <Provider store={store}>
          <Detail/>
      </Provider>
      </div>
  );
};

export default LoginPage;