import "./news.css";
import { Link, useLocation } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { PageMenu } from "../../components/app/header/pageMenu/PageMenu";
import { AxiosInstance } from "../../axiosInstance.js";
import { AnimationRed } from "../../animations/Animation.jsx";
import { AuthContext } from "../../context/authContext.js";
import moment from "moment";
import("moment/locale/fa");
moment.locale("fa");
export const News = () => {
	const { CurrentUser } = useContext(AuthContext);
	const [news, setNews] = useState({
		CurrentNews: [],
		SendSpecial: [],
		SendChosen: [],
		Comments: [],
		Likes: [],
	});
	const NewsId = useLocation().pathname.split("/")[2];
	useEffect(() => {
		const FetchData = async () => {
			try {
				await AxiosInstance({
					method: "get",
					url: `/news/get?id=${NewsId}`,
				})
					.then((success) => {
						const { CurrentNews, SendSpecial, SendChosen, Comments } = success.data.body;
						setNews((prov) => ({
							...prov,
							CurrentNews: CurrentNews,
							SendSpecial: SendSpecial,
							SendChosen: SendChosen,
							Comments: Comments,
							Likes: success.data.body.Likes,
						}));
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		FetchData();
		console.log("yes11");
	}, [NewsId]);
	const [DateC, TimeC] = [
		{
			DateCreate: new Date(news.CurrentNews.createdAt)
				.toLocaleDateString("fa-IR", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
				.split("T")[0],
		},
		{
			TimeCreate: new Date(news.CurrentNews.createdAt).toTimeString().split(" ")[0],
		},
	];
	const [CommentsValue, setCommentsValue] = useState("");
	const [newResponse, setNewResponse] = useState("");
	const [newResToRes, setNewResToRes] = useState("");
	const [activeCommentId, setActiveCommentId] = useState(null);
	const [activeResponseId, setActiveResponseId] = useState(null);
	// =========================
	const SubmitComment = async (e) => {
		e.preventDefault();
		await AxiosInstance({
			method: "get",
			url: `/news/comment?text=${CommentsValue}&newsId=${news.CurrentNews.id}`,
		})
			.then((success) => {
				setNews((prov) => ({
					...prov,
					Comments: success.data.body.Comments,
				}));
				document.querySelector(".result-send-comment").innerHTML = success.data.message;
				setCommentsValue("");
				setNewResponse("");
				setNewResToRes("");
				setActiveCommentId(null);
				setActiveResponseId(null);

				setTimeout(() => {
					const GoToResponse = document.getElementById(success.data.body.newCommentId + "comment");
					if (GoToResponse) {
						GoToResponse.scrollIntoView({
							behavior: "smooth",
						});
					}
				}, 1000);
				setTimeout(() => {
					const GoToResponse = document.getElementById(success.data.body.newCommentId + "comment");
					if (GoToResponse) {
						document.querySelector(".result-send-comment").innerHTML = "";
					} else {
						setTimeout(() => {
							document.querySelector(".result-send-comment").innerHTML = "";
						}, 5000);
					}
				}, 5000);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// =========================
	const SubmitResponse = async (commentId) => {
		await AxiosInstance({
			method: "post",
			url: `/news/responses?type=response&text=${newResponse}&commentId=${commentId}`,
		})
			.then((response) => {
				setNews((prov) => ({
					...prov,
					Comments: response.data.body.UpdateResponses,
				}));
				document.getElementById(commentId + "container-responses").style.display = "block";
				setCommentsValue("");
				setNewResponse("");
				setNewResToRes("");
				setActiveCommentId(null);
				setActiveResponseId(null);

				setTimeout(() => {
					const GoToResponse = document.getElementById(response.data.body.currentResponses + "response");
					if (GoToResponse) {
						GoToResponse.scrollIntoView({
							behavior: "smooth",
						});
					}
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// =========================
	const SubmitResponseToRes = async (responseId, i) => {
		await AxiosInstance({
			method: "post",
			url: `/news/responses?type=ResToResponse&text=${newResToRes}&ResToResponseId=${responseId}`,
		})
			.then((response) => {
				setNews((prov) => ({
					...prov,
					Comments: response.data.body.UpdateResToResponse,
				}));
				document.getElementById(responseId + "response").style.display = "block";
				setCommentsValue("");
				setNewResponse("");
				setNewResToRes("");
				setActiveCommentId(null);
				setActiveResponseId(null);

				setTimeout(() => {
					const GoToResponse = document.getElementById(response.data.body.currentResToResponse + "response");
					if (GoToResponse) {
						GoToResponse.scrollIntoView({
							behavior: "smooth",
						});
					}
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Fragment>
			<div className="bodyHome">
				<div className="ResultNewsHeader">
					<PageMenu />
					<div className="ResultNewsContainer">
						<div className="ResultNewsContent">
							<div className="Default_News_Container_Left">
								<div className="Content-anim-chosen">
									<span className="span-anim-chosen">
										<p>منتخب</p>
									</span>
									<AnimationRed />
								</div>
								<div className="ContainerLeft">
									{news.SendSpecial.sort((a, b) => b.id - a.id).map((e, i) => (
										<div key={i} className="ContainerHeaderLeft">
											<div className="NewsContainer-left">
												<div className="NewsContent-left">
													<div className="NewsItems-left">
														<div className="img-content-left">
															<Link to={`/news/${e.id}`} className="ImgNews-left">
																<img className="imgStyleHeader-left" src={e.News_Images} alt="imgs" />
															</Link>
														</div>
														<div className="RoutingNews-left">
															<h1
																className="RoutingNewsHeader-left"
																dangerouslySetInnerHTML={{
																	__html: e.News_Titre,
																}}
															></h1>
															<Link to={`/news/${e.id}`} className="titleNews-left">
																<h1
																	className="HeadlineNewsHeader-left"
																	dangerouslySetInnerHTML={{
																		__html: e.News_Title,
																	}}
																></h1>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							{(news.CurrentNews.Category && (
								<div className="Result_News_Container_Center">
									<div className="content-info-news">
										<div className="path-news">
											<div className="back-to-home-page">
												<Link to={"/"} className="Link-back-to-home-page">
													صفحه اصلی
												</Link>
											</div>
											<div className="news-path-category">
												<Link to={`/?cat=${news.CurrentNews.Category}`} className="Link-news-path-category">
													{(news.CurrentNews.Category === "politic" && "سیاست") ||
														(news.CurrentNews.Category === "economy" && "اقتصاد") ||
														(news.CurrentNews.Category === "social" && "جامعه") ||
														(news.CurrentNews.Category === "sport" && "ورزش") ||
														(news.CurrentNews.Category === "local" && "بومی")}
												</Link>
											</div>
											<div className="news-path-sub-category">
												<Link className="Link-news-path-sub-category">{news.CurrentNews.SubCategory}</Link>
											</div>
										</div>
										<div className="date-news">
											<span>{DateC.DateCreate}</span>
											<span>{TimeC.TimeCreate}</span>
										</div>
									</div>
									<div className="Result_News_Content_Center">
										<div className="News_Result_Select_User">
											<section className="Section_News_Result">
												<div className="News_Result">
													<div className="Title_Result">
														<h6>{news.CurrentNews.News_Titre}</h6>
														<h1
															dangerouslySetInnerHTML={{
																__html: news.CurrentNews.News_Title,
															}}
														></h1>
													</div>
													<div className="content-center-current-news">
														<p
															dangerouslySetInnerHTML={{
																__html: news.CurrentNews.News_Content,
															}}
														></p>
													</div>
												</div>
											</section>
										</div>
									</div>
								</div>
							)) || <img src="http://localhost:5000/get-images?name=/2024/03/171006679.jpg" alt="img" />}
							<div className="Default_News_Container_Right">
								<div className="Content-anim-Special">
									<span className="span-anim-Special">
										<p>اخبار ویژه</p>
									</span>
									<AnimationRed />
								</div>
								<div className="ContainerRight">
									{news.SendChosen.sort((a, b) => a.id - b.id).map((News, i) => (
										<div key={i} className="ContainerHeaderRight">
											<div className="NewsContainer-Right">
												<div className="NewsContent-Right">
													<div className="NewsItems-Right">
														<div className="img-content-Right">
															<Link to={`/news/${News.id}`} className="ImgNews-Right">
																<img className="imgStyleHeader-Right" src={News.News_Images} alt="imgs" />
															</Link>
														</div>
														<div className="RoutingNews-Right">
															<div>
																<h1 className="RoutingNewsHeader-Right">{News.News_Titre}</h1>
																<Link to={`/news/${News.id}`} className="titleNews-Right">
																	<h1
																		className="HeadlineNewsHeader-Right"
																		dangerouslySetInnerHTML={{
																			__html: News.News_Title,
																		}}
																	></h1>
																</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				{news.Comments?.length > 0 && (
					<div className="container-comments">
						{news.Comments.map((comment, i) => (
							<div key={i} id={comment.id + "comment"} className="content-comments">
								<div className="item-comment">
									<div className="info-user">
										<img src={comment.user.User_Img} alt="img" />
										<p>{comment.user.User_FirstName + " " + comment.user.User_LastName}</p>
									</div>
									<div className="text-comment">
										<p>{comment.Comment_Content}</p>
									</div>
									<div className="btn-reply-and-likes">
										<button
											type="button"
											onClick={() => {
												activeCommentId === comment.id ? setActiveCommentId(null) : setActiveCommentId(comment.id);
												setCommentsValue("");
												setNewResponse("");
												setNewResToRes("");
												setActiveResponseId(null);
											}}
										>
											پاسخ
										</button>
										{comment.responses.length > 0 && (
											<div className="div-fa-comment">
												<span>{comment.responses.length}</span>
												<span
													onClick={() => {
														if (document.getElementById(comment.id + "container-responses").style.display !== "none") {
															document.getElementById(comment.id + "container-responses").style.display = "none";
														} else {
															document.getElementById(comment.id + "container-responses").style.display = "block";
														}
													}}
													className="fa fa-comments"
												></span>
											</div>
										)}
										<div className="like-comment-container">
											<div className="date-comment-content">
												<p>{moment(comment.createdAt).fromNow()}</p>
											</div>
											<div className="like-comment-content">
												<section className="like-up">
													<div
														onClick={async () => {
															await AxiosInstance({
																method: "post",
																url: `/news/like?type=comment&id=${comment.id}`,
															})
																.then((success) => {
																	document.getElementById("like-up" + comment.id).textContent = success.data.body.Like_Comment;
																	document.getElementById("like-down" + comment.id).textContent = success.data.body.UnLike_Comment;
																	document.getElementById("refresh-like").textContent = success.data.body.Like_Count;
																})
																.catch((err) => {
																	console.log(err);
																});
														}}
														className="fa fa-thumbs-up"
													></div>
													<p id={"like-up" + comment.id} className="like-up">
														{comment.Like_Comment}
													</p>
												</section>
												<section className="like-down">
													<div
														className="fa fa-thumbs-down"
														onClick={async () => {
															await AxiosInstance({
																method: "post",
																url: `/news/like?type=uncomment&id=${comment.id}`,
															})
																.then((success) => {
																	document.getElementById("like-up" + comment.id).textContent = success.data.body.Like_Comment;
																	document.getElementById("like-down" + comment.id).textContent = success.data.body.UnLike_Comment;
																	document.getElementById("refresh-like").textContent = success.data.body.Like_Count;
																})
																.catch((err) => {
																	console.log(err);
																});
														}}
													></div>
													<p id={"like-down" + comment.id} className="like-down">
														{comment.UnLike_Comment}
													</p>
												</section>
											</div>
										</div>
									</div>
								</div>
								<div className="question">
									<div className="container-reply">
										{activeCommentId === comment.id && (
											<div className="reply-match-id-comment">
												<textarea
													value={newResponse}
													onChange={(e) => {
														setNewResponse(e.target.value);
													}}
													placeholder={`پاسخ به ${comment.user.User_FirstName + " " + comment.user.User_LastName}`}
												></textarea>
												<button
													type="button"
													onClick={() => {
														SubmitResponse(comment.id);
													}}
												>
													ارسال
												</button>
											</div>
										)}
									</div>
									<div style={{ display: "none" }} id={comment.id + "container-responses"} className="container-responses">
										{comment.responses.length > 0 && (
											<div className="content-response">
												{comment.responses.map(
													(response1, index) =>
														response1.commentId === comment.id && (
															<div
																key={index}
																id={response1.id + "response"}
																className={
																	response1.Role_Responses === "Lord"
																		? "item-map-responses-Lord"
																		: response1.Role_Responses === "OnAuthor" && response1.userId === news.CurrentNews.AuthorId
																		? "item-map-responses-OnAuthor"
																		: response1.Role_Responses === comment.Role_Comment
																		? "item-map-responses-main"
																		: "item-map-responses"
																}
															>
																<div id="info-user-response" className="info-user-response">
																	<img src={response1.user.User_Img} alt="img" />
																	<div>
																		<p>{response1.user.User_FirstName + " " + response1.user.User_LastName}</p>
																		در پاسخ به
																		<p
																			onClick={() => {
																				const id = comment.responses.find((e) => response1.ResponsesToRes === e.id)?.id;
																				const section = document.getElementById(id ? id + "response" : comment.id + "comment");
																				if (section) {
																					section.scrollIntoView({
																						behavior: "smooth",
																					});
																					section.children[0].children[0].style.backgroundColor = "#0000009c";
																				}
																				setTimeout(() => {
																					section.children[0].children[0].style.backgroundColor = "#09008659";
																				}, 1000);
																			}}
																		>
																			{comment.responses.find((e) => response1.ResponsesToRes === e.id)
																				? comment.responses.find((e) => response1.ResponsesToRes === e.id).user.User_FirstName +
																				  " " +
																				  comment.responses.find((e) => response1.ResponsesToRes === e.id).user.User_LastName
																				: comment.user.User_FirstName + " " + comment.user.User_LastName}
																		</p>
																	</div>
																</div>
																<div className="text-comment-response">
																	<p>{response1.Responses_Content}</p>
																</div>
																<div className="reply-to-response">
																	<button
																		type="button"
																		onClick={() => {
																			activeResponseId === response1.id ? setActiveResponseId(null) : setActiveResponseId(response1.id);
																			setCommentsValue("");
																			setNewResponse("");
																			setNewResToRes("");
																			setActiveCommentId(null);
																		}}
																	>
																		پاسخ
																	</button>
																	<div className="date-response-content">
																		<p>{moment(response1.createdAt).fromNow()}</p>
																	</div>
																</div>
																<div className="container-reply">
																	{activeResponseId === response1.id && (
																		<div className="reply-match-id-comment">
																			<textarea
																				value={newResToRes}
																				onChange={(e) => {
																					setNewResToRes(e.target.value);
																				}}
																				placeholder={`پاسخ به ${response1.user.User_FirstName + " " + response1.user.User_LastName}`}
																			></textarea>
																			<button
																				type="button"
																				onClick={() =>
																					SubmitResponseToRes(
																						response1.id,
																						comment.responses.find((e) => response1.ResponsesToRes === e.id)?.id ? "response" : "comment"
																					)
																				}
																			>
																				ارسال
																			</button>
																		</div>
																	)}
																</div>
															</div>
														)
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
				<div className="container-comment">
					{(CurrentUser && (
						<div className="content">
							<div className="like-news-user">
								<span id="refresh-like">{news.Likes.Like_Count}</span>
								<i
									className="fa fa-heart"
									onClick={async () => {
										await AxiosInstance({
											method: "post",
											url: `/news/like?type=news&id=${news.CurrentNews.id}`,
										})
											.then((success) => {
												document.getElementById("refresh-like").textContent = success.data.body.Like_Count;
											})
											.catch((err) => {
												console.log(err);
											});
									}}
								></i>
							</div>
							<div style={{ color: "#fff" }} className="result-send-comment"></div>
							<div className="content-comment-form">
								<div className="form-comment">
									<form id="usr-form">
										<textarea
											id="textarea-comment"
											value={CommentsValue}
											onChange={(e) => {
												setCommentsValue(e.target.value);
											}}
											form="usr-form"
											placeholder="عکس العمل شما نسبت به این خبر چیه ؟"
										></textarea>
										<input type="button" onClick={SubmitComment} value={"ارسال نظر"} />
									</form>
								</div>
							</div>
						</div>
					)) ||
						"لطفاً جهت نظر دهی ابتدا وارد حساب خود شوید !"}
				</div>
			</div>
		</Fragment>
	);
};
