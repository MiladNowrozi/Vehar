import React, { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useLocation } from "react-router-dom";

import "./createnews.css";
import { AuthContext } from "../../../../../context/authContext";
import { AxiosInstance } from "../../../../../axiosInstance.js";
import Upload from "./upload/Upload.jsx";

export const CreateNews = () => {
	const NewsId = useLocation().search;

	const { CurrentUser } = useContext(AuthContext);

	const [input, setInput] = useState({
		id: null,
		News_Titre: "",
		News_Title: "",
		News_Describe: "",
		News_Content: "",
		Comment_Status: false,
		MainPageSlider: false,
		MainPageColumn: false,
		SubPageSlider: false,
		SubPageColumn: false,
		MainNote: false,
		SubNote: false,
		MainTicker: false,
		SubTicker: false,
		Category: "",
		SubCategoryId: null,
		createdAt: null,
		updatedAt: null,
		AuthorId: CurrentUser.Info.Id,
	});

	useEffect(() => {
		const FetchData = async () => {
			try {
				await AxiosInstance({
					method: "get",
					url: `/news/get${NewsId}&userId=${CurrentUser.Info ? CurrentUser.Info.Id : 0}`,
				})
					.then((success) => {
						// setEditNews(success.data.body.GetSelectedNews);
						setInput(success.data.body.GetSelectedNews);
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		FetchData();
	}, [NewsId, CurrentUser]);
	console.log(input);

	const handleSubmit = async () => {
		if (
			input.News_Title === "" &&
			input.News_Describe === "" &&
			input.News_Content === "" &&
			input.Category === ""
		) {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else if (
			input.News_Title === "" ||
			input.News_Describe === "" ||
			input.News_Content === "" ||
			input.Category === ""
		) {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${
				input.News_Title === "" ? "عنوان خبر، " : ""
			}${input.News_Describe === "" ? "توضیح کوتاه، " : ""}${
				input.News_Content === "" ? "متن خبر، " : ""
			}${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else {
			try {
				await AxiosInstance({
					method: NewsId ? "put" : "post",
					url: NewsId ? "news/edit" : "news/create",
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
	// const handleSubmitEdit = async () => {
	// 	if (
	// 		editNews.News_Titre === "" &&
	// 		editNews.News_Describe === "" &&
	// 		editNews.News_Content === "" &&
	// 		editNews.Category === ""
	// 	) {
	// 		const showWarning = document.getElementById("submit-warning");
	// 		showWarning.style.display = "flex";
	// 		showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
	// 		setTimeout(() => {
	// 			showWarning.style.display = "none";
	// 		}, 5000);
	// 	} else if (
	// 		editNews.News_Title === "" ||
	// 		editNews.News_Describe === "" ||
	// 		editNews.News_Content === "" ||
	// 		editNews.Category === ""
	// 	) {
	// 		const showWarning = document.getElementById("submit-warning");
	// 		showWarning.style.display = "flex";
	// 		showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${
	// 			input.News_Title === "" ? "عنوان خبر، " : ""
	// 		}${input.News_Describe === "" ? "توضیح کوتاه، " : ""}${
	// 			input.News_Content === "" ? "متن خبر، " : ""
	// 		}${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
	// 		setTimeout(() => {
	// 			showWarning.style.display = "none";
	// 		}, 5000);
	// 	} else {
	// 		try {
	// 			await AxiosInstance({
	// 				method: "put",
	// 				url: "news/edit",
	// 				data: editNews,
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

	//

	const submitSubCategoryName = async (e) => {
		e.preventDefault();
		if (CurrentUser.Info.Role === "Lord") {
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
		} else {
			document.getElementById("warning-add-subCategory").style.display = "block";
			document.querySelector(".input-subcategory").value = "";
			setTimeout(() => {
				document.getElementById("warning-add-subCategory").style.display = "none";
			}, 3000);
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
	//
	const fa1 = "حداکثر تیتر مجاز، 50 کاراکتر";
	const fa2 = "حداکثر عنوان مجاز، 100 کاراکتر";
	const fa3 = "حداکثر توضیح کوتاه مجاز، 100 کاراکتر";
	const fa4 = "فقط مالک می تواند دسته اضافه کند .";

	const [isFilePickerOpen, setFilePickerOpen] = useState(false);

	const editorRef = useRef(null);

	return (
		<>
			<div className="news-create-admin">
				<form id="loginForm" className="input-news-admin">
					<label htmlFor="Titer">
						تیتر خبر :
						{input.News_Titre.length >= 50 && <span className="limit-characters">{fa1}</span>}
					</label>
					<input
						type="text"
						id="Titer"
						name="Titer"
						value={input.News_Titre}
						autoComplete="off"
						placeholder="مسئول اداره امور خبرنگاران ؛"
						onChange={(e) =>
							setInput({
								...input,
								News_Titre: e.target.value.length <= 50 ? e.target.value : input.News_Titre,
							})
						}
					/>
					<label htmlFor="Title">
						عنوان خبر :
						{input.News_Title.length >= 100 && <span className="limit-characters">{fa2}</span>}
					</label>
					<input
						type="text"
						id="Title"
						name="Title"
						value={input.News_Title}
						autoComplete="off"
						placeholder="جهان بینی خبرنگاران، در حوزه رسانه ها مسئله ای بسیار مهم است ..."
						onChange={(e) =>
							setInput({
								...input,
								News_Title: e.target.value.length <= 100 ? e.target.value : input.News_Title,
							})
						}
					/>
					<label htmlFor="Description">
						توضیح کوتاه :
						{input.News_Describe.length >= 350 && <span className="limit-characters">{fa3}</span>}
					</label>
					<input
						type="text"
						id="Description"
						name="Description"
						value={input.News_Describe}
						autoComplete="off"
						placeholder="مسئول محترم اداره امور خبرنگاران گفت؛ خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
						onChange={(e) =>
							setInput({
								...input,
								News_Describe: e.target.value.length <= 350 ? e.target.value : input.News_Describe,
							})
						}
					/>

					{/*for more abut editor please see https://www.tiny.cloud/docs/tinymce/latest/ */}

					<label htmlFor="TextEditor">متن خبر :</label>
					<Editor
						tinymceScriptSrc="/tinymce/tinymce.min.js"
						onInit={(evt, editor) => (editorRef.current = editor)}
						value={input.News_Content}
						onEditorChange={(e) => setInput({ ...input, News_Content: e })}
						init={{
							width: "80%",
							height: "100vh",
							auto_focus: true,
							placeholder: "تایپ کردن ...",
							license_key: "gpl",
							language_url: "/tinymce/fa.js",
							language: "fa",
							image_advtab: true,
							toolbar_mode: "wrap",
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
							mobile: {
								menubar: true,
							},
							relative_urls: false,
							remove_script_host: false,
							convert_urls: false,
							automatic_uploads: true,
							file_picker_callback: function (callback) {
								setFilePickerOpen(true);
								document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display =
									"none"; // this is a class of Editor TinyMce for closes upload image window after clicking
							},
						}}
					/>
					{isFilePickerOpen && (
						<div className="editor-select-images">
							<div className="section-files">
								{<Upload editorRef={editorRef} setFilePickerOpen={setFilePickerOpen} />}
							</div>
						</div>
					)}
					<div className="Category">
						<div className="title-category">
							<h2>مربوط به دسته</h2>
						</div>
						<div className="container-category">
							<div className="server-category">
								{/* receive Categories from server */}
								<div className="content-add-category">
									{Categories.GetCategories.map((Category, i) => {
										return (
											<div key={i} className="add-Category">
												<label htmlFor={Category.id}>
													<input
														name="HandleCheckboxCategory"
														onChange={(e) =>
															setInput({
																...input,
																Category: e.target.checked === true && Category.id,
															})
														}
														type="radio"
														id={Category.id}
														className="button-category"
														checked={input.Category === Category.id}
													/>
													{Category.name}
												</label>
											</div>
										);
									})}
								</div>
								<div id="subcategory-content" className="Create-SubCategory">
									<h3>
										{Categories.GetSubCategories.Count?.[input.Category] === undefined
											? "لطفاٌ یک دسته را انتخاب کنید ."
											: ` افزودن دسته جدید برای ${
													(input.Category === "politic" && "سیاست") ||
													(input.Category === "economy" && "اقتصاد") ||
													(input.Category === "social" && "جامعه") ||
													(input.Category === "sport" && "ورزش") ||
													(input.Category === "local" && "بومی")
											  }`}
									</h3>
									<div className="ddd">
										{Categories.GetSubCategories.ShowAllSubCategory?.map((SubCategory, i) => {
											return (
												SubCategory.Category === input.Category && (
													<div key={i} className="btn-checkbox-subC">
														<label
															htmlFor={SubCategory.id + "SubCategory"}
															className="content-checkbox"
														>
															<input
																name="HandleCheckboxSubCategory"
																checked={input.SubCategoryId === SubCategory.id ? true : false}
																onChange={(e) =>
																	setInput({
																		...input,
																		SubCategoryId: e.target.checked ? SubCategory.id : false,
																	})
																}
																type="radio"
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
											<input
												id={input.Category}
												onChange={(e) =>
													setValueSubCategory((prev) => ({
														...prev,
														Category: e.target.id,
														SubCategory: e.target.value,
													}))
												}
												className="input-subcategory"
												type="input"
											/>
											<input
												id={input.Category + "test"}
												onClick={submitSubCategoryName}
												type="button"
												value={"+"}
											/>
											<span
												style={{ display: "none" }}
												id="warning-add-subCategory"
												className="warning-add-subCategory"
											>
												{fa4}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="container-columns">
								<div className="disable-comment">
									<input
										onChange={(e) => {
											setInput({
												...input,
												Comment_Status: e.target.checked,
											});
										}}
										type="checkbox"
										checked={input.Comment_Status}
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
											setInput({
												...input,
												MainPageSlider: true,
												MainPageColumn: false,
												SubPageColumn: false,
												SubPageSlider: e.target.checked,
												MainNote: false,
												SubNote: false,
												MainTicker: false,
												SubTicker: false,
											});
										}}
										checked={input.SubPageSlider}
									/>
									<label htmlFor="add-to-slider-main-page">اسلایدر صفحه اصلی</label>
									<br />
								</div>
								<div className="add-to-slider-self-news">
									<input
										onChange={(e) => {
											setInput({
												...input,
												MainPageSlider: e.target.checked,
												MainPageColumn: false,
												SubPageColumn: false,
												SubPageSlider: false,
												MainNote: false,
												SubNote: false,
												MainTicker: false,
												SubTicker: false,
											});
										}}
										type="checkbox"
										id="add-to-slider-self-news"
										checked={input.MainPageSlider}
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
										onChange={(e) => {
											setInput({
												...input,
												MainPageSlider: false,
												MainPageColumn: true,
												SubPageColumn: e.target.checked,
												SubPageSlider: false,
												MainNote: false,
												SubNote: false,
												MainTicker: false,
												SubTicker: false,
											});
										}}
										checked={input.SubPageColumn}
										type="checkbox"
										id="add-to-chosen-main-page"
									/>
									<label htmlFor="add-to-chosen-main-page">منتخب صفحه اصلی</label>
								</div>
								<div className="add-to-chosen-self-news">
									<input
										onChange={(e) => {
											setInput({
												...input,
												MainPageSlider: false,
												MainPageColumn: e.target.checked,
												SubPageColumn: false,
												SubPageSlider: false,
												MainNote: false,
												SubNote: false,
												MainTicker: false,
												SubTicker: false,
											});
										}}
										type="checkbox"
										checked={input.MainPageColumn}
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
											setInput({
												...input,
												MainPageSlider: false,
												MainPageColumn: false,
												SubPageColumn: false,
												SubPageSlider: false,
												MainNote: false,
												SubNote: e.target.checked,
												MainTicker: false,
												SubTicker: false,
											});
										}}
										type="checkbox"
										id="add-to-main-page-note"
										checked={input.SubNote}
									/>
									<label htmlFor="add-to-main-page-note">یادداشت در صفحه اصلی</label>
								</div>
								<div className="add-to-self-page-note">
									<input
										onChange={(e) => {
											setInput({
												...input,
												MainPageSlider: false,
												MainPageColumn: false,
												SubPageColumn: false,
												SubPageSlider: false,
												MainNote: e.target.checked,
												SubNote: false,
												MainTicker: false,
												SubTicker: false,
											});
										}}
										type="checkbox"
										id="add-to-self-page-note"
										checked={input.MainNote}
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
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-main-ticker-news">
									<input
										onChange={(e) => {
											setInput({
												...input,
												MainPageSlider: false,
												MainPageColumn: false,
												SubPageColumn: false,
												SubPageSlider: false,
												MainNote: false,
												SubNote: false,
												MainTicker: true,
												SubTicker: e.target.checked,
											});
										}}
										type="checkbox"
										id="add-main-ticker-news"
										checked={input.SubTicker}
									/>
									<label htmlFor="add-main-ticker-news">تیکر صفحه اصلی</label>
								</div>
								<div className="add-sub-ticker-news">
									<input
										onChange={(e) => {
											setInput({
												...input,
												MainPageSlider: false,
												MainPageColumn: false,
												SubPageColumn: false,
												SubPageSlider: false,
												MainNote: false,
												SubNote: false,
												MainTicker: e.target.checked,
												SubTicker: false,
											});
										}}
										type="checkbox"
										id="add-sub-ticker-news"
										checked={input.MainTicker}
									/>
									<label htmlFor="add-sub-ticker-news">
										{`تیکر صفحه ${
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
						<Link to={"/admin"}>انصراف</Link>
						<div id="submit-warning"></div>
						<button id="release" onClick={handleSubmit} type="button">
							{NewsId ? "ویرایش" : "انتشار"}
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
					<button
						type="button"
						className="btn-cancel-SubCategory"
						onClick={() =>
							(document.getElementById("warning-delete-SubCategory").style.display = "none")
						}
					>
						لغو
					</button>
				</div>
			</div>
		</>
	);
};
