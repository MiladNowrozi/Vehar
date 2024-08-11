import { Outlet } from "react-router-dom";
import "./subAdmin.css";

function SubAdmin() {
  return (
    <div className="sob-admin">
      <h1>Sub Admin</h1>
      <Outlet />
    </div>
  );
}

export default SubAdmin;
