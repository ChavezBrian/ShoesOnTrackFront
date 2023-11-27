"use client";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
