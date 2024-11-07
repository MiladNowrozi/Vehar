import "./listNews.css";
import { useEffect, useState } from "react";
import { MenuLord } from "../../../menu/Menu";
import { AxiosInstance } from "../../../../../axiosInstance";
export const ListNews = () => {
	const [ReceiveAllNews, setReceiveAllNews] = useState({
		News: [],
		Limit: 20,
		CurrentPage: 1,
		TotalNews: null,
		TotalPages: null,
		Search: null,
		SearchById: null,
	});

	window.addEventListener("load", () => {
		LodNews();
	});
	const LodNews = async () => {
		await AxiosInstance({
			method: "get",
			url: `news/get-all?currentpage=${ReceiveAllNews.CurrentPage}&limit=${ReceiveAllNews.Limit}&search=${ReceiveAllNews.Search}&searchbyid=${ReceiveAllNews.SearchById}`,
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
		<MenuLord onAction={LodNews()} />;
	}, []);

	const [IdDeletedNews, setIdDeletedNews] = useState(null);

	const handleDeletedNews = async (Deleted) => {
		setIdDeletedNews(Deleted.target.id);
		document.getElementById("warning-delete-news").style.display = "flex";
		document.getElementById("deleted-news").innerHTML = `آیا میخواهید کاربر <span style="color:red;">${Deleted.target.name}</span> را حذف کنید ؟`;
	};

	const handleCancelDeleNews = async () => {
		document.getElementById("warning-delete-news").style.display = "none";
	};

	const handleDeleteNews = async () => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `news/delete${IdDeletedNews}`,
				withCredentials: true,
			})
				.then((success) => {
					setReceiveAllNews(success.data.body);
					console.log(success.data.message);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelNews = async (Cancel) => {
		try {
			await AxiosInstance({
				method: "put",
				url: `news/put${Cancel.target.id}`,
				withCredentials: true,
			})
				.then((success) => {
					setReceiveAllNews(success.data.body);
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
			<div id="content-add-news" className="content-add-news">
				<h2>اخبار</h2>
				<div className="container-search-news-lord">
					<div className="search-news-by-title-lord">
						<input
							onChange={(e) => {
								ReceiveAllNews.Search = e.target.value !== "" ? e.target.value : null;
								LodNews();
							}}
							type="search"
							name="search"
							id="search"
						/>
						<label htmlFor="search">جستجو در اخبار</label>
					</div>
					<div className="search-news-by-id-lord">
						<input
							onChange={(e) => {
								ReceiveAllNews.SearchById = e.target.value !== "" ? e.target.value : null;
								LodNews();
							}}
							type="number"
							name="SearchById"
							id="SearchById"
						/>
						<label htmlFor="SearchById">جستجو با کد خبر</label>
					</div>
				</div>
				<table className="content-table-news">
					<thead>
						<tr className="titles-table-news">
							<th>عنوان</th>
							<th>نویسنده</th>
							<th>دسته ها</th>
							<th>نظرات</th>
							<th>تاریخ انتشار</th>
							<th>کد خبر</th>
						</tr>
					</thead>
					{ReceiveAllNews.News.map((e) => {
						const [DateC, TimeC] = [
							{ DateCreate: new Date(e.createdAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0] },
							{ TimeCreate: new Date(e.createdAt).toTimeString().split(" ")[0] },
						];
						// const [DateU, TimeU] = [
						// 	{ DateUpdate: new Date(e.updatedAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }).split("T")[0] },
						// 	{ TimeUpdate: new Date(e.updatedAt).toTimeString().split(" ")[0] },
						// ];
						return (
							<tbody key={e.id} className="content-map-news">
								<tr>
									<td>
										<hr style={{ border: "none", height: "1px" }} />
									</td>
								</tr>
								<tr className="map-news">
									<td className="img-profile-news">
										<p>{e.News_Title}</p>
									</td>
									<td className="td-info">{e.Author}</td>
									<td className="td-info">{e.Category}</td>
									<td className="green td-info">{e.Comment_Status === false ? 0 : "تنظیم"}</td>
									<td className="td-info">
										<span className="Date">{DateC.DateCreate}</span> <span className="Time">{TimeC.TimeCreate}</span>
									</td>
									<td className="td-info">
										<span className="Date">{e.id}</span>
									</td>
									<td className="ffff">
										<button id={e.id} onClick={handleDeletedNews} className="delete-news">
											حذف
										</button>
										<button id={e.id} onClick={handleCancelNews} className="cancel-news">
											ویرایش
										</button>
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
			<div id="warning-delete-news" className="warning-delete-news">
				<div id="deleted-news"></div>
				<div>
					<button className="btn-deleted-news" onClick={handleDeleteNews}>
						حذف
					</button>
					<button className="btn-cancel-news" onClick={handleCancelDeleNews}>
						لغو
					</button>
				</div>
			</div>
		</div>
	);
};
