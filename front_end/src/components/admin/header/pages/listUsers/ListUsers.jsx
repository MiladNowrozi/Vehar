import { AxiosInstance } from "../../../../../axiosInstance.js";
import "./listUsers.css";
import { useEffect, useState } from "react";

export const ListUsers = () => {
	const [ReceiveAllUser, setReceiveAllUser] = useState([]);

	useEffect(() => {
		const res = async () => {
			await AxiosInstance({
				method: "get",
				url: "user/get-all",
				withCredentials: true,
			})
				.then(async (success) => {
					setReceiveAllUser(success.data.body);
					document.getElementById("empty-user").innerHTML = success.data.message;
				})
				.catch((e) => {
					console.log(e);
				});
		};
		res();
	}, []);

	const [IdDeletedUser, setIdDeletedUser] = useState(null);
	const handleDeletedUser = async (Deleted) => {
		setIdDeletedUser(Deleted.target.id);
		document.getElementById("warning-delete-user").style.display = "flex";
		document.getElementById("deleted-user").innerHTML = `آیا میخواهید کاربر <span style="color:red;">${Deleted.target.name}</span> را حذف کنید ؟`;
	};

	const handleCancelDeleUser = async () => {
		document.getElementById("warning-delete-user").style.display = "none";
	};

	const handleDeleteUser = async () => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `user/delete/?id=${IdDeletedUser}`,
				withCredentials: true,
			})
				.then((success) => {
					setReceiveAllUser(success.data.body);
					document.getElementById("empty-user").innerHTML = "";
					document.getElementById("warning-delete-user").style.display = "none";
					document.getElementById("empty-user").innerHTML = success.data.message;
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelUser = async (Cancel) => {
		try {
			await AxiosInstance({
				method: "put",
				url: `user/dismissal?id=${Cancel.target.id}`,
				withCredentials: true,
			})
				.then((success) => {
					setReceiveAllUser(success.data.body);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-add-user">
			<div id="content-add-user" className="content-add-user">
				<h2>کاربران</h2>
				{ReceiveAllUser.map((e) => {
					const [DateC, TimeC] = [
						{ DateCreate: new Date(e.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0] },
						{ TimeCreate: new Date(e.createdAt).toTimeString().split(" ")[0] },
					];
					const [DateU, TimeU] = [
						{ DateUpdate: new Date(e.updatedAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0] },
						{ TimeUpdate: new Date(e.updatedAt).toTimeString().split(" ")[0] },
					];
					return (
						<div key={e.id} className="content-map-user">
							<div className="map-user">
								<div className="content-options">
									<div className="img-profile-user style-display">
										<span>پروفایل</span>
										<img
											src={e.User_Img ? e.User_Img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s"}
											alt="img-profile"
										/>
									</div>
									<div className="name-user style-display">
										<span>نام</span>
										<p className="td-info">{e.User_FirstName + " " + e.User_LastName}</p>
									</div>
									<div className="email-user-1 style-display">
										<span>ایمیل</span>
										<div className="td-info">{e.emailUser.EmailUser}</div>
									</div>
									<div className="role-user style-display">
										<span>وضعیت</span>
										<div className={e.Role !== "User" && e.Role !== "Lord" ? "red td-info" : "green td-info"}>
											{e.Role === "User" && "فعال"}
											{e.Role === "!User" && " غیر فعال"}
										</div>
									</div>
									<div className="status-email-user style-display">
										<span>وضعیت ایمیل</span>
										<div className={e.Verify_Email ? "green td-info" : "red td-info"}>{e.Verify_Email === true ? "تایید" : "تایید نشده"}</div>
									</div>
									<div className="td-info style-display">
										<span>تاریخ ایجاد</span>
										<div>
											<span className="Date">{DateC.DateCreate}</span> <span className="Time">{TimeC.TimeCreate}</span>
										</div>
									</div>
									<div className="td-info style-display">
										<span>آخرین بروزرسانی</span>
										<div>
											<span className="Date">{DateU.DateUpdate}</span> <span className="Time">{TimeU.TimeUpdate}</span>
										</div>
									</div>
									{e.Role !== "Lord" && (
										<div className="ffff style-display">
											<button id={e.id} name={e.User_FirstName + " " + e.User_LastName} onClick={handleDeletedUser} className="delete-user">
												حذف
											</button>
											{e.Role !== "Lord" && (
												<button id={e.id} onClick={handleCancelUser} className="cancel-user">
													{e.Role === "User" ? "غیر فعال" : "فعال"}
												</button>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
				<div>
					<div>
						<span style={{ color: "white" }} id="empty-user"></span>
					</div>
				</div>
			</div>
			<div id="warning-delete-user" className="warning-delete-user">
				<div id="deleted-user"></div>
				<div>
					<button className="btn-deleted-user" onClick={handleDeleteUser}>
						حذف
					</button>
					<button className="btn-cancel-user" onClick={handleCancelDeleUser}>
						لغو
					</button>
				</div>
			</div>
		</div>
	);
};
