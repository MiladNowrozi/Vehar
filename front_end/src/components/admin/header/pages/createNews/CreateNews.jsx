/** @format */
import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate } from "react-router-dom";

import "./createnews.css";
import { AuthContext } from "../../../../../context/authContext";
import { AxiosInstance } from "../../../../../axiosInstance.js";

export const CreateNews = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({
		Titer: "",
		Title: "",
		Description: "",
		Editor: "",
		Images: null,
		NewsStatus: true,
		Comment_Status: false,
		MainPageSlider: false,
		MainPageChoice: false,
		SubPageSlider: false,
		SubPageColumn: false,
		MainNote: false,
		SubNote: false,
		Category: "",
		SubCategoryId: null,
		AuthorId: null,
	});
	const { CurrentLord } = useContext(AuthContext);

	const handelChange = (e) => {
		setInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
			AuthorId: CurrentLord ? CurrentLord.id : navigate("/login-register"),
		}));
	};

	const handelEditorChange = (e) => {
		const imgRegex = /<img\s+[^>]*src="([^"]*)"/gi;
		const imageUrls = [];
		let match;
		while ((match = imgRegex.exec(e)) !== null) {
			imageUrls.push(match[1]);
		}

		setInput((prev) => ({
			...prev,
			Editor: e,
			Images: imageUrls.toString(),
		}));
	};

	const handleChangeCategory = (e) => {
		const ele = document.getElementsByName("HandleCheckboxCategory");
		const eleSubCategory = document.getElementsByName("HandleCheckboxSubCategory");
		const showCreateSubCategory = document.getElementById("subcategory-content");
		if (document.getElementById(e.target.id).checked) {
			setInput((prev) => ({
				...prev,
				Category: e.target.id,
			}));
			const a = document.getElementsByClassName("Create-SubCategory");
			for (let i = 0; i < a.length; i++) {
				a[i].style.display = "none";
				showCreateSubCategory.style.display = "block";
			}
			for (let i = 0; i < ele.length; i++) {
				ele[i].checked = false;
				document.getElementById(e.target.id).checked = true;
				for (let i = 0; i < eleSubCategory.length; i++) {
					eleSubCategory[i].checked = false;
				}
			}
		} else {
			setInput((prev) => ({
				...prev,
				Category: "",
			}));
		}
	};

	const handleChangeSubCategory = (e) => {
		const ele = document.getElementsByName("HandleCheckboxSubCategory");
		// const showCreateSubCategory = document.getElementById(e.target.id + "-Create-SubCategory");
		// document.getElementById(e.target.id).checked === true
		// 	? (showCreateSubCategory.style.display = "block")
		// 	: (showCreateSubCategory.style.display = "none");
		if (document.getElementById(e.target.id).checked) {
			setInput((prev) => ({
				...prev,
				SubCategoryId: e.target.id.match(/(\d+)/)[0],
			}));
			// const a = document.getElementsByClassName("Create-SubCategory");
			// for (let i = 0; i < a.length; i++) {
			// 	a[i].style.display = "none";
			// 	showCreateSubCategory.style.display = "block";
			// }
			for (let i = 0; i < ele.length; i++) {
				ele[i].checked = false;
				document.getElementById(e.target.id).checked = true;
			}
		} else {
			setInput((prev) => ({
				...prev,
				SubCategoryId: "",
			}));
		}
	};

	const handleSubmit = async () => {
		if (input.Title === "" && input.Description === "" && input.Editor === "" && input.Category === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else if (input.Title === "" || input.Description === "" || input.Editor === "" || input.Category === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.Title === "" ? "عنوان خبر، " : ""}${
				input.Description === "" ? "توضیح کوتاه، " : ""
			}${input.Editor === "" ? "متن خبر، " : ""}${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else {
			try {
				await AxiosInstance({
					method: "post",
					url: "news/create",
					data: input,
					withCredentials: true,
				})
					.then((success) => {
						const showWarning = document.getElementById("submit-warning");
						showWarning.style.display = "flex";
						showWarning.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
						setTimeout(() => {
							showWarning.style.display = "none";
						}, 5000);
					})
					.catch((err) => {
						console.log(err.response.data);
						const showWarning = document.getElementById("submit-warning");
						showWarning.style.display = "flex";
						showWarning.innerHTML = `<p style="color: red;">${
							err.response.data.message === undefined
								? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}`
								: err.response.data.message
						}</p>`;
						setTimeout(() => {
							showWarning.style.display = "none";
						}, 5000);
					});
			} catch (error) {
				const showWarning = document.getElementById("submit-warning");
				showWarning.style.display = "flex";
				showWarning.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
				setTimeout(() => {
					showWarning.style.display = "none";
				}, 5000);
			}
		}
	};

	const [Categories, setCategories] = useState({
		GetCategories: [
			{ id: "politic", name: "سیاست" },
			{ id: "economy", name: "اقتصاد" },
			{ id: "social", name: "جامعه" },
			{ id: "sport", name: "ورزش" },
			{ id: "local", name: "بومی" },
		],
		GetSubCategories: [],
	});
	const [valueSubCategory, setValueSubCategory] = useState({
		SubCategory: "",
		Category: "",
	});

	useEffect(() => {
		const k = async () => {
			await AxiosInstance({
				method: "get",
				url: "news/subcategory/get-all",
				withCredentials: true,
			})
				.then((success) => {
					setCategories((prev) => ({
						...prev,
						GetSubCategories: success.data.body,
					}));
				})
				.catch((e) => {
					console.log(e.response.data.message);
				});
		};
		k();
	}, []);

	const handelChangeSubCategory = (e) => {
		setValueSubCategory((prev) => ({
			...prev,
			Category: e.target.id,
			SubCategory: e.target.value,
		}));
	};
	//

	const submitSubCategoryName = async (e) => {
		e.preventDefault();
		try {
			await AxiosInstance({
				method: "post",
				url: `news/create-subcategory?Category=${valueSubCategory.Category}&subcategory=${valueSubCategory.SubCategory}`,
				withCredentials: true,
			})
				.then((success) => {
					setCategories((prev) => ({
						...prev,
						GetSubCategories: success.data.body,
					}));
				})
				.catch((err) => {
					const showWarningById = document.getElementById(e.target.id + "1");
					const showWarningByClass = document.getElementsByClassName("ShowWarningSubCategory");
					showWarningById.style.visibility = "visible";
					for (let i = 0; i < showWarningByClass.length; i++) {
						showWarningByClass[i].innerHTML = err.response.data.message;
						setTimeout(() => {
							showWarningById.style.visibility = "hidden";
						}, 2000);
					}
				});
			document.querySelector(".input-subcategory").value = "";
		} catch (error) {
			console.log(error);
		}
	};
	//
	const [GetCategoriesId, SetGetCategoriesId] = useState({
		GetCategoryId: null,
		SetGetSubCategoryId: null,
	});

	//
	const handleDeletedSubCategory = async (Deleted) => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `news/dele-subcategory?id=${Deleted.target.id}`,
				withCredentials: true,
			})
				.then((success) => {
					document.getElementById("warning-delete-SubCategory").style.display = "none";
					setCategories((prev) => ({
						...prev,
						GetSubCategories: success.data.body,
					}));
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteSubCategory = async (Delete) => {
		SetGetCategoriesId((prev) => ({
			...prev,
			SetGetSubCategoryId: Delete.target.id,
		}));
		document.getElementById("warning-delete-SubCategory").style.display = "flex";
		document.getElementById(
			"deleted-SubCategory"
		).innerHTML = `آیا میخواهید دسته فرزند <span style="color:red;">${Delete.target.name}</span> را حذف کنید ؟ <br> <span  style="color:red;">این کار خبرهای زیر مجموعه ${Delete.target.name} را به لیست اخبار بدون دسته منتقل می کند !</span>`;
	};
	const handleCancelDeleSubCategory = async () => {
		document.getElementById("warning-delete-SubCategory").style.display = "none";
	};
	//
	// const HandelNewsStatus = async () => {
	// 	document.getElementById("release").style.pointerEvents = "none";
	// 	if (input.Title === "" && input.Description === "" && input.Editor === "" && input.CategoryId === "") {
	// 		const showWarning = document.getElementById("submit-warning");
	// 		showWarning.style.display = "flex";
	// 		showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
	// 		setTimeout(() => {
	// 			showWarning.style.display = "none";
	// 		}, 5000);
	// 	} else if (input.Title === "" || input.Description === "" || input.Editor === "" || input.Category === "") {
	// 		const showWarning = document.getElementById("submit-warning");
	// 		showWarning.style.display = "flex";
	// 		showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.Title === "" ? "عنوان خبر، " : ""}${
	// 			input.Description === "" ? "توضیح کوتاه، " : ""
	// 		}${input.Editor === "" ? "متن خبر، " : ""}${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
	// 		setTimeout(() => {
	// 			showWarning.style.display = "none";
	// 		}, 5000);
	// 	} else {
	// 		try {
	// 			await AxiosInstance({
	// 				method: "post",
	// 				url: "news/create",
	// 				data: input,
	// 				withCredentials: true,
	// 			})
	// 				.then((success) => {
	// 					const showWarning = document.getElementById("submit-warning");
	// 					showWarning.style.display = "flex";
	// 					showWarning.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
	// 					setTimeout(() => {
	// 						showWarning.style.display = "none";
	// 					}, 5000);
	// 				})
	// 				.catch((err) => {
	// 					console.log(err.response.data);
	// 					const showWarning = document.getElementById("submit-warning");
	// 					showWarning.style.display = "flex";
	// 					showWarning.innerHTML = `<p style="color: red;">${
	// 						err.response.data.message === undefined
	// 							? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}`
	// 							: err.response.data.message
	// 					}</p>`;
	// 					setTimeout(() => {
	// 						showWarning.style.display = "none";
	// 					}, 5000);
	// 				});
	// 		} catch (error) {
	// 			const showWarning = document.getElementById("submit-warning");
	// 			showWarning.style.display = "flex";
	// 			showWarning.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
	// 			setTimeout(() => {
	// 				showWarning.style.display = "none";
	// 			}, 5000);
	// 		}
	// 	}
	// };

	return (
		<>
			<div className="news-create-admin">
				<form id="loginForm" className="input-news-admin">
					<label htmlFor="Titer">تیتر خبر :</label>
					<input
						type="text"
						id="Titer"
						name="Titer"
						autoComplete="off"
						placeholder="مسئول اداره امور خبرنگاران ؛"
						onChange={handelChange}
					/>
					<label htmlFor="Title">عنوان خبر :</label>
					<input
						type="text"
						id="Title"
						name="Title"
						autoComplete="off"
						placeholder="جهان بینی خبرنگاران، در حوزه رسانه ها مسئله ای بسیار مهم است ..."
						onChange={handelChange}
					/>
					<label htmlFor="Description">توضیح کوتاه :</label>
					<input
						type="text"
						id="Description"
						name="Description"
						autoComplete="off"
						placeholder="مسئول محترم اداره امور خبرنگاران گفت؛ خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
						onChange={handelChange}
					/>

					{/*for more abut editor please see https://www.tiny.cloud/docs/tinymce/latest/ */}

					<label htmlFor="TextEditor">متن خبر :</label>
					<Editor
						tinymceScriptSrc="/tinymce/tinymce.min.js"
						onEditorChange={handelEditorChange}
						init={{
							width: "80%",
							height: "100vh",
							auto_focus: true,
							placeholder: "تایپ کردن ...",
							license_key: "gpl",
							language_url: "/tinymce/fa.js",
							language: "fa",
							image_advtab: true,
							plugins: [
								"autosave", // it required for 'restoredraft plugin'
								"anchor",
								"autolink",
								"charmap",
								"codesample",
								"code",
								"fullscreen",
								"help",
								"image",
								"insertdatetime",
								"link",
								"lists", // it required for 'numlist bullist plugin , and both only setting to toolbar'
								"media",
								"preview",
								"searchreplace",
								"table",
								"visualblocks",
								"accordion",
								"directionality", // it required for 'ltr rtl plugin'
								"emoticons",
								"advlist", //it is to listing both "numlist bullist plugin" in toolbar
								"nonbreaking",
								"pagebreak",
								// "quickbars", // for more abut it please see https://www.tiny.cloud/docs/tinymce/latest/quickbars/
								// "save",
								"visualchars",
								"wordcount",
							],
							toolbar: [
								"ltr rtl preview undo redo blocks fontfamily fontsize bold italic underline strikethrough link image media table mergetags addcomment showcomments spellcheckdialog a11ycheck typography align lineheight checklist numlist bullist indent outdent emoticons charmap removeformat",
							],
							images_upload_url: "http://localhost:5000/upload",
							automatic_uploads: true,
						}}
					/>

					<div className="Category">
						<div className="title-category">
							<h2>مربوط به دسته</h2>
						</div>
						<div className="container-category">
							<div className="server-category">
								{/* receive Categories from server */}
								<div className="content-add-category">
									{Categories.GetCategories.length !== 0 &&
										Categories.GetCategories.map((Category) => {
											return (
												<div key={Category.id} className="add-Category">
													<label htmlFor={Category.id}>
														<input
															name="HandleCheckboxCategory"
															onChange={handleChangeCategory}
															type="checkbox"
															id={Category.id}
															className="button-category"
														/>
														{Category.name}
													</label>
												</div>
											);
										})}
								</div>
								<div id="subcategory-content" className="Create-SubCategory">
									<h3>
										{(Categories.GetSubCategories.Count?.[input.Category] === 0 &&
											`${
												(input.Category === "politic" && "سیاست") ||
												(input.Category === "economy" && "اقتصاد") ||
												(input.Category === "social" && "جامعه") ||
												(input.Category === "sport" && "ورزش") ||
												(input.Category === "local" && "بومی")
											}، هیچ زیر دسته ای ندارد!`) ||
											` افزودن دسته جدید برای ${
												(input.Category === "politic" && "سیاست") ||
												(input.Category === "economy" && "اقتصاد") ||
												(input.Category === "social" && "جامعه") ||
												(input.Category === "sport" && "ورزش") ||
												(input.Category === "local" && "بومی") ||
												"..."
											} `}
									</h3>
									<div className="ddd">
										{Categories.GetSubCategories.ShowAllSubCategory?.map((SubCategory) => {
											return (
												SubCategory.Category === input.Category && (
													<div key={SubCategory.id + "SubCategory"} className="btn-checkbox-subC">
														<label htmlFor={SubCategory.id + "SubCategory"} className="content-checkbox">
															<input
																name="HandleCheckboxSubCategory"
																onChange={handleChangeSubCategory}
																type="checkbox"
																id={SubCategory.id + "SubCategory"}
																className="button-category"
															/>
															{SubCategory.SubCategory}
														</label>
														<button
															name={SubCategory.SubCategory}
															id={SubCategory.id}
															onClick={handleDeleteSubCategory}
															type="button"
															className="fa fa-trash"
														></button>
													</div>
												)
											);
										})}
									</div>
									<div className="branch-Create-content">
										<span
											id={input.Category + "test1"}
											name={input.Category + "ShowWarningSubCategory"}
											className="ShowWarningSubCategory"
										></span>
										<div className="btn-create-sub-category">
											<input id={input.Category} onChange={handelChangeSubCategory} className="input-subcategory" type="input" />
											<input id={input.Category + "test"} onClick={submitSubCategoryName} type="button" value={"+"} />
										</div>
									</div>
								</div>
							</div>
							<div className="container-columns">
								<div className="disable-comment">
									<input
										onClick={() => {
											setInput((prev) => ({
												...prev,
												Comment_Status: document.getElementById("disable-comment").checked,
											}));
										}}
										type="checkbox"
										id="disable-comment"
									/>
									<label htmlFor="disable-comment">بستن اظهار نظر</label>
								</div>
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-to-slider-main-page">
									<input
										type="checkbox"
										id="add-to-slider-main-page"
										onChange={(e) => {
											if (document.getElementById("add-to-slider-main-page").checked) {
												document.getElementById("add-to-chosen-main-page").checked = false;
												document.getElementById("add-to-slider-self-news").checked = true;
												document.getElementById("add-to-main-page-note").checked = false;
												document.getElementById("add-to-chosen-self-news").checked = false;
												document.getElementById("add-to-self-page-note").checked = false;
											}
											setInput((prev) => ({
												...prev,
												SubPageSlider: document.getElementById(e.target.id).checked,
											}));
										}}
									/>
									<label htmlFor="add-to-slider-main-page">اسلایدر صفحه اصلی</label>
									<br />
								</div>
								<div className="add-to-slider-self-news">
									<input
										onChange={(e) => {
											if (document.getElementById("add-to-slider-self-news").checked) {
												document.getElementById("add-to-chosen-main-page").checked = false;
												document.getElementById("add-to-slider-main-page").checked = false;
												document.getElementById("add-to-main-page-note").checked = false;
												document.getElementById("add-to-chosen-self-news").checked = false;
												document.getElementById("add-to-self-page-note").checked = false;
											} else {
												document.getElementById("add-to-slider-main-page").checked = false;
											}
											setInput((prev) => ({ ...prev, MainPageSlider: document.getElementById(e.target.id).checked }));
										}}
										type="checkbox"
										id="add-to-slider-self-news"
									/>
									<label htmlFor="add-to-slider-self-news">
										{`اسلایدر صفحه ${
											(input.Category === "politic" && "سیاست") ||
											(input.Category === "economy" && "اقتصاد") ||
											(input.Category === "social" && "جامعه") ||
											(input.Category === "sport" && "ورزش") ||
											(input.Category === "local" && "بومی") ||
											"..."
										} `}
									</label>
								</div>
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-to-chosen-main-page">
									<input
										onClick={(e) => {
											if (document.getElementById("add-to-chosen-main-page").checked) {
												document.getElementById("add-to-slider-self-news").checked = false;
												document.getElementById("add-to-slider-main-page").checked = false;
												document.getElementById("add-to-main-page-note").checked = false;
												document.getElementById("add-to-chosen-self-news").checked = true;
												document.getElementById("add-to-self-page-note").checked = false;
											}
											setInput((prev) => ({
												...prev,
												SubPageColumn: document.getElementById(e.target.id).checked,
											}));
										}}
										type="checkbox"
										id="add-to-chosen-main-page"
									/>
									<label htmlFor="add-to-chosen-main-page">منتخب صفحه اصلی</label>
								</div>
								<div className="add-to-chosen-self-news">
									<input
										onChange={(e) => {
											if (document.getElementById("add-to-chosen-self-news").checked) {
												document.getElementById("add-to-slider-self-news").checked = false;
												document.getElementById("add-to-slider-main-page").checked = false;
												document.getElementById("add-to-main-page-note").checked = false;
												document.getElementById("add-to-chosen-main-page").checked = false;
												document.getElementById("add-to-self-page-note").checked = false;
											} else {
												document.getElementById("add-to-chosen-main-page").checked = false;
											}
											setInput((prev) => ({ ...prev, MainPageChoice: document.getElementById(e.target.id).checked }));
										}}
										type="checkbox"
										id="add-to-chosen-self-news"
									/>
									<label htmlFor="add-to-chosen-self-news">
										{`منتخب صفحه ${
											(input.Category === "politic" && "سیاست") ||
											(input.Category === "economy" && "اقتصاد") ||
											(input.Category === "social" && "جامعه") ||
											(input.Category === "sport" && "ورزش") ||
											(input.Category === "local" && "بومی") ||
											"..."
										} `}
									</label>
								</div>
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-to-main-page-note">
									<input
										onChange={(e) => {
											if (document.getElementById("add-to-main-page-note").checked) {
												document.getElementById("add-to-slider-self-news").checked = false;
												document.getElementById("add-to-slider-main-page").checked = false;
												document.getElementById("add-to-chosen-self-news").checked = false;
												document.getElementById("add-to-chosen-main-page").checked = false;
												document.getElementById("add-to-self-page-note").checked = false;
											}
											setInput((prev) => ({ ...prev, SubNote: document.getElementById(e.target.id).checked }));
										}}
										type="checkbox"
										id="add-to-main-page-note"
									/>
									<label htmlFor="add-to-main-page-note">یادداشت در صفحه اصلی</label>
								</div>
								<div className="add-to-self-page-note">
									<input
										onChange={(e) => {
											if (document.getElementById("add-to-self-page-note").checked) {
												document.getElementById("add-to-slider-self-news").checked = false;
												document.getElementById("add-to-slider-main-page").checked = false;
												document.getElementById("add-to-main-page-note").checked = false;
												document.getElementById("add-to-chosen-self-news").checked = false;
												document.getElementById("add-to-chosen-main-page").checked = false;
											}
											setInput((prev) => ({ ...prev, MainNote: document.getElementById(e.target.id).checked }));
										}}
										type="checkbox"
										id="add-to-self-page-note"
									/>
									<label htmlFor="add-to-self-page-note">
										{`یادداشت در صفحه ${
											(input.Category === "politic" && "سیاست") ||
											(input.Category === "economy" && "اقتصاد") ||
											(input.Category === "social" && "جامعه") ||
											(input.Category === "sport" && "ورزش") ||
											(input.Category === "local" && "بومی") ||
											"..."
										} `}
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="buttons-create-news">
						<Link to={"/lord"}>انصراف</Link>
						<div id="submit-warning"></div>
						<button id="release" onClick={handleSubmit} type="button">
							انتشار
						</button>
					</div>
				</form>
			</div>
			{/* delete sub category */}
			<div id="warning-delete-SubCategory" className="warning-delete">
				<div id="deleted-SubCategory"></div>
				<div>
					<button
						type="button"
						id={GetCategoriesId.SetGetSubCategoryId}
						onClick={handleDeletedSubCategory}
						className="btn-deleted-SubCategory"
					>
						حذف
					</button>
					<button type="button" className="btn-cancel-SubCategory" onClick={handleCancelDeleSubCategory}>
						لغو
					</button>
				</div>
			</div>
		</>
	);
};
