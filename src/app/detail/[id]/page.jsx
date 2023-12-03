
"use client"
import Detail from "./detail/detail";
import { Provider } from "react-redux"
import store from "@/redux/store"

import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/newsletter/Newsletter";
import NavBar from "@/components/navbar/Navbar";


const LoginPage = () => {
  return (
      <div>
        <Provider store={store}>
          <Header/>
          <NavBar/>
          <Detail/>
          <Newsletter/>
          <Footer/>
      </Provider>
      </div>
  );
};

export default LoginPage;