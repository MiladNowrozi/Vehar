import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext.js";

import "./login_register.css";
import { AxiosInstance } from "../../../axiosInstance.js";

export const LoginAndRegister = () => {
	const { login } = useContext(AuthContext);

	const [input, setInput] = useState({
		username_login: "",
		password_login: "",
		remember_login: "",
		firstName_register: "",
		lastName_register: "",
		username_register: "",
		password_register: "",
		email_register: "",
		email_forgot: "",
		username_forgot: "",
		password_forgot: "",
	});

	const LoginAndRegisterChangHandle = (e) => {
		const { value, name } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const UsernameRegisterChangHandle = (e) => {
		const { value } = e.target;
		const showWarningRegister = document.getElementById("submit-warning-register");
		const username_register_validation = [
			/.{8,}/.test(value),
			/^[\w@#$%&]*$/.test(value),
			/[a-z]/.test(value),
			/[A-Z]/.test(value),
			/[0-9]/.test(value),
			/[@#$%&]/.test(value),
		];
		const countInvalid = username_register_validation.filter((e) => {
			return e === false;
		}).length;
		showWarningRegister.style.visibility = "visible";
		!username_register_validation[2]
			? (showWarningRegister.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل بک حرف کوچگ باشد!</p>`)
			: (showWarningRegister.style.visibility = "visible");
		!username_register_validation[0]
			? (showWarningRegister.innerHTML = `<p style="color: red;">نام کاربری باید حداقل 8 کاراکتر باشد !</p>`)
			: (showWarningRegister.style.visibility = "visible");
		!username_register_validation[4]
			? (showWarningRegister.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یک عدد باشد!</p>`)
			: (showWarningRegister.style.visibility = "visible");
		!username_register_validation[3]
			? (showWarningRegister.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یک حرف بزرگ باشد!</p>`)
			: (showWarningRegister.style.visibility = "visible");
		!username_register_validation[5]
			? (showWarningRegister.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یکی از نمادهای @#$%& باشد!</p>`)
			: (showWarningRegister.style.visibility = "visible");
		!username_register_validation[1]
			? (showWarningRegister.innerHTML = `<p style="color: red;">نام کاربری باید از کاراکتر های انگلیسی تشکیل شود!</p>`)
			: (showWarningRegister.style.visibility = "visible");

		countInvalid === 6 && (showWarningRegister.style.visibility = "hidden");
		countInvalid === 0 && (showWarningRegister.style.visibility = "hidden");
		setInput((prev) => ({ ...prev, username_register: countInvalid === 0 ? value : "" }));
	};

	const EmailRegisterChangHandle = (e) => {
		const { value } = e.target;
		const showWarningRegister = document.getElementById("submit-warning-register");
		const email_register_validation = /^.+@gmail\.com+[\S]?$/.test(value);
		showWarningRegister.style.visibility = "visible";
		!email_register_validation && value !== ""
			? (showWarningRegister.innerHTML = `<p style="color: red;">ایمیل باید به @gmail.com ختم شود!</p>`)
			: (showWarningRegister.style.visibility = "hidden") && setInput((prev) => ({ ...prev, email_register: value }));
	};

	const forgotEmailChangHandle = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const WarningForgot = document.getElementById("submit-warning-forgot");
		const email_register_validation = /^.+@gmail\.com+[\S]?$/.test(value);
		WarningForgot.style.visibility = "visible";
		!email_register_validation && value !== ""
			? (WarningForgot.innerHTML = `<p style="color: red;">ایمیل باید به @gmail.com ختم شود!</p>`)
			: (WarningForgot.style.visibility = "hidden") && setInput((prev) => ({ ...prev, email_forgot: value }));
	};

	const forgotUsernameChangHandle = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const WarningForgot = document.getElementById("submit-warning-forgot");
		const username_forgot_validation = [
			/.{8,}/.test(value),
			/^[\w@#$%&]*$/.test(value),
			/[a-z]/.test(value),
			/[A-Z]/.test(value),
			/[0-9]/.test(value),
			/[@#$%&]/.test(value),
		];
		const countInvalid = username_forgot_validation.filter((e) => {
			return e === false;
		}).length;
		WarningForgot.style.visibility = "visible";
		!username_forgot_validation[2]
			? (WarningForgot.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل بک حرف کوچگ باشد!</p>`)
			: (WarningForgot.style.visibility = "visible");
		!username_forgot_validation[0]
			? (WarningForgot.innerHTML = `<p style="color: red;">نام کاربری باید حداقل 8 کاراکتر باشد !</p>`)
			: (WarningForgot.style.visibility = "visible");
		!username_forgot_validation[4]
			? (WarningForgot.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یک عدد باشد!</p>`)
			: (WarningForgot.style.visibility = "visible");
		!username_forgot_validation[3]
			? (WarningForgot.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یک حرف بزرگ باشد!</p>`)
			: (WarningForgot.style.visibility = "visible");
		!username_forgot_validation[5]
			? (WarningForgot.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یکی از نمادهای @#$%& باشد!</p>`)
			: (WarningForgot.style.visibility = "visible");
		!username_forgot_validation[1]
			? (WarningForgot.innerHTML = `<p style="color: red;">نام کاربری باید از کاراکتر های انگلیسی تشکیل شود!</p>`)
			: (WarningForgot.style.visibility = "visible");

		countInvalid === 6 && (WarningForgot.style.visibility = "hidden");
		countInvalid === 0 && (WarningForgot.style.visibility = "hidden");
		setInput((prev) => ({ ...prev, username_forgot: countInvalid === 0 ? value : "" }));
	};

	const forgotPasswordChangHandle = (e) => {
		setInput((prev) => ({ ...prev, password_forgot: e.target.value }));
	};

	const handelSubmitLogin = async (e) => {
		e.preventDefault();
		const showWarningLogin = document.getElementById("submit-warning-login");
		const DataLoginCheck = [input.username_login === "", input.password_login === ""].filter((v) => {
			return v === true;
		});
		const WarningTime = () => {
			showWarningLogin.style.visibility = "visible";
			setTimeout(() => {
				showWarningLogin.style.visibility = "hidden";
			}, 5000);
		};

		if (DataLoginCheck.length === 0) {
			try {
				await login(input);
			} catch (error) {
				console.log(error);
			}
		} else if (DataLoginCheck.length === 2) {
			WarningTime();
			showWarningLogin.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
		} else {
			WarningTime();
			showWarningLogin.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.username_login === "" ? "نام کاربری، " : ""}${
				input.password_login === "" ? "رمز عبور، " : ""
			}</p> &nbsp;را هم پر کنید!`;
		}
	};

	const handelEUPForgot = async (e) => {
		e.preventDefault();
		const WarningForgot = document.getElementById("submit-warning-forgot");
		const WarningTime = () => {
			WarningForgot.style.visibility = "visible";
			setTimeout(() => {
				WarningForgot.style.visibility = "hidden";
			}, 5000);
		};
		const DataForgotCheck = [input.email_forgot === "", input.username_forgot === "", input.password_forgot === ""].filter((v) => {
			return v === true;
		});

		if (DataForgotCheck.length === 0) {
			try {
				await AxiosInstance({
					method: "post",
					url: "auth/email_password_forgot",
					withCredentials: true,
					data: {
						email_forgot: input.email_forgot,
						username_forgot: input.username_forgot,
						password_forgot: input.password_forgot,
					},
				})
					.then((success) => {
						WarningTime();
						WarningForgot.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
					})
					.catch((err) => {
						WarningTime();
						WarningForgot.style.visibility = "visible";
						WarningForgot.innerHTML = `<p style="color: red;">${
							err.response.data.message === undefined ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}` : err.response.data.message
						}</p>`;
					});
			} catch (error) {
				WarningTime();
				WarningForgot.style.visibility = "visible";
				WarningForgot.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
			}
		} else {
			if (DataForgotCheck.length === 3) {
				WarningTime();
				WarningForgot.style.visibility = "visible";
				WarningForgot.innerHTML = `<p style="color: red;">لطفاً فیلد ها رو پر کنید</p>`;
			} else {
				WarningTime();
				WarningForgot.style.visibility = "visible";
				WarningForgot.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.email_forgot === "" ? "ایمیل، " : ""}${
					input.username_forgot === "" ? "نام کاربری، " : ""
				}${input.password_forgot === "" ? "رمز عبور، " : ""}
        </p> &nbsp;را هم پر کنید!`;
			}
		}
	};

	const handelSubmitRegister = async (e) => {
		e.preventDefault();
		const WarningTime = () => {
			showWarningRegister.style.visibility = "visible";
			setTimeout(() => {
				showWarningRegister.style.visibility = "hidden";
			}, 5000);
		};

		const showWarningRegister = document.getElementById("submit-warning-register");
		const DataRegisterCheck = [
			input.firstName_register === "",
			input.lastName_register === "",
			input.username_register === "",
			input.password_register === "",
			input.email_register === "",
		].filter((v) => {
			return v === true;
		});

		if (DataRegisterCheck.length === 0) {
			try {
				await AxiosInstance({
					method: "post",
					url: "auth/register",
					withCredentials: true,
					data: {
						firstName_register: input.firstName_register,
						lastName_register: input.lastName_register,
						username_register: input.username_register,
						password_register: input.password_register,
						email_register: input.email_register,
					},
				})
					.then((success) => {
						showWarningRegister.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
						WarningTime();
					})
					.catch((err) => {
						showWarningRegister.style.visibility = "visible";
						showWarningRegister.innerHTML = `<p style="color: red;">${
							err.response.data.message === undefined ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}` : err.response.data.message
						}</p>`;
						setTimeout(() => {
							showWarningRegister.style.visibility = "hidden";
						}, 5000);
					});
			} catch (error) {
				showWarningRegister.style.visibility = "visible";
				showWarningRegister.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
				setTimeout(() => {
					showWarningRegister.style.visibility = "hidden";
				}, 5000);
			}
		} else {
			console.log(input);

			if (DataRegisterCheck.length === 5) {
				showWarningRegister.style.visibility = "visible";
				showWarningRegister.innerHTML = `<p style="color: red;">لطفاً فیلد ها رو پر کنید</p>`;
				setTimeout(() => {
					showWarningRegister.style.visibility = "hidden";
				}, 5000);
			} else {
				showWarningRegister.style.visibility = "visible";
				showWarningRegister.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.firstName_register === "" ? "نام، " : ""}${
					input.lastName_register === "" ? "نام خانوادگی، " : ""
				}${input.username_register === "" ? "نام کاربری، " : ""}${input.password_register === "" ? "رمز عبور، " : ""}${
					input.email_register === "" ? "ایمیل، " : ""
				}</p> &nbsp;را هم پر کنید!`;
				setTimeout(() => {
					showWarningRegister.style.visibility = "hidden";
				}, 5000);
			}
		}
	};

	return (
		<div className="container-auth">
			{/* start login part */}
			<div id="login-content" style={{ right: "35%" }} className="login-content">
				<p className="title-login">وارد شوید!</p>
				<form className="login-form" id="login-form" action="">
					<div className="login-input">
						<div className="username-login">
							<label htmlFor="username_login">نام کاربری :</label>
							<i className="fas fa-user"></i>
							<input type="text" name="username_login" placeholder="نام کاربری ..." id="username_login" onChange={LoginAndRegisterChangHandle} />
						</div>
						<div className="password-login">
							<label htmlFor="password_login">رمز عبور :</label>
							<i className="fas fa-lock"></i>
							<input type="password" name="password_login" placeholder="رمز عبور ..." id="password_login" onChange={LoginAndRegisterChangHandle} />
						</div>
					</div>
					<div id="submit-warning-login"></div>
					<div className="other-info-login">
						<button onClick={handelSubmitLogin} type="submit">
							ارسال درخواست
						</button>
						<div className="btn-login">
							<button
								onClick={() => {
									document.getElementById("login-content").style.right = "100%";
									document.getElementById("forgot-password").style.right = "35%";
								}}
								type="button"
							>
								فراموشی رمز عبور!
							</button>
							<button
								onClick={() => {
									document.getElementById("login-content").style.right = "100%";
									document.getElementById("register-content").style.right = "35%";
								}}
								type="button"
							>
								ثبت نام
							</button>
						</div>
					</div>
				</form>
			</div>
			{/* start forgot password */}
			<div id="forgot-password" style={{ right: "-30%" }} className="forgot-password">
				<p className="title-forgot">فراموشی رمز عبور</p>
				<form className="forgot-form" id="forgot-form" action="">
					<div className="forgot-input">
						<div className="email-forgot">
							<label htmlFor="email_forgot">ایمیل :</label>
							<i className="fas fa-envelope"></i>
							<input type="email" name="email_forgot" placeholder="ایمیل ..." id="email_forgot" onChange={forgotEmailChangHandle} />
						</div>
						<div className="username-forgot">
							<label htmlFor="username_forgot">نام کاربری جدید</label>
							<i className="fas fa-user"></i>
							<input type="username" name="username_forgot" placeholder="نام کاربری جدید..." id="username_forgot" onChange={forgotUsernameChangHandle} />
						</div>
						<div className="password-forgot">
							<label htmlFor="password_forgot">رمز عبور جدید :</label>
							<i className="fas fa-lock"></i>
							<input type="password" name="password_forgot" placeholder="رمز عبور جدید ..." id="password_forgot" onChange={forgotPasswordChangHandle} />
						</div>
					</div>
					<div id="submit-warning-forgot"></div>
					<div className="other-info-forgot">
						<button onClick={handelEUPForgot} type="submit">
							ارسال درخواست
						</button>
						<div className="btn-forgot">
							<button
								onClick={() => {
									document.getElementById("forgot-password").style.right = "100%";
									document.getElementById("register-content").style.right = "35%";
								}}
								type="button"
							>
								ثبت نام
							</button>
							<button
								onClick={() => {
									document.getElementById("forgot-password").style.right = "-35%";
									document.getElementById("login-content").style.right = "35%";
								}}
								type="button"
							>
								صفحه ورود
							</button>
						</div>
					</div>
				</form>
			</div>
			{/* start register part */}

			<div id="register-content" style={{ right: "-35%" }} className="register-content">
				<p className="title-register">ثبت نام کنید!</p>
				<form className="register-form" id="register-form" action="">
					<div className="register-input">
						<div className="firstName-register">
							<label htmlFor="firstName_register">نام :</label>
							<input type="text" name="firstName_register" placeholder="نام ..." id="firstName_register" onChange={LoginAndRegisterChangHandle} />
						</div>
						<div className="lastName-register">
							<label htmlFor="lastName_register">نام خانوادگی :</label>
							<input type="text" name="lastName_register" placeholder="نام خانوادگی ..." id="lastName_register" onChange={LoginAndRegisterChangHandle} />
						</div>
						<div className="username-register">
							<label htmlFor="username_register">نام کاربری :</label>
							<i className="fas fa-user"></i>
							<input type="username" name="username_register" placeholder="نام کاربری ..." id="username_register" onChange={UsernameRegisterChangHandle} />
						</div>
						<div className="password-register">
							<label htmlFor="password_register">رمز عبور :</label>
							<i className="fas fa-lock"></i>
							<input type="password" name="password_register" placeholder="رمز عبور ..." id="password_register" onChange={LoginAndRegisterChangHandle} />
						</div>
						<div className="email-register">
							<label htmlFor="email_register">ایمیل :</label>
							<i className="fas fa-envelope"></i>
							<input type="email" name="email_register" placeholder="ایمیل ..." id="email_register" onChange={EmailRegisterChangHandle} />
						</div>
					</div>
					<div id="submit-warning-register"></div>

					<div className="other-info-register">
						<button type="submit" onClick={handelSubmitRegister}>
							ارسال درخواست
						</button>
						<button
							onClick={() => {
								document.getElementById("login-content").style.right = "35%";
								document.getElementById("register-content").style.right = "-30%";
							}}
							type="button"
						>
							صفحه ورود
						</button>
					</div>
				</form>
			</div>
			<Outlet />
		</div>
	);
};
