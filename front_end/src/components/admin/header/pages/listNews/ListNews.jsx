import "./listNews.css";
import { useContext, useEffect, useState } from "react";
import { MenuLord } from "../../../menu/Menu";
import { AxiosInstance } from "../../../../../axiosInstance";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../context/authContext";
export const ListNews = () => {
	const { CurrentUser } = useContext(AuthContext);
	const [ReceiveAllNews, setReceiveAllNews] = useState({
		News: [],
		Limit: 20,
		CurrentPage: 1,
		TotalNews: null,
		TotalPages: null,
		Search: null,
		SearchById: null,
	});

	const [NewsStatus, setNewsStatus] = useState({
		Comments: [],
		Count: [],
	});

	window.addEventListener("load", () => {
		LodNews();
		fetchData();
	});
	const LodNews = async () => {
		await AxiosInstance({
			method: "get",
			url: `news/search-admin?currentpage=${ReceiveAllNews.CurrentPage}&limit=${ReceiveAllNews.Limit}&search=${ReceiveAllNews.Search}&searchbyid=${ReceiveAllNews.SearchById}`,
			withCredentials: true,
		})
			.then((success) => {
				setReceiveAllNews((prev) => ({
					...prev,
					News: success.data.body.News,
					TotalPages: success.data.body.TotalPages,
					TotalNews: success.data.body.TotalNews,
					CurrentPage: success.data.body.CurrentPage,
				}));
				if (success.data.body.TotalPages <= 1) {
					document.getElementById("pagination").style.display = "none";
				} else {
					document.getElementById("pagination").style.display = "flex";
					document.getElementById("Back").disabled = false;
					document.getElementById("ForWord").disabled = false;
					if (success.data.body.CurrentPage === success.data.body.TotalPages) {
						document.getElementById("ForWord").disabled = true;
						document.getElementById("Back").disabled = false;
					} else if (success.data.body.CurrentPage === 1) {
						document.getElementById("Back").disabled = true;
						document.getElementById("ForWord").disabled = false;
					}
				}
				if (success.data.body.TotalNews === 0) {
					document.getElementById("empty-news").innerHTML = success.data.message;
				} else {
					document.getElementById("empty-news").innerHTML = "";
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useEffect(() => {
		<MenuLord onAction={(LodNews(), fetchData())} />;
	}, []);

	const [IdDeletedNews, setIdDeletedNews] = useState(null);
	const [SelectComment, setSelectComment] = useState({});
	const [GoToComments, setGoToComments] = useState(false);
	const [ReadComment, setReadComment] = useState(false);
	const [BackToReadComments, setBackToReadComments] = useState(false);

	const handleDeletedNews = async (Deleted) => {
		setIdDeletedNews(Deleted.id);
		document.getElementById("news-dele-lord-btn-content").style.display = "block";
		document.getElementById("warning-delete-news").style.display = "flex";
		document.getElementById("deleted-news").innerHTML = `آیا میخواهید این خبر را حذف کنید ؟<br/>
		کد: <span style="color:red;">${Deleted.id}</span> <br/>
		تیتر: <span style="color:red;">${Deleted.Titre}</span><br/>
		عنوان: <span style="color:red;">${Deleted.Title}</span><br/>
		نویسنده: <span style="color:red;">${Deleted.Author}</span>
		`;
	};

	const handleDeleteNews = async () => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `news/delete?id=${IdDeletedNews}`,
				withCredentials: true,
			})
				.then((success) => {
					LodNews();
					document.getElementById("deleted-news").innerHTML = success.data.message;
					document.getElementById("news-dele-lord-btn-content").style.display = "none";
					setTimeout(() => {
						document.getElementById("warning-delete-news").style.display = "none";
					}, [1000]);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const fetchData = async () => {
		try {
			await AxiosInstance({
				method: "get",
				url: "news/status-comment",
				withCredentials: true,
			})
				.then((success) => {
					setNewsStatus((prov) => ({ ...prov, Comments: success.data.body.Comments, Count: success.data.body.Count }));
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-add-news">
			<div className="status-comment-container">
				<div id="success-verification" className="success-verification"></div>
				{BackToReadComments === true && (
					<div className="select-comment">
						<div className="content-select">
							<section>
								<h6>نام</h6>
								<p>{SelectComment.name}</p>
							</section>
							<section>
								<h6>نظر</h6>
								<p>{SelectComment.comment}</p>
							</section>
							<section>
								<h6>تیتر خبر منظور</h6>
								<p>{SelectComment.titre}</p>
							</section>
							<section>
								<h6>عنوان خبر منظور</h6>
								<p>{SelectComment.title}</p>
							</section>
						</div>
						<div className="btn-comment-select">
							<button
								onClick={() => {
									setReadComment(true);
									setBackToReadComments(false);
									fetchData();
								}}
							>
								برگشت
							</button>
							<button
								onClick={async () => {
									await AxiosInstance({
										method: "post",
										url: `news/verification-comment?id=${SelectComment.id}`,
										withCredentials: true,
									})
										.then((success) => {
											fetchData();
											document.getElementById("select-comment").style.display = "none";
											document.getElementById("success-verification").style.display = "unset";
											document.getElementById("success-verification").innerHTML = success.data.message;
											setTimeout(() => {
												document.getElementById("success-verification").style.display = "none";
												document.getElementById("table-comment").style.display = "unset";
												document.getElementById("success-verification").innerHTML = "";
											}, 3000);
										})
										.catch((err) => {
											console.log(err);
										});
								}}
							>
								قبول
							</button>
							<button
								onClick={async () => {
									await AxiosInstance({
										method: "delete",
										url: `news/comments-delete?id=${SelectComment.id}&type=Comment`,
										withCredentials: true,
									})
										.then((success) => {
											fetchData();
											document.getElementById("success-verification").style.display = "unset";
											document.getElementById("success-verification").innerHTML = success.data.message;
											setTimeout(() => {
												document.getElementById("success-verification").style.display = "none";
												document.getElementById("success-verification").innerHTML = "";
											}, 3000);
										})
										.catch((err) => {
											console.log(err);
										});
								}}
							>
								رد = حذف
							</button>
						</div>
					</div>
				)}
				{ReadComment === true && (
					<table id="table-comment" className="content-table-comment">
						<div className="top-access">
							<h2>وضعیت نظرات</h2>
							<button
								onClick={() => {
									setGoToComments(false);
									setReadComment(false);
									fetchData();
								}}
							>
								برگشت
							</button>
						</div>
						{window.innerWidth > 500 && (
							<thead>
								<tr className="titles-table-comment">
									<th>تعداد</th>
									<th>پروفایل</th>
									<th>نام</th>
									<th>نظر</th>
									<th>دسته</th>
									<th>تیتر خبر</th>
									<th>عنوان خبر</th>
									<th>تاریخ</th>
									<th>کد خبر</th>
								</tr>
							</thead>
						)}
						{(NewsStatus.Comments.length > 0 &&
							NewsStatus.Comments.map((e, i) => {
								const [DateC, TimeC] = [
									{
										DateCreate: new Date(e.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0],
									},
									{ TimeCreate: new Date(e.createdAt).toTimeString().split(" ")[0] },
								];
								return (
									<tbody key={i} className="content-map-comment">
										{window.innerWidth < 500 && (
											<thead>
												<tr className="titles-table-comment">
													<th>تعداد</th>
													<th>پروفایل</th>
													<th>نام</th>
													<th>نظر</th>
													<th>تیتر خبر</th>
													<th>عنوان خبر</th>
													<th>دسته</th>
													<th>تاریخ</th>
													<th>کد خبر</th>
												</tr>
											</thead>
										)}
										<tr>
											<td>
												<hr style={{ border: "none", height: "1px" }} />
											</td>
										</tr>
										<tr className="map-comment">
											<td className="count-comment">{i + 1}</td>
											<td className="img-user-comment">
												<img src={e.user.Default_Image} alt="img" />
											</td>
											<td
												onClick={() => {
													setReadComment(false);
													setBackToReadComments(true);
													setSelectComment({
														id: e.id,
														name: e.user.User_FirstName + " " + e.user.User_LastName,
														img: e.user.Default_Image,
														titre: e.news.News_Titre,
														title: e.news.News_Title,
														comment: e.Comment_Content,
													});
													fetchData();
												}}
												className="name-user-comment"
											>
												<p>{e.user.User_FirstName + " " + e.user.User_LastName}</p>
											</td>
											<td className="text-comment-news">
												<p>{e.Comment_Content}</p>
											</td>
											<td className="titre-news-comment">
												<p>{e.news.News_Titre}</p>
											</td>
											<td className="title-news-comment">
												<p>{e.news.News_Title}</p>
											</td>
											<td className="category-news-comment">
												<p>
													{(e.news.Category === "politic" && "سیاست") ||
														(e.news.Category === "economy" && "اقتصاد") ||
														(e.news.Category === "social" && "جامعه") ||
														(e.news.Category === "sport" && "ورزش") ||
														(e.news.Category === "local" && "بومی")}
												</p>
											</td>
											<td className="date-comment">
												<span className="Date">{DateC.DateCreate}</span> <span className="Time">{TimeC.TimeCreate}</span>
											</td>
											<td className="date-comment">
												<span className="Date">{e.news.id}</span>
											</td>
											<td className="btn-action-comment">
												<button
													className="delete-comment"
													onClick={async () => {
														await AxiosInstance({
															method: "post",
															url: `news/verification-comment?id=${e.id}`,
															withCredentials: true,
														})
															.then((success) => {
																fetchData();
																document.getElementById("success-verification").style.display = "unset";
																document.getElementById("success-verification").innerHTML = success.data.message;
																setTimeout(() => {
																	document.getElementById("success-verification").style.display = "none";
																	document.getElementById("success-verification").innerHTML = "";
																}, 3000);
															})
															.catch((err) => {
																console.log(err);
															});
													}}
												>
													قبول
												</button>
												<button
													className="cancel-comment"
													onClick={async () => {
														await AxiosInstance({
															method: "delete",
															url: `news/comments-delete?id=${e.id}&type=Comment`,
															withCredentials: true,
														})
															.then((success) => {
																fetchData();
																document.getElementById("success-verification").style.display = "unset";
																document.getElementById("success-verification").innerHTML = success.data.message;
																setTimeout(() => {
																	document.getElementById("success-verification").style.display = "none";
																	document.getElementById("success-verification").innerHTML = "";
																}, 3000);
															})
															.catch((err) => {
																console.log(err);
															});
													}}
												>
													رد
												</button>
											</td>
										</tr>
									</tbody>
								);
							})) ||
							"لیست نظر های منتشر نشده خالی است ."}
					</table>
				)}
			</div>

			{GoToComments === false && (
				<div className="content-add-news">
					<h2>اخبار</h2>
					<div className="container-search-news-lord">
						<div className="search-news-by-title-lord">
							<label htmlFor="search"> جستجو در تیتر و عنوان؛</label>
							<input
								onChange={(e) => {
									ReceiveAllNews.Search = e.target.value.length > 3 ? e.target.value : null;
									LodNews();
								}}
								type="search"
								name="search"
								id="search"
							/>
						</div>
						<div className="search-news-by-id-lord">
							<label htmlFor="SearchById">جستجو با کد خبر؛</label>
							<input
								onChange={(e) => {
									ReceiveAllNews.SearchById = e.target.value !== "" ? e.target.value : null;
									LodNews();
								}}
								type="number"
								name="SearchById"
								id="SearchById"
							/>
						</div>
						<button
							onClick={() => {
								setGoToComments(true);
								setReadComment(true);
								fetchData();
							}}
						>
							<span className="count-comment">{NewsStatus.Comments.length}</span>
							نظرات
						</button>
					</div>
					<table className="content-table-news">
						{window.innerWidth > 500 && (
							<thead>
								<tr className="titles-table-news">
									<th>تیتر</th>
									<th>عنوان</th>
									<th>نویسنده</th>
									<th>دسته ها</th>
									<th>نظرات</th>
									<th>تاریخ انتشار</th>
									<th>کد خبر</th>
								</tr>
							</thead>
						)}
						{ReceiveAllNews.News.map((e) => {
							const [DateC, TimeC] = [
								{
									DateCreate: new Date(e.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0],
								},
								{ TimeCreate: new Date(e.createdAt).toTimeString().split(" ")[0] },
							];
							return (
								<tbody key={e.id} className="content-map-news">
									{window.innerWidth < 500 && (
										<thead>
											<tr className="titles-table-news">
												<th>تیتر</th>
												<th>عنوان</th>
												<th>نویسنده</th>
												<th>دسته ها</th>
												<th>نظرات</th>
												<th>تاریخ انتشار</th>
												<th>کد خبر</th>
											</tr>
										</thead>
									)}
									<tr>
										<td>
											<hr style={{ border: "none", height: "1px" }} />
										</td>
									</tr>
									<tr className="map-news">
										<td className="titre-news">
											<p dangerouslySetInnerHTML={{ __html: e.News_Titre }}></p>
										</td>
										<td className="title-news">
											<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
										</td>
										<td className="td-info">{e.admin.Admin_FirstName + " " + e.admin.Admin_LastName}</td>
										<td className="td-info">
											{(e.Category === "politic" && "سیاست") ||
												(e.Category === "economy" && "اقتصاد") ||
												(e.Category === "social" && "جامعه") ||
												(e.Category === "sport" && "ورزش") ||
												(e.Category === "local" && "بومی")}
										</td>
										<td className="green td-info">{e.Comment_Status === false ? "فعال" : "غیر فعال"}</td>
										<td className="td-info">
											<span className="Date">{DateC.DateCreate}</span> <span className="Time">{TimeC.TimeCreate}</span>
										</td>
										<td className="td-info">
											<span className="Date">{e.id}</span>
										</td>
										<td className="ffff">
											<button
												onClick={() =>
													handleDeletedNews({
														id: e.id,
														Titre: e.News_Titre,
														Title: e.News_Title,
														Category: e.Category,
														Author: e.admin.Admin_FirstName + " " + e.admin.Admin_LastName,
													})
												}
												className="delete-news"
											>
												حذف
											</button>
											<Link to={`/admin/create-news?id=${e.id}`}>
												<button className="edit-news-lord">ویرایش</button>
											</Link>
										</td>
									</tr>
								</tbody>
							);
						})}
						<thead>
							<tr>
								<td>
									<span style={{ color: "white" }} id="empty-news"></span>
								</td>
							</tr>
						</thead>
					</table>
					<div style={{ display: "none" }} id="pagination" className="pagination">
						<button
							id="Back"
							onClick={() => {
								ReceiveAllNews.CurrentPage--;
								LodNews();
							}}
						>
							قبلی
						</button>
						<h1>
							{ReceiveAllNews.CurrentPage} از {Math.ceil(ReceiveAllNews.TotalPages)}
						</h1>
						<button
							id="ForWord"
							onClick={() => {
								ReceiveAllNews.CurrentPage++;
								LodNews();
							}}
						>
							بعدی
						</button>
					</div>
				</div>
			)}
			<div id="warning-delete-news" className="warning-delete-news">
				<div id="deleted-news" className="deleted-news"></div>
				<div id="news-dele-lord-btn-content">
					<button className="btn-deleted-news" onClick={handleDeleteNews}>
						حذف
					</button>
					<button
						className="btn-cancel-news"
						onClick={() => {
							document.getElementById("warning-delete-news").style.display = "none";
						}}
					>
						لغو
					</button>
				</div>
			</div>
		</div>
	);
};
