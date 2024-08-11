import { Outlet } from "react-router-dom";
import MenuAdmin from "../../components/menu/Menu";
import NavbarAdmin from "../../components/navbar/Navbar";

import "./mainAdmin.css";

export const MainAdmin = () => {
  return (
    <div className="container-admin">
      <NavbarAdmin />
      <header className="hed-main-admin">
        <MenuAdmin />
        <Outlet />
      </header>
    </div>
  );
};

export default MainAdmin;
