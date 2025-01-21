import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AxiosInstance } from "../../../../../axiosInstance";
import "./history.css";

export default function HistoryLord() {
	const navigate = useNavigate();
	const [History, setHistory] = useState([]);
	const [WarningDelete, setWarningDelete] = useState({
		id: null,
		titre: "",
		title: "",
		category: "",
		author: "",
	});

	const fa1 = "تیتر خبر : ";
	const fa2 = "نویسنده : ";
	const fa3 = "عنوان خبر : ";
	const fa4 = "انتشار : ";
	const fa5 = "کد خبر : ";
	const fa6 = "شما در طول سه روز گذشته خبری منتشر نکردید .";
	const fa7 = "خبرهای منتشر شده تا سه روز گذشته .";
	const fa8 = "حذف";
	const fa9 = "لغو";
	const fa10 = "دسته : ";
	const fa11 = "آیا از حذف این خبر مطمئن هستید ؟";

	const FetchData = async () => {
		await AxiosInstance({
			method: "get",
			url: "admin/history",
			withCredentials: true,
		})
			.then((success) => {
				setHistory(success.data.body);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	FetchData();

	const handelDeleteNews = async (id) => {
		await AxiosInstance({
			method: "delete",
			url: `news/delete?id=${id}`,
			withCredentials: true,
		})
			.then((success) => {
				setWarningDelete({ ...WarningDelete, id: null, titre: "", title: "", category: "", author: "" });
				FetchData();
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div className="container-history-news-lord">
			<div className="history-content-news-lord">
				{History.length > 0 && <p className="p-info-lord">{fa7}</p>}
				{(History.length > 0 &&
					History.map((e, i) => (
						<div className="history-items-news-lord">
							<div className="main-info-history">
								<img src={e.Default_Image} alt="img" />
								<div className="main-info">
									<div className="news-titre-lord">
										<h5>{fa1}</h5>
										<p>{e.News_Titre}</p>
									</div>
									<div className="news-title-lord">
										<h5>{fa3}</h5>
										<p>{e.News_Title}</p>
									</div>
								</div>
							</div>
							<div className="news-about-lord">
								<div className="side-right-history-lord">
									<div className="author-news-history-lord">
										<h5>{fa2}</h5>
										<img src={e.admin.Default_Image} alt="img" />
										<span>{e.admin.Admin_FirstName + " " + e.admin.Admin_LastName}</span>
									</div>
									<div className="createdAt-news-history-lord">
										<h5>{fa4}</h5>
										<span>{moment(e.createdAt).fromNow()}</span>
									</div>
									<i onClick={() => navigate(`/admin/create-news?id=${e.id}`)} className="style-border fa fa-edit"></i>
									<i
										className="style-border fa fa-trash"
										onClick={() =>
											setWarningDelete({
												...WarningDelete,
												id: e.id,
												titre: e.News_Titre,
												title: e.News_Title,
												category: e.Category,
												author: e.admin.Admin_FirstName + " " + e.admin.Admin_LastName,
											})
										}
									></i>
									<i onClick={() => navigate(`/news/${e.id}`)} className="style-border fa fa-arrow-left"></i>
								</div>
								<div className="side-lift-history-lord">
									<div className="history-user-lord">
										<i className={e.Like_News ? "fa fa-heart green" : "fa fa-heart"}></i>
										<p>{e.Like_Count}</p>
									</div>
									<div className="code-history-history-lord">
										{fa5}
										<p>{e.id}</p>
									</div>
									<div className="count-visit-history-lord">
										<i class="fa fa-eye" aria-hidden="true"></i>
										<p>{e.Visit_Count}</p>
									</div>
								</div>
							</div>
						</div>
					))) || <p>{fa6}</p>}
			</div>
			{WarningDelete.id && (
				<div className="warning-delete-lord-history">
					<div className="warning-delete-history">
						<h5>{fa11}</h5>
						<div className="info-news-warning-lord">
							<p>
								{fa5} {WarningDelete.id}
							</p>
							<p>
								{fa1}
								{WarningDelete.titre}
							</p>
							<p>
								{fa3}
								{WarningDelete.title}
							</p>
							<p>
								{fa10}
								{(WarningDelete.category === "politic" && "سیاست") ||
									(WarningDelete.category === "economy" && "اقتصاد") ||
									(WarningDelete.category === "social" && "جامعه") ||
									(WarningDelete.category === "sport" && "ورزش") ||
									(WarningDelete.category === "local" && "بومی")}
							</p>
							<p>
								{fa2} {WarningDelete.author}
							</p>
						</div>
						<div className="btn-history-warning-lord">
							<button onClick={() => setWarningDelete({ ...WarningDelete, id: null, titre: "", title: "", category: "", author: "" })}>{fa9}</button>
							<button onClick={() => handelDeleteNews(WarningDelete.id)}>{fa8}</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
