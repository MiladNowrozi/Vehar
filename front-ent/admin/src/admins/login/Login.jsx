import { Outlet } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div>
      <Outlet />
      <h1>Login</h1>
    </div>
  );
}

export default Login;
