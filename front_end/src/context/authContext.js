import { createContext, useEffect, useState } from "react";
import { AxiosDefaultUrl } from "../components/admin/header/pages/createNews/CreateNews.jsx";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [CurrentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

  const login = async (inputs) => {
    const showWarningLogin = document.getElementById("submit-warning-login");
    const WarningTime = () => {
      showWarningLogin.style.visibility = "visible";
      setTimeout(() => {
        showWarningLogin.style.visibility = "hidden";
      }, 5000);
    };
    try {
      const res = await AxiosDefaultUrl({
        method: "post",
        url: "auth/login",
        withCredentials: true,
        data: {
          username_login: inputs.username_login,
          password_login: inputs.password_login,
          remember_login: inputs.remember_login,
        },
      });
      setCurrentUser(res.data);
      navigate("/");
    } catch (err) {
      showWarningLogin.innerHTML = `<p style="color:red;">${
        err.response.data.message === undefined
          ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}`
          : err.response.data.message
      }</p>`;
      WarningTime();
    }
  };
  const logout = async () => {
    await AxiosDefaultUrl({
      method: "post",
      url: "auth/logout",
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(CurrentUser));
  }, [CurrentUser]);

  return (
    <AuthContext.Provider value={{ CurrentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};
