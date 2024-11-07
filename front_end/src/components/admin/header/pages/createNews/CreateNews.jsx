/** @format */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate } from "react-router-dom";

import "./createnews.css";
import { AuthContext } from "../../../../../context/authContext";
import { AxiosInstance } from "../../../../../axiosInstance.js";

export const CreateNews = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState({
		Title: "",
		Description: "",
		Editor: "",
		Images: null,
		NewsStatus: true,
		Comment_Status: false,
		Column: null,
		CategoryId: "",
		SubCategoryId: null,
		AuthorId: null,
		OptionNewsId: "",
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
		const showCreateSubCategory = document.getElementById(e.target.id + "-Create-SubCategory");

		document.getElementById(e.target.id).checked === true
			? (showCreateSubCategory.style.display = "block")
			: (showCreateSubCategory.style.display = "none");

		if (document.getElementById(e.target.id).checked) {
			setInput((prev) => ({
				...prev,
				CategoryId: e.target.id.match(/(\d+)/)[0],
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
				CategoryId: "",
			}));
		}
	};

	const handleChangeSubCategory = (e) => {
		console.log(e.target.id.match(/(\d+)/)[0]);

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
	const handleChangeOptions = (e) => {
		const ele = document.getElementsByName("HandleCheckboxOptions");
		// const showCreateSubCategory = document.getElementById(e.target.id + "-Create-SubCategory");
		// document.getElementById(e.target.id).checked === true
		// 	? (showCreateSubCategory.style.display = "block")
		// 	: (showCreateSubCategory.style.display = "none");
		if (document.getElementById(e.target.id).checked) {
			setInput((prev) => ({
				...prev,
				OptionNewsId: e.target.id.match(/(\d+)/)[0],
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
				OptionNewsId: "",
			}));
		}
	};

	const handleChangeColumn = (e) => {
		const ele = document.getElementsByName("HandleCheckboxColumn");
		if (document.getElementById(e.target.id).checked) {
			setInput((prev) => ({ ...prev, Column: e.target.id }));
			for (let i = 0; i < ele.length; i++) {
				ele[i].checked = false;
				document.getElementById(e.target.id).checked = true;
			}
		} else {
			setInput((prev) => ({ ...prev, Column: "" }));
		}
	};

	const handleSubmit = async () => {
		if (input.Title === "" && input.Description === "" && input.Editor === "" && input.CategoryId === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else if (input.Title === "" || input.Description === "" || input.Editor === "" || input.CategoryId === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.Title === "" ? "عنوان خبر، " : ""}${
				input.Description === "" ? "توضیح کوتاه، " : ""
			}${input.Editor === "" ? "متن خبر، " : ""}${input.CategoryId === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
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

	const [Categories, setCategories] = useState({
		GetCategories: "",
		GetSubCategories: "",
		GetOptionsNews: "",
	});

	const [valueCategory, setValueCategory] = useState("");

	const [valueSubCategory, setValueSubCategory] = useState({
		ParentCategory: "",
		SubCategory: "",
	});

	useEffect(() => {
		const k = async () => {
			await AxiosInstance({
				method: "get",
				url: "news/category/get-all",
				withCredentials: true,
			})
				.then(async (success) => {
					setCategories((prev) => ({
						...prev,
						GetCategories: success.data.body,
					}));
				})
				.catch((e) => {
					document.getElementById("emptyCategory").innerHTML = e.response.data.message;
				});
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
			await AxiosInstance({
				method: "get",
				url: "news/Option/get-all",
				withCredentials: true,
			})
				.then((success) => {
					setCategories((prev) => ({
						...prev,
						GetOptionsNews: success.data.body,
					}));
				})
				.catch((e) => {
					console.log(e.response.data);
				});
		};
		k();
	}, []);

	const handelChangeCategory = (e) => {
		setValueCategory(e.target.value);
	};
	const handelChangeSubCategory = (e) => {
		setValueSubCategory((prev) => ({
			...prev,
			ParentCategory: e.target.id.match(/(\d+)/)[0],
			SubCategory: e.target.value,
		}));
	};
	//
	const submitCategoryName = async () => {
		// e.preventDefault();
		try {
			await AxiosInstance({
				method: "post",
				url: `news/category/create/${valueCategory}`,
				withCredentials: true,
			})
				.then((success) => {
					setCategories((prev) => ({
						...prev,
						GetCategories: success.data.body,
					}));
					document.getElementById("emptyCategory").innerHTML = "";
				})
				.catch((err) => {
					const showWarningById = document.getElementById("emptyCategory");
					showWarningById.style.visibility = "visible";
					showWarningById.innerHTML = err.response.data.message;
					setTimeout(() => {
						showWarningById.style.visibility = "hidden";
					}, 2000);
				});
			document.getElementById("input-create-Category").value = "";
		} catch (error) {
			console.log(error);
		}
	};
	const submitSubCategoryName = async (e) => {
		e.preventDefault();
		try {
			await AxiosInstance({
				method: "post",
				url: `news/create-subcategory/${valueSubCategory.ParentCategory}/${valueSubCategory.SubCategory}`,
				withCredentials: true,
			})
				.then((success) => {
					setCategories((prev) => ({
						...prev,
						GetSubCategories: success.data.body,
					}));
				})
				.catch((err) => {
					const showWarningById = document.getElementById(e.target.id + "ShowWarningSubCategory");
					const showWarningByClass = document.getElementsByClassName("ShowWarningSubCategory");
					showWarningById.style.visibility = "visible";
					for (let i = 0; i < showWarningByClass.length; i++) {
						showWarningByClass[i].innerHTML = err.response.data.message;
						setTimeout(() => {
							showWarningById.style.visibility = "hidden";
						}, 2000);
					}
				});
			const ele = document.getElementsByClassName("input-subcategory");
			for (let i = 0; i < ele.length; i++) {
				ele[i].value = "";
			}
		} catch (error) {
			console.log(error);
		}
	};
	//
	const [GetCategoriesId, SetGetCategoriesId] = useState({
		GetCategoryId: null,
		SetGetSubCategoryId: null,
	});

	const handleDeletedCategory = async (Deleted) => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `news/category-delete/${Deleted.target.id}`,
				withCredentials: true,
			})
				.then((success) => {
					document.getElementById("warning-delete-Category").style.display = "none";
					setCategories((prev) => ({
						...prev,
						GetCategories: success.data.body,
					}));
					document.getElementById("emptyCategory").innerHTML = success.data.message;
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteCategory = async (Delete) => {
		SetGetCategoriesId((prev) => ({
			...prev,
			GetCategoryId: Delete.target.id,
		}));
		document.getElementById("warning-delete-Category").style.display = "flex";
		document.getElementById(
			"deleted-Category"
		).innerHTML = `آیا میخواهید دسته والد <span style="color:red;">${Delete.target.name}</span> را حذف کنید ؟ <br> <span  style="color:red;">این کار خبرهای فرزند ${Delete.target.name} و تمام زیر مجموعه  های آن مانند اخبار ویژه، اخبار پربیننده و ... را به لیست اخبار بدون دسته اضافه می کند .</span>`;
	};
	//
	const handleDeletedSubCategory = async (Deleted) => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `news/dele-subcategory/${Deleted.target.id}`,
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
		).innerHTML = `آیا میخواهید دسته فرزند <span style="color:red;">${Delete.target.name}</span> را حذف کنید ؟ <br> <span  style="color:red;">این کار خبرهای زیر مجموعه ${Delete.target.name}  مانند اخبار ویژه، اخبار پربیننده و ... را بدون دسته قرار می دهد .</span>`;
	};
	//
	const handleCancelDeleCategory = async () => {
		document.getElementById("warning-delete-Category").style.display = "none";
	};
	const handleCancelDeleSubCategory = async () => {
		document.getElementById("warning-delete-SubCategory").style.display = "none";
	};
	//
	const HandelNewsStatus = async () => {
		document.getElementById("release").style.pointerEvents = "none";
		if (input.Title === "" && input.Description === "" && input.Editor === "" && input.CategoryId === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
			setTimeout(() => {
				showWarning.style.display = "none";
			}, 5000);
		} else if (input.Title === "" || input.Description === "" || input.Editor === "" || input.CategoryId === "") {
			const showWarning = document.getElementById("submit-warning");
			showWarning.style.display = "flex";
			showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${input.Title === "" ? "عنوان خبر، " : ""}${
				input.Description === "" ? "توضیح کوتاه، " : ""
			}${input.Editor === "" ? "متن خبر، " : ""}${input.CategoryId === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
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

	return (
		<>
			<div className="news-create-admin">
				<form id="loginForm" className="input-news-admin">
					<label htmlFor="Title">عنوان خبر :</label>
					<input type="text" id="Title" name="Title" autoComplete="off" placeholder="جهان بینی خبرنگاران ..." onChange={handelChange} />
					<label htmlFor="Description">توضیح کوتاه :</label>
					<input
						type="text"
						id="Description"
						name="Description"
						autoComplete="off"
						placeholder="خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
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
						<div className="container-category">
							<div className="title-category">
								<h2>مربوط به دسته</h2>
							</div>
							<div className="server-category">
								{/* receive Categories from server */}
								{Categories.GetCategories?.length !== 0 &&
									Categories.GetCategories?.map((Category) => {
										return (
											<div key={Category.id + "Category"} className="content-add-category">
												<div className="add-Category">
													<label htmlFor={Category.id + "Category"}>
														<input
															name="HandleCheckboxCategory"
															onChange={handleChangeCategory}
															type="checkbox"
															id={Category.id + "Category"}
															className="button-category"
														/>
														{Category.Category}
													</label>
													<button type="button" id={Category.id} name={Category.Category} onClick={handleDeleteCategory} className="fa fa-trash"></button>
												</div>
												{/* receive SubCategories from server */}
												<div id={Category.id + "Category" + "-Create-SubCategory"} className="Create-SubCategory">
													{Categories.GetSubCategories.length !== 0 &&
														Categories.GetSubCategories.map((SubCategory) => {
															return (
																SubCategory.categoryId === Category.id && (
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
													<hr />
													<div className="branch-Create-content">
														<p>{`اضافه کردن زیر دسته برای ${Category.Category}`}</p>
														<input id={Category.id + "Parent-SubCategory"} onChange={handelChangeSubCategory} className="input-subcategory" type="input" />
														<input id={Category.id + "test"} onClick={submitSubCategoryName} type="button" value={"+"} />
														<br />
														<span
															id={Category.id + "test" + "ShowWarningSubCategory"}
															name={Category.id + "ShowWarningSubCategory"}
															className="ShowWarningSubCategory"
														></span>
													</div>
												</div>
											</div>
										);
									})}
								<div id="emptyCategory"></div>
								<p>اضافه کردن یک دسته جدید.</p>
								<div className="content-create-category">
									<input id="input-create-Category" onChange={handelChangeCategory} type="input" />
									<input onClick={submitCategoryName} type="button" value={"+"} />
								</div>
							</div>
						</div>

						{/*  */}
						<div className="container-columns">
							<div className="title-column">
								<h2>افزودن به اسلایدر</h2>
							</div>
							<div id="content-column" className="content-column">
								<input type="checkbox" id="one-column" onChange={handleChangeColumn} name="HandleCheckboxColumn" />
								<label htmlFor="one-column">تک ستونی</label>
								<br />
								<label className="slider" htmlFor="slider">
									دو ستونی
								</label>
								<br />
								<div className="content-two-column">
									<input type="checkbox" id="first-column" onChange={handleChangeColumn} name="HandleCheckboxColumn" />
									<label htmlFor="first-column">ستون اول</label>
									<br />
									<input type="checkbox" id="scend-column" onChange={handleChangeColumn} name="HandleCheckboxColumn" />
									<label htmlFor="scend-column">ستون دوم</label>
									<br />
								</div>
							</div>
							<div className="content-configuration-news">
								<div className="drafts">
									<button onClick={HandelNewsStatus} type="button">
										ذخیره در پیشنویس ها
									</button>
								</div>
								<div className="disable-comment">
									<input
										onClick={() => {
											const l = document.getElementById("disable-comment");
											setInput((prev) => ({
												...prev,
												Comment_Status: l.checked ? true : false,
											}));
										}}
										type="checkbox"
										id="disable-comment"
									/>
									<label htmlFor="disable-comment">بستن نظرات برای این خبر</label>
								</div>
							</div>
						</div>
						<div className="content-options-news">
							<div className="title-options">
								<h2>گزینه های سفارشی</h2>
							</div>
							<div className="option-news">
								{Categories.GetOptionsNews.length !== 0 &&
									Categories.GetOptionsNews.map((Options) => {
										return (
											<div key={Options.id + "Options"} className="add-Options">
												<input
													name="HandleCheckboxOptions"
													onChange={handleChangeOptions}
													type="checkbox"
													id={Options.id + "Options"}
													className="checkbox-Options"
												/>
												<label htmlFor={Options.id + "Options"}>{Options.Option}</label>
											</div>
										);
									})}
							</div>
						</div>
						{/*  */}
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
			{/* delete category */}
			<div id="warning-delete-Category" className="warning-delete">
				<div id="deleted-Category"></div>
				<div>
					<button type="button" id={GetCategoriesId.GetCategoryId} onClick={handleDeletedCategory} className="btn-deleted-Category">
						حذف
					</button>
					<button type="button" className="btn-cancel-Category" onClick={handleCancelDeleCategory}>
						لغو
					</button>
				</div>
			</div>
			{/* delete sub category */}
			<div id="warning-delete-SubCategory" className="warning-delete">
				<div id="deleted-SubCategory"></div>
				<div>
					<button type="button" id={GetCategoriesId.SetGetSubCategoryId} onClick={handleDeletedSubCategory} className="btn-deleted-SubCategory">
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
