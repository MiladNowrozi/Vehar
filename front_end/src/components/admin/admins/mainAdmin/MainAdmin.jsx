import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../../navbar/Navbar";
import { MenuAdmin } from "../../menu/Menu";

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
