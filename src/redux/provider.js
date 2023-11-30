"use client";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://deploy-back-wine.vercel.app/";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
