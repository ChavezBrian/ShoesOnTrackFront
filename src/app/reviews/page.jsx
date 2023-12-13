"use client";
import Reviews from "@/components/reviews/reviews";
import { Provider } from "react-redux";
import store from "@/redux/store";

const LoginPage = () => {
  return (
    <div>
      <Provider store={store}>
        <Reviews />
      </Provider>
    </div>
  );
};

export default LoginPage;