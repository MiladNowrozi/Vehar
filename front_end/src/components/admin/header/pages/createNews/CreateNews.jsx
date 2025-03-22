import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useLocation } from "react-router-dom";

import "./createnews.css";
import { AuthContext } from "../../../../../context/authContext";
import { AxiosInstance } from "../../../../../axiosInstance.js";

export const CreateNews = () => {
	const NewsId = useLocation().search;
	const [editNews, setEditNews] = useState([]);

	const { CurrentUser } = useContext(AuthContext);

	const [input, setInput] = useState({
		id: null,
		News_Titre: "",
		News_Title: "",
		News_Describe: "",
		News_Content: "",
		Default_Image: null,
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
					url: `/news/get${NewsId}&userId=${CurrentUser ? CurrentUser.Info.Id : 0}`,
				})
					.then((success) => {
						setEditNews(success.data.body.GetSelectedNews);
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		FetchData();
	}, [NewsId]);

	// const handelChange = (e) => {
	// 	setInput((prev) => ({
	// 		...prev,
	// 		[e.target.name]: e.target.value,
	// 		AuthorId: CurrentUser && CurrentUser.Info.Role === "Lord" ? CurrentUser.Info.id : navigate("/login-register"),
	// 	}));
	// };

	// const handelEditorChange = (e) => {
	// 	const imgRegex = /<img\s+[^>]*src="([^"]*)"/gi;
	// 	const imageUrls = [];
	// 	let match;
	// 	while ((match = imgRegex.exec(e)) !== null) {
	// 		imageUrls.push(match[1]);
	// 	}

	// 	setInput((prev) => ({
	// 		...prev,
	// 		Editor: e,
	// 		Images: imageUrls.toString(),
	// 	}));
	// };

	// const handleChangeCategory = (e) => {
	// 	const ele = document.getElementsByName("HandleCheckboxCategory");
	// 	const eleSubCategory = document.getElementsByName("HandleCheckboxSubCategory");
	// 	const showCreateSubCategory = document.getElementById("subcategory-content");
	// 	if (document.getElementById(e.target.id).checked) {
	// 		setInput((prev) => ({
	// 			...prev,
	// 			Category: e.target.id,
	// 		}));
	// 		const a = document.getElementsByClassName("Create-SubCategory");
	// 		for (let i = 0; i < a.length; i++) {
	// 			a[i].style.display = "none";
	// 			showCreateSubCategory.style.display = "block";
	// 		}
	// 		for (let i = 0; i < ele.length; i++) {
	// 			ele[i].checked = false;
	// 			document.getElementById(e.target.id).checked = true;
	// 			for (let i = 0; i < eleSubCategory.length; i++) {
	// 				eleSubCategory[i].checked = false;
	// 			}
	// 		}
	// 	} else {
	// 		setInput((prev) => ({
	// 			...prev,
	// 			Category: "",
	// 		}));
	// 	}
	// };
	// const handleChangeSubCategory = (e) => {
	// 	const ele = document.getElementsByName("HandleCheckboxSubCategory");
	// 	if (document.getElementById(e.target.id).checked) {
	// 		setInput((prev) => ({
	// 			...prev,
	// 			SubCategoryId: e.target.id.match(/(\d+)/)[0],
	// 		}));
	// 		for (let i = 0; i < ele.length; i++) {
	// 			ele[i].checked = false;
	// 			document.getElementById(e.target.id).checked = true;
	// 		}
	// 	} else {
	// 		setInput((prev) => ({
	// 			...prev,
	// 			SubCategoryId: "",
	// 		}));
	// 	}
	// };

	const handleSubmit = async () => {
		if (input.News_Title === "" && input.News_Describe === "" && input.News_Content === "" && input.Category === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else if (input.News_Title === "" || input.News_Describe === "" || input.News_Content === "" || input.Category === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.News_Title === "" ? "عنوان خبر، " : ""}${
				input.News_Describe === "" ? "توضیح کوتاه، " : ""
			}${input.News_Content === "" ? "متن خبر، " : ""}${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
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
							err.response.data.message === undefined ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}` : err.response.data.message
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
	const handleSubmitEdit = async () => {
		if (editNews.News_Titre === "" && editNews.News_Describe === "" && editNews.News_Content === "" && editNews.Category === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else if (editNews.News_Title === "" || editNews.News_Describe === "" || editNews.News_Content === "" || editNews.Category === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.News_Title === "" ? "عنوان خبر، " : ""}${
				input.News_Describe === "" ? "توضیح کوتاه، " : ""
			}${input.News_Content === "" ? "متن خبر، " : ""}${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else {
			try {
				await AxiosInstance({
					method: "put",
					url: "news/edit",
					data: editNews,
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
							err.response.data.message === undefined ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}` : err.response.data.message
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
	return (
		<>
			<div className="news-create-admin">
				<form id="loginForm" className="input-news-admin">
					<label htmlFor="Titer">
						تیتر خبر :
						{editNews.id
							? editNews.News_Titre.length >= 50 && <span className="limit-characters">{fa1}</span>
							: input.News_Titre.length >= 50 && <span className="limit-characters">{fa1}</span>}
					</label>
					<input
						type="text"
						id="Titer"
						name="Titer"
						value={editNews.id ? editNews.News_Titre : input.News_Titre}
						autoComplete="off"
						placeholder="مسئول اداره امور خبرنگاران ؛"
						onChange={(e) =>
							editNews.id
								? setEditNews({ ...editNews, News_Titre: e.target.value.length <= 50 ? e.target.value : editNews.News_Titre })
								: setInput({ ...input, News_Titre: e.target.value.length <= 50 ? e.target.value : input.News_Titre })
						}
					/>
					<label htmlFor="Title">
						عنوان خبر :
						{editNews.id
							? editNews.News_Title.length >= 100 && <span className="limit-characters">{fa2}</span>
							: input.News_Title.length >= 100 && <span className="limit-characters">{fa2}</span>}
					</label>
					<input
						type="text"
						id="Title"
						name="Title"
						value={editNews.id ? editNews.News_Title : input.News_Title}
						autoComplete="off"
						placeholder="جهان بینی خبرنگاران، در حوزه رسانه ها مسئله ای بسیار مهم است ..."
						onChange={(e) =>
							editNews.id
								? setEditNews({ ...editNews, News_Title: e.target.value.length <= 100 ? e.target.value : editNews.News_Title })
								: setInput({ ...input, News_Title: e.target.value.length <= 100 ? e.target.value : input.News_Title })
						}
					/>
					<label htmlFor="Description">
						توضیح کوتاه :
						{editNews.id
							? editNews.News_Describe.length >= 350 && <span className="limit-characters">{fa3}</span>
							: input.News_Describe.length >= 350 && <span className="limit-characters">{fa3}</span>}
					</label>
					<input
						type="text"
						id="Description"
						name="Description"
						value={editNews.id ? editNews.News_Describe : input.News_Describe}
						autoComplete="off"
						placeholder="مسئول محترم اداره امور خبرنگاران گفت؛ خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
						onChange={(e) =>
							editNews.id
								? setEditNews({ ...editNews, News_Describe: e.target.value.length <= 350 ? e.target.value : editNews.News_Describe })
								: setInput({ ...input, News_Describe: e.target.value.length <= 350 ? e.target.value : input.News_Describe })
						}
					/>
					{/*for more abut editor please see https://www.tiny.cloud/docs/tinymce/latest/ */}

					<label htmlFor="TextEditor">متن خبر :</label>
					<Editor
						tinymceScriptSrc="/tinymce/tinymce.min.js"
						value={editNews.id ? editNews.News_Content : input.News_Content}
						onEditorChange={(e) => (editNews.id ? setEditNews({ ...editNews, News_Content: e }) : setInput({ ...input, News_Content: e }))}
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
							automatic_uploads: true,
							// file_picker_callback: function (callback, value, meta) {
							// 	window.open("http://localhost:3000/admin/upload-files", "File Manager", "width=800,height=600");
							// 	window.addEventListener(
							// 		"message",
							// 		function (event) {
							// 			if (event.origin !== window.location.origin) return;
							// 			callback(event.data.url);
							// 		},
							// 		false
							// 	);
							// },
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
									{Categories.GetCategories.map((Category, i) => {
										return (
											<div key={i} className="add-Category">
												<label htmlFor={Category.id}>
													<input
														name="HandleCheckboxCategory"
														onChange={(e) =>
															editNews.id
																? setEditNews({ ...editNews, Category: e.target.checked === true && Category.id })
																: setInput({ ...input, Category: e.target.checked === true && Category.id })
														}
														type="radio"
														id={Category.id}
														className="button-category"
														checked={editNews.id ? editNews.Category === Category.id : input.Category === Category.id}
													/>
													{Category.name}
												</label>
											</div>
										);
									})}
								</div>
								<div id="subcategory-content" className="Create-SubCategory">
									<h3>
										{!editNews.id
											? Categories.GetSubCategories.Count?.[input.Category] === undefined
												? "لطفاٌ یک دسته را انتخاب کنید ."
												: ` افزودن دسته جدید برای ${
														(input.Category === "politic" && "سیاست") ||
														(input.Category === "economy" && "اقتصاد") ||
														(input.Category === "social" && "جامعه") ||
														(input.Category === "sport" && "ورزش") ||
														(input.Category === "local" && "بومی")
												  }`
											: ` افزودن دسته جدید برای ${
													(editNews.Category === "politic" && "سیاست") ||
													(editNews.Category === "economy" && "اقتصاد") ||
													(editNews.Category === "social" && "جامعه") ||
													(editNews.Category === "sport" && "ورزش") ||
													(editNews.Category === "local" && "بومی")
											  }`}
									</h3>
									<div className="ddd">
										{Categories.GetSubCategories.ShowAllSubCategory?.map((SubCategory, i) => {
											return editNews.id
												? SubCategory.Category === editNews.Category && (
														<div key={i} className="btn-checkbox-subC">
															<label htmlFor={SubCategory.id + "SubCategory"} className="content-checkbox">
																<input
																	checked={editNews.id ? editNews.subCategoryId === SubCategory.id : input.SubCategoryId === SubCategory.id}
																	onChange={(e) =>
																		editNews.id
																			? setEditNews({
																					...editNews,
																					subCategoryId: e.target.checked && SubCategory.id,
																			  })
																			: setInput({ ...input, SubCategoryId: e.target.checked && SubCategory.id })
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
												: SubCategory.Category === input.Category && (
														<div key={i} className="btn-checkbox-subC">
															<label htmlFor={SubCategory.id + "SubCategory"} className="content-checkbox">
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
												  );
										})}
									</div>
									<div className="branch-Create-content">
										<span
											id={editNews.id ? editNews.Category + "test1" : input.Category + "test1"}
											name={editNews.id ? editNews.Category + "ShowWarningSubCategory" : input.Category + "ShowWarningSubCategory"}
											className="ShowWarningSubCategory"
										></span>
										<div className="btn-create-sub-category">
											<input
												id={editNews.id ? editNews.Category : input.Category}
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
												id={editNews.id ? editNews.Category + "test" : input.Category + "test"}
												onClick={submitSubCategoryName}
												type="button"
												value={"+"}
											/>
											<span style={{ display: "none" }} id="warning-add-subCategory" className="warning-add-subCategory">
												{fa4}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="container-columns">
								<div className="disable-comment">
									<input
										onClick={(e) => {
											editNews.id
												? setEditNews({ ...editNews, Comment_Status: e.target.checked })
												: setInput({
														...input,
														Comment_Status: e.target.checked,
												  });
										}}
										type="checkbox"
										checked={editNews.Comment_Status ? editNews.Comment_Status : input.Comment_Status}
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
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: true,
														MainPageColumn: false,
														SubPageColumn: false,
														SubPageSlider: e.target.checked,
														MainNote: false,
														SubNote: false,
														MainTicker: false,
														SubTicker: false,
												  })
												: setInput({
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
										checked={editNews.SubPageSlider ? editNews.SubPageSlider : input.SubPageSlider}
									/>
									<label htmlFor="add-to-slider-main-page">اسلایدر صفحه اصلی</label>
									<br />
								</div>
								<div className="add-to-slider-self-news">
									<input
										onChange={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: e.target.checked,
														MainPageColumn: false,
														SubPageColumn: false,
														SubPageSlider: false,
														MainNote: false,
														SubNote: false,
														MainTicker: false,
														SubTicker: false,
												  })
												: setInput({
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
										checked={editNews.MainPageSlider ? editNews.MainPageSlider : input.MainPageSlider}
									/>
									<label htmlFor="add-to-slider-self-news">
										{!editNews.id
											? `اسلایدر صفحه ${
													(input.Category === "politic" && "سیاست") ||
													(input.Category === "economy" && "اقتصاد") ||
													(input.Category === "social" && "جامعه") ||
													(input.Category === "sport" && "ورزش") ||
													(input.Category === "local" && "بومی") ||
													"..."
											  } `
											: `اسلایدر صفحه ${
													(editNews.Category === "politic" && "سیاست") ||
													(editNews.Category === "economy" && "اقتصاد") ||
													(editNews.Category === "social" && "جامعه") ||
													(editNews.Category === "sport" && "ورزش") ||
													(editNews.Category === "local" && "بومی") ||
													"..."
											  } `}
									</label>
								</div>
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-to-chosen-main-page">
									<input
										onClick={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: false,
														MainPageColumn: true,
														SubPageColumn: e.target.checked,
														SubPageSlider: false,
														MainNote: false,
														SubNote: false,
														MainTicker: false,
														SubTicker: false,
												  })
												: setInput({
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
										checked={editNews.SubPageColumn ? editNews.SubPageColumn : input.SubPageColumn}
										type="checkbox"
										id="add-to-chosen-main-page"
									/>
									<label htmlFor="add-to-chosen-main-page">منتخب صفحه اصلی</label>
								</div>
								<div className="add-to-chosen-self-news">
									<input
										onChange={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: false,
														MainPageColumn: e.target.checked,
														SubPageColumn: false,
														SubPageSlider: false,
														MainNote: false,
														SubNote: false,
														MainTicker: false,
														SubTicker: false,
												  })
												: setInput({
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
										checked={editNews.MainPageColumn ? editNews.MainPageColumn : input.MainPageColumn}
										id="add-to-chosen-self-news"
									/>
									<label htmlFor="add-to-chosen-self-news">
										{!editNews.id
											? `منتخب صفحه ${
													(input.Category === "politic" && "سیاست") ||
													(input.Category === "economy" && "اقتصاد") ||
													(input.Category === "social" && "جامعه") ||
													(input.Category === "sport" && "ورزش") ||
													(input.Category === "local" && "بومی") ||
													"..."
											  } `
											: `منتخب صفحه ${
													(editNews.Category === "politic" && "سیاست") ||
													(editNews.Category === "economy" && "اقتصاد") ||
													(editNews.Category === "social" && "جامعه") ||
													(editNews.Category === "sport" && "ورزش") ||
													(editNews.Category === "local" && "بومی") ||
													"..."
											  } `}
									</label>
								</div>
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-to-main-page-note">
									<input
										onChange={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: false,
														MainPageColumn: false,
														SubPageColumn: false,
														SubPageSlider: false,
														MainNote: false,
														SubNote: e.target.checked,
														MainTicker: false,
														SubTicker: false,
												  })
												: setInput({
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
										checked={editNews.SubNote ? editNews.SubNote : input.SubNote}
									/>
									<label htmlFor="add-to-main-page-note">یادداشت در صفحه اصلی</label>
								</div>
								<div className="add-to-self-page-note">
									<input
										onChange={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: false,
														MainPageColumn: false,
														SubPageColumn: false,
														SubPageSlider: false,
														MainNote: e.target.checked,
														SubNote: false,
												  })
												: setInput({
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
										checked={editNews.MainNote ? editNews.MainNote : input.MainNote}
									/>
									<label htmlFor="add-to-self-page-note">
										{!editNews.id
											? `یادداشت در صفحه ${
													(input.Category === "politic" && "سیاست") ||
													(input.Category === "economy" && "اقتصاد") ||
													(input.Category === "social" && "جامعه") ||
													(input.Category === "sport" && "ورزش") ||
													(input.Category === "local" && "بومی") ||
													"..."
											  } `
											: `یادداشت در صفحه ${
													(editNews.Category === "politic" && "سیاست") ||
													(editNews.Category === "economy" && "اقتصاد") ||
													(editNews.Category === "social" && "جامعه") ||
													(editNews.Category === "sport" && "ورزش") ||
													(editNews.Category === "local" && "بومی") ||
													"..."
											  } `}
									</label>
								</div>
								<hr style={{ width: "100%", backgroundColor: "red" }} />
								<div className="add-main-ticker-news">
									<input
										onChange={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: false,
														MainPageColumn: false,
														SubPageColumn: false,
														SubPageSlider: false,
														MainNote: false,
														SubNote: false,
														MainTicker: true,
														SubTicker: e.target.checked,
												  })
												: setInput({
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
										checked={editNews.SubTicker ? editNews.SubTicker : input.SubTicker}
									/>
									<label htmlFor="add-main-ticker-news">تیکر صفحه اصلی</label>
								</div>
								<div className="add-sub-ticker-news">
									<input
										onChange={(e) => {
											editNews.id
												? setEditNews({
														...editNews,
														MainPageSlider: false,
														MainPageColumn: false,
														SubPageColumn: false,
														SubPageSlider: false,
														MainNote: false,
														SubNote: false,
														MainTicker: e.target.checked,
														SubTicker: false,
												  })
												: setInput({
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
										checked={editNews.MainTicker ? editNews.MainTicker : input.MainTicker}
									/>
									<label htmlFor="add-sub-ticker-news">
										{!editNews.id
											? `تیکر صفحه ${
													(input.Category === "politic" && "سیاست") ||
													(input.Category === "economy" && "اقتصاد") ||
													(input.Category === "social" && "جامعه") ||
													(input.Category === "sport" && "ورزش") ||
													(input.Category === "local" && "بومی") ||
													"..."
											  } `
											: `تیکر صفحه ${
													(editNews.Category === "politic" && "سیاست") ||
													(editNews.Category === "economy" && "اقتصاد") ||
													(editNews.Category === "social" && "جامعه") ||
													(editNews.Category === "sport" && "ورزش") ||
													(editNews.Category === "local" && "بومی") ||
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
						<button id="release" onClick={editNews.id ? handleSubmitEdit : handleSubmit} type="button">
							{editNews.id ? "ویرایش" : "انتشار"}
						</button>
					</div>
				</form>
			</div>
			{/* delete sub category */}
			<div id="warning-delete-SubCategory" className="warning-delete">
				<div id="deleted-SubCategory"></div>
				<div>
					<button type="button" id={GetCategoriesId.SetGetSubCategoryId} onClick={handleDeletedSubCategory} className="btn-deleted-SubCategory">
						حذف
					</button>
					<button
						type="button"
						className="btn-cancel-SubCategory"
						onClick={() => (document.getElementById("warning-delete-SubCategory").style.display = "none")}
					>
						لغو
					</button>
				</div>
			</div>
		</>
	);
};
