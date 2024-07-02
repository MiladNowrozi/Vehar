import "./admin.css";
import NavbarAdmin from "../components/navbar/Navbar";
import MenuAdmin from "../components/menu/Menu";
import HeaderAdmin from "../components/header/Header";

export const Admin = () => {
  return (
    <div className="body-admin">
      <div className="container-admin">
        <div className="admin-navbar-page">
          <NavbarAdmin />
        </div>
        <MenuAdmin />
        <div className="admin-header-page">
          <HeaderAdmin />
        </div>
      </div>
    </div>
  );
};

export default Admin;
