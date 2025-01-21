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
				url: `user/delete${IdDeletedUser}`,
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
				<table className="content-table-user">
					<thead>
						<tr className="titles-table-user">
							<th>پروفایل</th>
							<th>نام کاربر</th>
							<th>ایمیل</th>
							<th>وضعیت</th>
							<th>وضعیت ایمیل</th>
							<th>تاریخ عضویت</th>
							<th>آخرین بروزرسانی</th>
						</tr>
					</thead>
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
							<tbody key={e.id} className="content-map-user">
								<tr>
									<td>
										<hr style={{ border: "none", height: "1px" }} />
									</td>
								</tr>
								<tr className="map-user">
									<td className="img-profile-user">
										<img
											src={
												e.Default_Image
													? e.Default_Image
													: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s"
											}
											alt="img-profile"
										/>
									</td>
									<td className="td-info">{e.User_FirstName + " " + e.User_LastName}</td>
									<td className="td-info">{e.emailUser}</td>
									<td className={e.Role !== "User" ? "red td-info" : "green td-info"}>{e.Role === "User" ? "فعال" : "غیر فعال"}</td>
									<td className={e.Verify_Email ? "green td-info" : "red td-info"}>{e.Verify_Email === true ? "تایید" : "تایید نشده"}</td>
									<td className="td-info">
										<span className="Date">{DateC.DateCreate}</span> <span className="Time">{TimeC.TimeCreate}</span>
									</td>
									<td className="td-info">
										<span className="Date">{DateU.DateUpdate}</span> <span className="Time">{TimeU.TimeUpdate}</span>
									</td>
									<td className="ffff">
										<button id={e.id} name={e.User_FirstName + " " + e.User_LastName} onClick={handleDeletedUser} className="delete-user">
											حذف
										</button>
										<button id={e.id} onClick={handleCancelUser} className="cancel-user">
											{e.Role === "User" ? "غیر فعال" : "فعال"}
										</button>
									</td>
								</tr>
							</tbody>
						);
					})}
					<thead>
						<tr>
							<td>
								<span style={{ color: "white" }} id="empty-user"></span>
							</td>
						</tr>
					</thead>
				</table>
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
