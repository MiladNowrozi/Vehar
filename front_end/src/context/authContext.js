import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../axiosInstance.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [CurrentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));
	const [CurrentAuthor, setCurrentAuthor] = useState(JSON.parse(localStorage.getItem("author") || null));
	const [CurrentLord, setCurrentLord] = useState(JSON.parse(localStorage.getItem("lord") || null));

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
				if (res.data.body.Role === "OnAuthor") {
					setCurrentAuthor(res.data.body);
					navigate("/author");
				}
				if (res.data.body.Role === "Lord") {
					setCurrentLord(res.data.body);
					navigate("/lord");
				}
				if (res.data.body.Role === "OnUser") {
					setCurrentUser(res.data.body);
					navigate("/");
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
		localStorage.setItem("author", JSON.stringify(CurrentAuthor));
		localStorage.setItem("lord", JSON.stringify(CurrentLord));
	}, [CurrentUser, CurrentAuthor, CurrentLord]);

	return <AuthContext.Provider value={{ CurrentUser, CurrentAuthor, CurrentLord, login, logout }}>{children}</AuthContext.Provider>;
};
