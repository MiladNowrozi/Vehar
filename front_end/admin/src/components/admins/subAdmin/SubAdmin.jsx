import { Outlet } from "react-router-dom";
import "./subAdmin.css";

export const SubAdmin = () => {
  return (
    <div className="sob-admin">
      <h1>Sub Admin</h1>
      <Outlet />
    </div>
  );
};
