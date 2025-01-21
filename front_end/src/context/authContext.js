import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../axiosInstance.js";

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
		//
		try {
			const res = await AxiosInstance({
				method: "post",
				url: "auth/login",
				withCredentials: true,
				data: {
					username_login: inputs.username_login,
					password_login: inputs.password_login,
					remember_login: inputs.remember_login,
				},
			});
			if (res.data.success) {
				if (res.data.body.Info.Role === "Lord" || res.data.body.Info.Role === "Admin") {
					setCurrentUser(res.data.body);
					navigate("/admin");
				}
				if (res.data.body.Info.Role === "User") {
					setCurrentUser(res.data.body);
					navigate("/user");
				}
			} else {
				showWarningLogin.innerHTML = `<p style="color:green;">${res.data.message}`;
				WarningTime();
			}
		} catch (err) {
			showWarningLogin.innerHTML = `<p style="color:red;">${
				err.response.data.message === undefined ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}` : err.response.data.message
			}</p>`;
			WarningTime();
		}
	};
	const logout = async () => {
		await AxiosInstance({
			method: "post",
			url: "auth/logout",
			withCredentials: true,
		});
		setCurrentUser(null);
	};
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(CurrentUser));
	}, [CurrentUser]);

	return <AuthContext.Provider value={{ CurrentUser, login, logout }}>{children}</AuthContext.Provider>;
};
