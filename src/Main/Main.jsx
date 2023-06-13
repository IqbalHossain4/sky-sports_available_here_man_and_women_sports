import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer/Footer";
import NavBar from "../pages/shared/NavBer/NavBer";

const Main = () => {
  return (
    <div>
      <NavBar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
