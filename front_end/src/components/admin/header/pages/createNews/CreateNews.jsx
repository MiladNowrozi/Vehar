/** @format */

import React, { createElement, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";

import "./createnews.css";
import { AuthContext } from "../../../../../context/authContext";

export const AxiosDefaultUrl = axios.create({
	baseURL: "http://localhost:5000",
});

export const CreateNews = () => {
	const [input, setInput] = useState({
		Title: "",
		Description: "",
		Editor: "",
		Category: "",
		Images: "",
		UserId: null,
		SubColumn: null,
	});

	const { CurrentUser } = useContext(AuthContext);

	const handelChange = (e) => {
		setInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
			UserId: CurrentUser.id,
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
				Category: e.target.id,
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
				Category: "",
			}));
		}
	};

	// const handleChangeSubColumn = (e) => {
	//   const ele = document.getElementsByName("HandleCheckboxSubColumn");
	//   if (document.getElementById(e.target.id).checked) {
	//     setInput((prev) => ({ ...prev, SubColumn: e.target.id }));
	//     for (let i = 0; i < ele.length; i++) {
	//       ele[i].checked = false;
	//       document.getElementById(e.target.id).checked = true;
	//     }
	//   } else {
	//     setInput((prev) => ({ ...prev, SubColumn: "" }));
	//   }
	// };
	// console.log(input);

	const handleSubmit = async (e) => {
		e.preventDefault();
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
				await AxiosDefaultUrl({
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
	});

	useEffect(() => {
		const k = async () => {
			await AxiosDefaultUrl({
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
			await AxiosDefaultUrl({
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
					console.log(e);
				});
		};
		k();
	}, []);

	const [valueCategory, setValueCategory] = useState("");

	const [valueSubCategory, setValueSubCategory] = useState({
		ParentCategory: "",
		SubCategory: "",
	});

	const handelChangeCategory = (e) => {
		setValueCategory(e.target.value);
	};

	const handelChangeSubCategory = (e) => {
		setValueSubCategory((prev) => ({
			...prev,
			ParentCategory: e.target.name,
			SubCategory: e.target.value,
		}));
	};

	const submitCategoryName = async (e) => {
		e.preventDefault();
		try {
			await AxiosDefaultUrl({
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
					console.log(err);
				});
			document.getElementById("input-create-Category").value = "";
		} catch (error) {
			console.log(error);
		}
	};
	const submitSubCategoryName = async (e) => {
		e.preventDefault();
		try {
			await AxiosDefaultUrl({
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
					const showWarningByClass = document.getElementsByName(e.target.id + "ShowWarningSubCategory");
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
												<label onClick={() => {}} htmlFor={Category.id + "Category"}>
													<input
														name="HandleCheckboxCategory"
														onChange={handleChangeCategory}
														type="checkbox"
														id={Category.id + "Category"}
														className="button-category"
													/>
													{Category.Category}
												</label>
											</div>
											{/* receive SubCategories from server */}
											<div id={Category.id + "Category" + "-Create-SubCategory"} className="Create-SubCategory">
												{Categories.GetSubCategories.length !== 0 &&
													Categories.GetSubCategories.map((SubCategory) => {
														return (
															SubCategory.categoryId === Category.id && (
																<div key={SubCategory.id + "SubCategory"}>
																	<label onClick={() => {}} htmlFor={SubCategory.id + "SubCategory"}>
																		<input
																			name="HandleCheckboxSubCategory"
																			onChange={handleChangeSubCategory}
																			type="checkbox"
																			id={SubCategory.id + "SubCategory"}
																			className="button-category"
																		/>
																		{SubCategory.SubCategory}
																	</label>
																</div>
															)
														);
													})}
												<hr />
												<div className="branch-Create-content">
													<p>{`ایجاد زیر دسته برای ${Category.Category}`}</p>
													<input name={Category.id} onChange={handelChangeSubCategory} className="input-subcategory" type="input" />
													<input id={Category.id} onClick={submitSubCategoryName} type="button" value={"+"} />
													<br />
													<span
														id={Category.id + "ShowWarningSubCategory"}
														name={Category.id + "ShowWarningSubCategory"}
														className="ShowWarningSubCategory"
													></span>
												</div>
											</div>
										</div>
									);
								})}
							<div id="emptyCategory"></div>
							<p>ایجاد یک دسته جدید.</p>
							<div className="content-create-category">
								<input id="input-create-Category" onChange={handelChangeCategory} type="input" />
								<input onClick={submitCategoryName} type="button" value={"+"} />
							</div>
						</div>
						{/* <label onClick={(()=>{
             document.getElementById("content-column").classList.toggle("ll")
              })} className="slider" htmlFor="slider">اسلایدر</label>
              <br />
              <div id="content-column" className="content-column">
              <input type="checkbox" id="one-column" onChange={handleChangeSubColumn} name="HandleCheckboxSubColumn" />
              <label htmlFor="one-column">تک ستونی</label><br />
              <label className="slider" htmlFor="slider">دو ستونی</label><br />
              <div className="content-two-column">
              <input type="checkbox" id="first-column" onChange={handleChangeSubColumn} name="HandleCheckboxSubColumn" />
              <label htmlFor="first-column">ستون اول</label><br />
              <input type="checkbox" id="scend-column" onChange={handleChangeSubColumn} name="HandleCheckboxSubColumn" />
              <label htmlFor="scend-column">ستون دوم</label><br />
              </div>
              </div>
            <input type="checkbox" id="mahdism" onChange={handleChange} name="HandleCheckbox" />
            <label htmlFor="mahdism">مهدویت</label>
            <br /> */}
					</div>
					<div className="buttons-create-news">
						<Link to={"/main-admin"}>انصراف</Link>
						<div id="submit-warning"></div>
						<button onClick={handleSubmit} type="submit">
							ارسال
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
