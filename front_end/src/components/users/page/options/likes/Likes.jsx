import React, { useContext, useEffect, useState } from "react";
import "./likes.css";
import { AxiosInstance } from "../../../../../axiosInstance";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../context/authContext";

export default function Likes() {
	const [Likes, setLikes] = useState([]);
	// const { CurrentUser } = useContext(AuthContext);

	useEffect(() => {
		const FetchData = async () => {
			await AxiosInstance({
				method: "get",
				url: "user/get-likes",
				withCredentials: true,
			})
				.then((success) => {
					setLikes(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		FetchData();
	}, []);

	const fa1 = "تیتر خبر : ";
	const fa2 = "نویسنده : ";
	const fa3 = "عنوان خبر : ";
	const fa4 = "انتشار : ";
	const fa5 = "کد خبر : ";
	const fa6 = "با کلیک کردن روی ❤ خبر های مورد علاقه خود را در اینجا  ذخیره کنید ! ";
	return (
		<div className="container-likes-news">
			<div className="likes-content-news">
				{(Likes.length > 0 &&
					Likes.map((e, i) => (
						<div className="likes-items-news">
							<Link to={`/news/${e.news.id}`} className="Link-Likes-User">
								<div className="news-titre">
									<h5>{fa1}</h5>
									<p>{e.news.News_Titre}</p>
								</div>
								<div className="news-title">
									<h5>{fa3}</h5>
									<p>{e.news.News_Title}</p>
								</div>
								<div className="news-about">
									<div className="side-right-likes">
										<div className="author-news-likes">
											<h5>{fa2}</h5>
											<img src={e.news.admin.Default_Image} alt="img" />
											<span>{e.news.admin.Admin_FirstName + " " + e.news.admin.Admin_LastName}</span>
										</div>
										<div className="createdAt-news-likes">
											<h5>{fa4}</h5>
											<span>{moment(e.news.createdAt).fromNow()}</span>
										</div>
									</div>
									<div className="side-lift-likes">
										<div className="likes-user">
											<i className={e.Like_News ? "fa fa-heart green" : "fa fa-heart"}></i>
											<p>{e.news.Like_Count}</p>
										</div>
										<div className="code-likes-likes">
											{fa5}
											<p>{e.news.id}</p>
										</div>
										<div className="count-visit-likes">
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
