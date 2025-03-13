import React, { useEffect, useState } from "react";
import "./comment.css";
import { AxiosInstance } from "../../../../../axiosInstance";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Comment() {
	const navigate = useNavigate();
	const [Comment, setComment] = useState([]);
	useEffect(() => {
		const FetchData = async () => {
			await AxiosInstance({
				method: "get",
				url: "user/get-comments",
				withCredentials: true,
			})
				.then((success) => {
					setComment(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		FetchData();
	}, []);

	const fa1 = "عنوان خبر : ";
	const fa2 = "نویسنده : ";
	const fa3 = "نظر شما : ";
	const fa4 = "انتشار : ";
	const fa5 = "کد خبر : ";
	return (
		<div className="container-comment-panel-user">
			<div className="content-comment-panel-user">
				<h5>نظرات من</h5>
				{Comment.length > 0 &&
					Comment.map((e, i) => (
						<div
							key={i}
							onClick={() => {
								navigate(`/news/${e.news.id}`);
								setTimeout(() => {
									const section = document.getElementById(`${e.id}comment`);
									section.scrollIntoView({
										behavior: "instant",
									});
								}, 500);
							}}
							className="items-comment-panel-user"
						>
							<div className="info-comment-panel-user">
								<div className="user-panel-news-title">
									<h5>{fa1}</h5>
									<span>{e.news.News_Title}</span>
								</div>
							</div>
							<div className="text-comment-panel-user">
								<h5>{fa3}</h5>
								<p>{e.Comment_Content}</p>
							</div>
							<div className="abut-news-user-comment">
								<div className="side-right-about">
									<div className="author-news-user">
										<h5>{fa2}</h5>
										<img src={e.news.admin.Default_Image} alt="img" />
										<span>{e.news.admin.Admin_FirstName + " " + e.news.admin.Admin_LastName}</span>
									</div>
									<div className="createdAt-news-user">
										<h5>{fa4}</h5>
										<span>{moment(e.news.createdAt).fromNow()}</span>
									</div>
								</div>
								<div className="side-lift-about">
									<div className="code-news-likes">
										{fa5}
										<p>{e.news.id}</p>
									</div>
									<div className="count-visit-news">
										<i className="fa fa-eye" aria-hidden="true"></i>
										<p>{e.news.Visit_Count}</p>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
