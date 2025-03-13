import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AxiosInstance } from "../../../../../axiosInstance";
import "./history.css";

export default function History() {
	const [History, setHistory] = useState([]);

	const fa1 = "تیتر خبر : ";
	const fa2 = "نویسنده : ";
	const fa3 = "عنوان خبر : ";
	const fa4 = "انتشار : ";
	const fa5 = "کد خبر : ";
	const fa6 = "سابقه مرور شما در اینجا نمایش داده می شود .";
	const fa7 = "سابقه شما در سه روز گذشته .";
	console.log(History);

	useEffect(() => {
		const FetchData = async () => {
			await AxiosInstance({
				method: "get",
				url: "user/history",
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
	}, []);

	return (
		<div className="container-history-news">
			<div className="history-content-news">
				{History.length > 0 && <p className="p-info">{fa7}</p>}
				{(History.length > 0 &&
					History.map((e, i) => (
						<div className="history-items-news">
							<Link to={`/news/${e.news.id}`} className="Link-history-User">
								<div className="news-titre">
									<h5>{fa1}</h5>
									<p>{e.news.News_Titre}</p>
								</div>
								<div className="news-title">
									<h5>{fa3}</h5>
									<p>{e.news.News_Title}</p>
								</div>
								<div className="news-about">
									<div className="side-right-history">
										<div className="author-news-history">
											<h5>{fa2}</h5>
											<img src={e.news.admin.Default_Image} alt="img" />
											<span>{e.news.admin.Admin_FirstName + " " + e.news.admin.Admin_LastName}</span>
										</div>
										<div className="createdAt-news-history">
											<h5>{fa4}</h5>
											<span>{moment(e.news.createdAt).fromNow()}</span>
										</div>
									</div>
									<div className="side-lift-history">
										<div className="history-user">
											<i className={e.Like_News ? "fa fa-heart green" : "fa fa-heart"}></i>
											<p>{e.news.Like_Count}</p>
										</div>
										<div className="code-history-history">
											{fa5}
											<p>{e.news.id}</p>
										</div>
										<div className="count-visit-history">
											<i className="fa fa-eye" aria-hidden="true"></i>
											<p>{e.news.Visit_Count}</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))) || <p>{fa6}</p>}
			</div>
		</div>
	);
}
