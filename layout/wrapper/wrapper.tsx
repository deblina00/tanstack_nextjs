import React, { ReactNode } from "react";
import ResponsiveAppBar from "../header/header";
import Footer from "../footer/footer";


interface props {
  children: ReactNode;
}
const Wrapper: React.FC<props> = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </div>
  );
};

export default Wrapper;
