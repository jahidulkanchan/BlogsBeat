import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <ScrollRestoration/>
        <Outlet></Outlet>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
