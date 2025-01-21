import { useEffect, useState } from "react";

import "./listAuthor.css";
import { AxiosInstance } from "../../../../../axiosInstance.js";

export const ListAuthors = () => {
	const [ReceiveAllAuthor, setReceiveAllAuthor] = useState([]);

	const [input, setInput] = useState({
		Admin_FirstName: "",
		Admin_LastName: "",
		Admin_UserName: "",
		Admin_Password: "",
		Admin_Email: "",
	});

	const AuthorChangHandle = (e) => {
		const { value, name } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const UsernameAuthorChangHandle = (e) => {
		const { value } = e.target;
		const showWarningAuthor = document.getElementById("submit-warning-author");
		const Admin_UserName_validation = [
			/.{8,}/.test(value),
			/^[\w@#$%&]*$/.test(value),
			/[a-z]/.test(value),
			/[A-Z]/.test(value),
			/[0-9]/.test(value),
			/[@#$%&]/.test(value),
		];
		const countInvalid = Admin_UserName_validation.filter((e) => {
			return e === false;
		}).length;
		showWarningAuthor.style.display = "flex";
		!Admin_UserName_validation[2]
			? (showWarningAuthor.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل بک حرف کوچگ باشد!</p>`)
			: (showWarningAuthor.style.display = "flex");
		!Admin_UserName_validation[0]
			? (showWarningAuthor.innerHTML = `<p style="color: red;">نام کاربری باید حداقل 8 کاراکتر باشد !</p>`)
			: (showWarningAuthor.style.display = "flex");
		!Admin_UserName_validation[4]
			? (showWarningAuthor.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یک عدد باشد!</p>`)
			: (showWarningAuthor.style.display = "flex");
		!Admin_UserName_validation[3]
			? (showWarningAuthor.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یک حرف بزرگ باشد!</p>`)
			: (showWarningAuthor.style.display = "flex");
		!Admin_UserName_validation[5]
			? (showWarningAuthor.innerHTML = `<p style="color: red;">نام کاربری باید حداقل شامل یکی از نمادهای @#$%& باشد!</p>`)
			: (showWarningAuthor.style.display = "flex");
		!Admin_UserName_validation[1]
			? (showWarningAuthor.innerHTML = `<p style="color: red;">نام کاربری باید از کاراکتر های انگلیسی تشکیل شود!</p>`)
			: (showWarningAuthor.style.display = "flex");

		countInvalid === 6 && (showWarningAuthor.style.display = "none");
		countInvalid === 0 && (showWarningAuthor.style.display = "none");
		setInput((prev) => ({ ...prev, Admin_UserName: countInvalid === 0 ? value : "" }));
	};

	const EmailAuthorChangHandle = (e) => {
		const { value } = e.target;
		const showWarningAuthor = document.getElementById("submit-warning-author");
		const Admin_Email_validation = /^.+@gmail\.com+[\S]?$/.test(value);
		showWarningAuthor.style.display = "flex";
		!Admin_Email_validation && value !== ""
			? (showWarningAuthor.innerHTML = `<p style="color: red;">ایمیل باید به @gmail.com ختم شود!</p>`)
			: (showWarningAuthor.style.display = "none") && setInput((prev) => ({ ...prev, Admin_Email: value }));
	};

	const handelSubmitAuthor = async (e) => {
		e.preventDefault();
		const WarningTime = () => {
			showWarningAuthor.style.display = "flex";
			setTimeout(() => {
				showWarningAuthor.style.display = "none";
			}, 5000);
		};
		const Admin_FirstName = document.forms["CreateAuthor"]["Admin_FirstName"];
		const Admin_LastName = document.forms["CreateAuthor"]["Admin_LastName"];
		const Admin_UserName = document.forms["CreateAuthor"]["Admin_UserName"];
		const Admin_Password = document.forms["CreateAuthor"]["Admin_Password"];
		const Admin_Email = document.forms["CreateAuthor"]["Admin_Email"];
		const showWarningAuthor = document.getElementById("submit-warning-author");
		const DataAuthorCheck = [
			input.Admin_FirstName === "",
			input.Admin_LastName === "",
			input.Admin_UserName === "",
			input.Admin_Password === "",
			input.Admin_Email === "",
		].filter((v) => {
			return v === true;
		});
		if (DataAuthorCheck.length === 0) {
			try {
				await AxiosInstance({
					method: "post",
					url: "admin/create",
					withCredentials: true,
					data: {
						Admin_FirstName: input.Admin_FirstName,
						Admin_LastName: input.Admin_LastName,
						Admin_UserName: input.Admin_UserName,
						Admin_Password: input.Admin_Password,
						Admin_Email: input.Admin_Email,
					},
				})
					.then((success) => {
						document.getElementById("Admin_FirstName").value = "";
						document.getElementById("Admin_LastName").value = "";
						document.getElementById("Admin_UserName").value = "";
						document.getElementById("Admin_Password").value = "";
						document.getElementById("Admin_Email").value = "";
						setReceiveAllAuthor(success.data.body);
						document.getElementById("empty-author").innerHTML = "";
						showWarningAuthor.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
						WarningTime();
					})
					.catch((err) => {
						showWarningAuthor.style.display = "flex";
						showWarningAuthor.innerHTML = `<p style="color: red;">${
							err.response.data.message === undefined ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}` : err.response.data.message
						}</p>`;
						setTimeout(() => {
							showWarningAuthor.style.display = "none";
						}, 5000);
					});
			} catch (error) {
				showWarningAuthor.style.display = "flex";
				showWarningAuthor.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
				setTimeout(() => {
					showWarningAuthor.style.display = "none";
				}, 5000);
			}
		} else {
			if (DataAuthorCheck.length === 5) {
				showWarningAuthor.style.display = "flex";
				showWarningAuthor.innerHTML = `<p style="color: red;">لطفاً فیلد ها رو پر کنید</p>`;
				setTimeout(() => {
					showWarningAuthor.style.display = "none";
				}, 5000);
			} else {
				const showWarningAuthor = document.getElementById("submit-warning-author");
				if (input.Admin_FirstName === "") {
					showWarningAuthor.style.display = "flex";
					showWarningAuthor.textContent = "لطفاً فیلد نام را پر کنید!";
					Admin_FirstName.focus(); // Set focus on the name input
					setTimeout(() => {
						showWarningAuthor.style.display = "none";
					}, 5000);
					return false;
				}
				if (input.Admin_LastName === "") {
					showWarningAuthor.style.display = "flex";
					showWarningAuthor.textContent = "لطفاً فیلد نام خانوادگی را پر کنید!";
					Admin_LastName.focus(); // Set focus on the name input
					setTimeout(() => {
						showWarningAuthor.style.display = "none";
					}, 5000);
					return false;
				}
				if (input.Admin_UserName === "") {
					showWarningAuthor.style.display = "flex";
					showWarningAuthor.textContent = "لطفاً فیلد نام کاربری را پر کنید!";
					Admin_UserName.focus(); // Set focus on the name input
					setTimeout(() => {
						showWarningAuthor.style.display = "none";
					}, 5000);
					return false;
				}
				if (input.Admin_Password === "") {
					showWarningAuthor.style.display = "flex";
					showWarningAuthor.textContent = "لطفاً فیلد رمز عبور را پر کنید!";
					Admin_Password.focus(); // Set focus on the name input
					setTimeout(() => {
						showWarningAuthor.style.display = "none";
					}, 5000);
					return false;
				}
				if (input.Admin_Email === "") {
					showWarningAuthor.style.display = "flex";
					showWarningAuthor.textContent = "لطفاً فیلد ایمیل را پر کنید!";
					Admin_Email.focus(); // Set focus on the name input
					setTimeout(() => {
						showWarningAuthor.style.display = "none";
					}, 5000);
					return false;
				}
			}
		}
	};

	useEffect(() => {
		const res = async () => {
			await AxiosInstance({
				method: "get",
				url: "admin/get-all",
				withCredentials: true,
			})
				.then(async (success) => {
					setReceiveAllAuthor(success.data.body);
					document.getElementById("empty-author").innerHTML = success.data.message;
				})
				.catch((e) => {
					console.log(e);
				});
		};
		res();
	}, []);

	const [IdDeletedAuthor, setIdDeletedAuthor] = useState(null);

	const handleDeletedAuthor = async (Deleted) => {
		setIdDeletedAuthor(Deleted.target.id);
		document.getElementById("warning-delete-author").style.display = "flex";
		document.getElementById("deleted-author").innerHTML = `آیا میخواهید نویسنده <span style="color:red;">${Deleted.target.name}</span> را حذف کنید ؟`;
	};

	const handleCancelDeleAuthor = async () => {
		document.getElementById("warning-delete-author").style.display = "none";
	};

	console.log(IdDeletedAuthor);

	const handleDeleteAuthor = async () => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `admin/delete?id=${IdDeletedAuthor}`,
				withCredentials: true,
			})
				.then((success) => {
					setReceiveAllAuthor(success.data.body);
					document.getElementById("empty-author").innerHTML = "";
					document.getElementById("warning-delete-author").style.display = "none";
					document.getElementById("empty-author").innerHTML = success.data.message;
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelAuthor = async (Cancel) => {
		try {
			await AxiosInstance({
				method: "post",
				url: `admin/dismissal?id=${Cancel.target.id}`,
				withCredentials: true,
			})
				.then((success) => {
					setReceiveAllAuthor(success.data.body);
					document.getElementById("empty-author").innerHTML = "";
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-add-author">
			<div id="content-add-author" className="content-add-author">
				<h2>نویسنده ها</h2>
				<table className="content-table-author">
					<thead>
						<tr className="titles-table-author">
							<th>پروفایل</th>
							<th>نام نویسنده</th>
							<th>ایمیل</th>
							<th>وضعیت سمت</th>
							<th>وضعیت ایمیل</th>
							<th>تاریخ ایجاد</th>
							<th>آخرین بروزرسانی</th>
						</tr>
					</thead>
					{ReceiveAllAuthor.map((e) => {
						const [DateC, TimeC] = [
							{ DateCreate: new Date(e.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0] },
							{ TimeCreate: new Date(e.createdAt).toTimeString().split(" ")[0] },
						];
						const [DateU, TimeU] = [
							{ DateUpdate: new Date(e.updatedAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0] },
							{ TimeUpdate: new Date(e.updatedAt).toTimeString().split(" ")[0] },
						];
						return (
							<tbody key={e.id} className="content-map-author">
								<tr>
									<td>
										<hr style={{ border: "none", height: "1px" }} />
									</td>
								</tr>
								<tr className="map-author">
									<td className="img-profile-author">
										<img
											src={e.Admin_Img ? e.Admin_Img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s"}
											alt="img-profile"
										/>
									</td>
									<td className="td-info">{e.Admin_FirstName + " " + e.Admin_LastName}</td>
									{console.log(e)}
									<td className="td-info">{e.emailAdmin.EmailAdmin}</td>
									<td className={e.Role !== "Admin" && e.Role !== "Lord" ? "red td-info" : "green td-info"}>
										{e.Role === "Admin" && "نصب"}
										{e.Role === "!Admin" && "عزل"}
										{e.Role === "Lord" && "مالک"}
									</td>
									<td className={e.Verify_Email ? "green td-info" : "red td-info"}>{e.Verify_Email === true ? "تایید" : "تایید نشده"}</td>
									<td className="td-info">
										<span className="Date">{DateC.DateCreate}</span> <span className="Time">{TimeC.TimeCreate}</span>
									</td>
									<td className="td-info">
										<span className="Date">{DateU.DateUpdate}</span> <span className="Time">{TimeU.TimeUpdate}</span>
									</td>
									<td className="ffff">
										{e.Role !== "Lord" && (
											<button id={e.id} name={e.Admin_FirstName + " " + e.Admin_LastName} onClick={handleDeletedAuthor} className="delete-author">
												حذف
											</button>
										)}
										{e.Role !== "Lord" && (
											<button id={e.id} onClick={handleCancelAuthor} className="cancel-author">
												{e.Role === "OnAuthor" ? "عزل" : "منصوب"}
											</button>
										)}
									</td>
								</tr>
							</tbody>
						);
					})}
					<thead>
						<tr>
							<td>
								<span style={{ color: "white" }} id="empty-author"></span>
							</td>
						</tr>
					</thead>
				</table>
				<div>
					<div id="author-content" className="author-content">
						<p className="title-author">اضافه کردن یک نویسنده</p>
						<form name="CreateAuthor" className="author-form" id="author-form" action="">
							<div className="author-input">
								<div className="firstName-author">
									<label htmlFor="Admin_FirstName">نام :</label>
									<input type="text" name="Admin_FirstName" placeholder="نام ..." id="Admin_FirstName" onChange={AuthorChangHandle} />
								</div>
								<div className="lastName-author">
									<label htmlFor="Admin_LastName">نام خانوادگی :</label>
									<input type="text" name="Admin_LastName" placeholder="نام خانوادگی ..." id="Admin_LastName" onChange={AuthorChangHandle} />
								</div>
								<div className="username-author">
									<label htmlFor="Admin_UserName">نام کاربری :</label>
									<i className="fas fa-user"></i>
									<input
										type="username"
										name="Admin_UserName"
										placeholder="نام کاربری ..."
										id="Admin_UserName"
										onChange={UsernameAuthorChangHandle}
									/>
								</div>
								<div className="password-author">
									<label htmlFor="Admin_Password">رمز عبور :</label>
									<i className="fas fa-lock"></i>
									<input type="password" name="Admin_Password" placeholder="رمز عبور ..." id="Admin_Password" onChange={AuthorChangHandle} />
								</div>
								<div className="email-author">
									<label htmlFor="Admin_Email">ایمیل :</label>
									<i className="fas fa-envelope"></i>
									<input type="email" name="Admin_Email" placeholder="ایمیل ..." id="Admin_Email" onChange={EmailAuthorChangHandle} />
								</div>
							</div>
							<div className="other-info-author">
								<button type="submit" onClick={handelSubmitAuthor}>
									ارسال درخواست
								</button>
							</div>
						</form>
						<div id="submit-warning-author"></div>
					</div>
				</div>
			</div>
			<div id="warning-delete-author" className="warning-delete-author">
				<div id="deleted-author"></div>
				<div>
					<button className="btn-deleted-author" onClick={handleDeleteAuthor}>
						حذف
					</button>
					<button className="btn-cancel-author" onClick={handleCancelDeleAuthor}>
						لغو
					</button>
				</div>
			</div>
		</div>
	);
};
