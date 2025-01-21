import { useContext, useEffect, useState } from "react";
import "./default.css";
import { AuthContext } from "../../../../../context/authContext";
import { AxiosInstance } from "../../../../../axiosInstance";
import moment from "moment";

export const DefaultAdmin = () => {
	const { CurrentUser } = useContext(AuthContext);
	const [FirstNameAdmin, SetFirstNameAdmin] = useState("");
	const [LastNameAdmin, SetLastNameAdmin] = useState("");
	const [UserName, SetUserName] = useState("");
	const [EmailAdmin, SetEmailAdmin] = useState("");
	const [PasswordAdmin, SetPasswordAdmin] = useState("");
	const [DataAdmin, setDataAdmin] = useState([]);

	const [success, setSuccess] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [Reg, SetReg] = useState({
		status: true,
		content: "",
	});
	const [ActionEditPart, setActionEditPart] = useState(false);

	//
	useEffect(() => {
		const FetchData = async () => {
			await AxiosInstance({
				method: "get",
				url: `admin/?id=${CurrentUser.Info.Id}`,
				withCredentials: true,
			})
				.then((success) => {
					setDataAdmin(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		FetchData();
	}, []);

	const handleFileChange = async (event) => {
		const file = event.target?.files[0];
		const previewUrl = URL.createObjectURL(file);
		setSelectedImage(file);
		setImagePreview(previewUrl);
	};
	//
	const fa0 = "نام خانوادگی : ";
	const fa1 = "نام : ";
	const fa2 = "ایمیل : ";
	const fa5 = "انتخاب تصویر";
	const fa6 = "لغو";
	const fa7 = "ویرایش";
	const fa8 = "ایمیل باید به gmail.com@ ختم شود !";
	const fa9 = "رمز عبور : ";
	const fa10 = "نام کاربری : ";
	const fa12 = "زمان ساخت حساب : ";
	const fa13 = "آخرین بروزرسانی : ";
	const fa14 = "رمز عبور جدید ...";
	const fa15 = "تایید شده";
	const fa16 = "تایید نشده";
	const i1 = "نام کاربری باید حداقل 8 کاراکتر باشد!";
	const i2 = "نام کاربری باید از کاراکتر های انگلیسی تشکیل شود!";
	const i3 = "نام کاربری باید حداقل شامل بک حرف کوچک باشد!";
	const i4 = "نام کاربری باید حداقل شامل یک حرف بزرگ باشد!";
	const i5 = "نام کاربری باید حداقل شامل یک عدد باشد!";
	const i6 = "نام کاربری باید حداقل شامل یکی از نمادهای @#$%& باشد!";

	console.log(DataAdmin);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (selectedImage) {
			const formData = new FormData();
			formData.append("file", selectedImage);
			await AxiosInstance.post("/upload/admin", formData)
				.then((success) => {
					DataAdmin.fileUsers[0].FilePath = success.data.FilePath;
					setImagePreview(null);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		if (Reg.status && /^.+@gmail\.com+[\W]?$/.test(EmailAdmin ? EmailAdmin : DataAdmin.emailAdmin?.EmailAdmin)) {
			await AxiosInstance.post(
				`/admin/edit?firstname=${FirstNameAdmin}&lastname=${LastNameAdmin}&username=${UserName}&password=${PasswordAdmin}&email=${EmailAdmin}`
			)
				.then((success) => {
					setDataAdmin(success.data.body);
					setImagePreview(null);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			if (!Reg.status) {
				document.getElementById("validation-username").focus();
			} else {
				document.getElementById("input-admin-edit-panel").focus();
			}
		}
	};
	const RegularUser = (v) => {
		[
			{ i: i1, reg: /.{8,}/.test(v) },
			{ i: i2, reg: /^[\w@#$%&]*$/.test(v) },
			{ i: i3, reg: /[a-z]/.test(v) },
			{ i: i4, reg: /[A-Z]/.test(v) },
			{ i: i5, reg: /[0-9]/.test(v) },
			{ i: i6, reg: /[@#$%&]/.test(v) },
		].filter((e) => (e.reg === false ? SetReg({ ...Reg, status: false, content: e.i }) : e)).length === 6 &&
			SetReg({ ...Reg, status: true, content: "" });
	};
	return (
		<div className="admin-container">
			{!ActionEditPart ? (
				<div className="admin-content-container">
					<h5>پروفایل</h5>
					<div className="admin-profile-content">
						<div className="admin-image-profile">{<img src={DataAdmin.Default_Image} alt="igm" />}</div>
						<div className="admin-other-profile">
							<div className="admin-name-input">
								{fa1}
								{DataAdmin.Admin_FirstName + " " + DataAdmin.Admin_LastName}
							</div>
							<div className="admin-email-input">
								{fa2}
								{success ? <p>{success}</p> : DataAdmin.emailAdmin?.EmailAdmin}
								{!success && (
									<button	
										disabled={DataAdmin.Verify_Email}
										onClick={async () =>
											await AxiosInstance.get(`auth/verify-email?email=${DataAdmin.emailAdmin?.EmailAdmin}&status=false`)
												.then((s) => setSuccess(s.data.message))
												.catch((e) => setSuccess(e.data.message))
										}
									>
										{DataAdmin.Verify_Email ? <p style={{ color: "green" }}>{fa15}</p> : <p style={{ color: "red" }}>{fa16}</p>}
									</button>
								)}
							</div>
							<div className="admin-name-other">
								{fa10}
								{DataAdmin.User_AdminName}
							</div>
							<div className="admin-createAt-other">
								{fa12}
								{moment(DataAdmin.createdAt).fromNow()}
							</div>
							<div className="admin-updatedAt-other">
								{fa13}
								{moment(DataAdmin.updatedAt).fromNow()}
							</div>
						</div>
						<button className="btn-going-to-edit-user" onClick={() => setActionEditPart(true)}>
							{fa7}
						</button>
					</div>
				</div>
			) : (
				<div className="admin-edit-content-container">
					<h5>پروفایل</h5>
					<div className="admin-edit-profile-content">
						<div className="admin-edit-image-profile">
							<label htmlFor="ImgProfileUser">
								{<img src={imagePreview ? imagePreview : DataAdmin.Default_Image} alt="igm" />}
								<p>{fa5}</p>
							</label>
							<input style={{ display: "none" }} onChange={handleFileChange} type="file" id="ImgProfileUser" accept="image/*,.jpg,.jpeg,.png" />
						</div>
						<div className="admin-edit-inputs-profile">
							<div className="admin-edit-name-input">
								{fa1}
								<input
									type="text"
									value={FirstNameAdmin}
									placeholder={DataAdmin.Admin_FirstName}
									onChange={(e) => SetFirstNameAdmin(e.target.value)}
								/>
							</div>
							<div className="admin-edit-name-input">
								{fa0}
								<input type="text" value={LastNameAdmin} placeholder={DataAdmin.Admin_LastName} onChange={(e) => SetLastNameAdmin(e.target.value)} />
							</div>
							<div className="admin-edit-email-input">
								{fa2}
								<input
									type="email"
									id="input-admin-edit-panel"
									value={EmailAdmin}
									placeholder={DataAdmin.emailAdmin?.EmailAdmin}
									onChange={(e) => SetEmailAdmin(e.target.value)}
								/>
								{!/^.+@gmail\.com+[\W]?$/.test(!EmailAdmin ? DataAdmin.emailAdmin?.EmailAdmin : EmailAdmin) && <p>{fa8}</p>}
							</div>
						</div>
						<div className="admin-edit-other-profile">
							<div className="admin-edit-name-other">
								<label htmlFor="validation-username">{fa10}</label>
								<input
									type="username"
									value={UserName}
									placeholder={DataAdmin.Admin_UserName}
									onChange={(e) => {
										SetUserName(e.target.value);
										RegularUser(e.target.value.length > 0 ? e.target.value : DataAdmin.Admin_UserName);
									}}
									name="username"
									id="validation-username"
								/>
								{!Reg.status && (
									<p id="warning-username" style={{ color: "red" }}>
										{Reg.content}
									</p>
								)}
							</div>
							<div className="admin-edit-password-other">
								{fa9}
								<input
									type="password"
									placeholder={fa14}
									value={PasswordAdmin}
									onChange={(e) => SetPasswordAdmin(e.target.value)}
									name="username"
									id="username"
								/>
							</div>
							<div className="btn-action-edit">
								<button
									onClick={() => {
										setActionEditPart(false);
										setImagePreview(false);
										SetFirstNameAdmin("");
										SetLastNameAdmin("");
										SetUserName("");
										SetEmailAdmin("");
										SetPasswordAdmin("");
										SetReg({ ...Reg, status: false, content: "" });
									}}
								>
									{fa6}
								</button>
								<button onClick={handleSubmit}>{fa7}</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// export const DefaultAuthor = () => {
// 	const { CurrentUser } = useContext(AuthContext);

// 	return (
// 		<div className="content-profile-author">
// 			<div className="image-author">
// 				<img
// 					src={
// 						CurrentUser.Info.Img
// 							? CurrentUser.Info.Img
// 							: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/100px-User_icon_2.svg.png"
// 					}
// 					alt="author"
// 				/>
// 			</div>
// 			<div className="author-name">
// 				<h1>{CurrentUser.Info.FirstName && CurrentUser.Info.FirstName + " " + CurrentUser.Info.LastName}</h1>
// 			</div>
// 			<div className="author-title">
// 				<h2>{CurrentUser.Info.Describe}</h2>
// 			</div>
// 			<div className="author-Bio">
// 				<h3>{CurrentUser.Info.Content}</h3>
// 			</div>
// 		</div>
// 	);
// };
