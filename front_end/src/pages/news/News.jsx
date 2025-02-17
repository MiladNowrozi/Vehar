import "./news.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { PageMenu } from "../../components/app/header/pageMenu/PageMenu";
import { AxiosInstance } from "../../axiosInstance.js";
import { AnimationLoading, AnimationRed } from "../../animations/Animation.jsx";
import { AuthContext } from "../../context/authContext.js";
import moment from "moment";
import("moment/locale/fa");
moment.locale("fa");
export const News = () => {
	// fa language
	const fa1 = "ویرایش";
	const fa2 = "حذف";
	const fa3 = "لغو";
	const fa4 = "آیا از حذف این نظر مطمئن هستید ؟";
	const fa5 = "نویسنده :";
	const fa6 = "مالک";
	const fa7 = "کد خبر :";
	const fa8 = "تیتر خبر :";
	const fa9 = "عنوان خبر :";
	const fa10 = "آیا از حذف این خبر مطمئن هستید ؟";
	const fa11 = "لطفاً برای اظهار نظر عضو یا وارد شوید !";
	const fa12 = "این قسمت نیاز به عضویت دارد .";
	const fa13 = "عضویت";
	const fa14 = "قسمت نظرات برای این خبر توسط نویسنده بسته شده است .";
	const [editComment, setEditComment] = useState({
		id: null,
		type: "",
		content: "",
	});
	const [DeleteComment, setDeleteComment] = useState({
		id: null,
		type: "",
		newsId: null,
		commentId: null,
	});

	const { CurrentUser } = useContext(AuthContext);
	const [news, setNews] = useState({
		GetSelectedSpecial: [],
		GetSelectedNews: [],
		GetSelectedChosen: [],
	});
	console.log(news);

	const NewsId = useLocation().pathname.split("/")[2];
	useEffect(() => {
		const FetchData = async () => {
			try {
				await AxiosInstance({
					method: "get",
					url: `/news/get?id=${NewsId}&userId=${CurrentUser && CurrentUser.Info.Id}&role=${CurrentUser && CurrentUser.Info.Role}`,
				})
					.then((success) => {
						const { GetSelectedSpecial, GetSelectedNews, GetSelectedChosen } = success.data.body;
						setNews({ ...news, GetSelectedSpecial: GetSelectedSpecial, GetSelectedNews: GetSelectedNews, GetSelectedChosen: GetSelectedChosen });
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

	// const [DateC, TimeC] = [
	// 	{
	// 		DateCreate: new Date(news.GetSelectedNews.createdAt)
	// 			.toLocaleDateString("fa-IR", {
	// 				year: "numeric",
	// 				month: "long",
	// 				day: "numeric",
	// 			})
	// 			.split("T")[0],
	// 	},
	// 	{
	// 		TimeCreate: new Date(news.GetSelectedNews.createdAt).toTimeString().split(" ")[0],
	// 	},
	// ];

	const [CommentsValue, setCommentsValue] = useState("");
	const [newResponse, setNewResponse] = useState("");
	const [newResToRes, setNewResToRes] = useState("");
	const [activeCommentId, setActiveCommentId] = useState(null);
	const [activeResponseId, setActiveResponseId] = useState(null);
	// =========================
	const SubmitComment = async (e) => {
		e.preventDefault();
		if (CurrentUser) {
			await AxiosInstance({
				method: "get",
				url: `/news/comment?text=${CommentsValue}&newsId=${news.GetSelectedNews.id}`,
			})
				.then((success) => {
					setNews({
						...news,
						GetSelectedNews: {
							...news.GetSelectedNews,
							comments: success.data.body.Comments,
						},
					});
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
					document.querySelector(".result-send-comment").innerHTML = err.response?.data.message;
					setTimeout(() => {
						document.querySelector(".result-send-comment").innerHTML = "";
					}, 5000);
				});
		} else {
			setLoginComment(true);
		}
	};
	// =========================
	const CommentEdit = async () => {
		await AxiosInstance({
			method: "put",
			url: `/news/comments-edit?text=${editComment.content}&commentId=${editComment.id}&type=${editComment.type}`,
		})
			.then((success) => {
				if (success.data.body.Type === "Comment") {
					setNews({
						...news,
						GetSelectedNews: {
							...news.GetSelectedNews,
							comments: news.GetSelectedNews.comments.map((e) => (e.id === success.data.body.UpdCommentId ? (e = success.data.body.Comment) : e)),
						},
					});
					document.querySelector(".result-send-comment").innerHTML = success.data.body.Comment ? success.data.message : "";
					setEditComment({ ...editComment, id: null, type: "", content: "" });
					success.data.body.Comments &&
						setTimeout(() => {
							const GoToResponse = document.getElementById(success.data.body.UpdCommentId + "comment");
							if (GoToResponse) {
								GoToResponse.scrollIntoView({
									behavior: "smooth",
								});
							}
						}, 1000);
				} else {
					setNews({
						...news,
						GetSelectedNews: {
							...news.GetSelectedNews,
							comments: news.GetSelectedNews.comments.map((e) => ({
								...e,
								responses: e.responses.map((e) => (e.id === success.data.body.UpdResponseId ? (e = success.data.body.Response) : e)),
							})),
						},
					});
					setEditComment({ ...editComment, id: null, type: "", content: "" });
					success.data.body.Response &&
						setTimeout(() => {
							const GoToResponse = document.getElementById(success.data.body.UpdResponseId + "response");
							if (GoToResponse) {
								GoToResponse.scrollIntoView({
									behavior: "smooth",
								});
							}
						}, 1000);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// =========================
	const CommentDelete = async () => {
		await AxiosInstance({
			method: "delete",
			url: `/news/comments-delete?type=${DeleteComment.type}&id=${DeleteComment.id}&newsId=${DeleteComment.newsId}&commentId=${DeleteComment.commentId}`,
		})
			.then((success) => {
				if (success.data.body.Type === "Comment") {
					setNews({
						...news,
						GetSelectedNews: {
							...news.GetSelectedNews,
							comments: success.data.body.Comments,
						},
					});
					setDeleteComment({ ...DeleteComment, id: "", type: "", commentId: null, newsId: null });
				} else {
					setNews({
						...news,
						GetSelectedNews: {
							...news.GetSelectedNews,
							comments: news.GetSelectedNews.comments.map((e) =>
								e.id === success.data.body.CommentId ? { ...e, responses: success.data.body.Response } : e
							),
						},
					});
					setDeleteComment({ ...DeleteComment, id: "", type: "", commentId: null, newsId: null });
				}
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
				setNews({
					...news,
					GetSelectedNews: {
						...news.GetSelectedNews,
						comments: news.GetSelectedNews.comments.map((e) =>
							e.id === response.data.body.CommentId ? { ...e, responses: response.data.body.UpdateResponses } : e
						),
					},
				});
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
							behavior: "instant",
						});
					}
				}, 500);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// =========================
	const SubmitResponseToRes = async (responseId) => {
		await AxiosInstance({
			method: "post",
			url: `/news/responses?type=ResToResponse&text=${newResToRes}&ResToResponseId=${responseId}`,
		})
			.then((response) => {
				setNews({
					...news,
					GetSelectedNews: {
						...news.GetSelectedNews,
						comments: news.GetSelectedNews.comments.map((e) =>
							e.id === response.data.body.CommentId ? { ...e, responses: response.data.body.UpdateResToResponse } : e
						),
					},
				});
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
							behavior: "instant",
						});
					}
				}, 500);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [DeleteNews, setDeleteNews] = useState();
	const navigate = useNavigate();
	const handleDeleteNews = async () => {
		try {
			await AxiosInstance({
				method: "delete",
				url: `news/delete?id=${DeleteNews}`,
				withCredentials: true,
			})
				.then((success) => {
					setDeleteNews(null);
					navigate("/");
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const [loginComment, setLoginComment] = useState(null);
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
									{(news.GetSelectedSpecial.length > 0 &&
										news.GetSelectedSpecial.sort((a, b) => b.id - a.id).map((e, i) => (
											<div key={i} className="ContainerHeaderLeft">
												{console.log(e.id)}
												<div className="NewsContainer-left">
													<div className="NewsContent-left">
														<div className="NewsItems-left">
															<div className="img-content-left">
																<Link to={`/news/${e.id}`} className="ImgNews-left">
																	<img className="imgStyleHeader-left" src={e.Default_Image} alt="imgs" />
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
										))) || (
										<div className="loading-data-1">
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
										</div>
									)}
								</div>
							</div>

							{(news.GetSelectedNews.id && (
								<div className="Result_News_Container_Center">
									<div className="content-info-news">
										<div className="path-news">
											<div className="back-to-home-page">
												<Link to={"/"} className="Link-back-to-home-page">
													صفحه اصلی
												</Link>
											</div>
											<div className="news-path-category">
												<Link to={`/?cat=${news.GetSelectedNews.Category}`} className="Link-news-path-category">
													{(news.GetSelectedNews.Category === "politic" && "سیاست") ||
														(news.GetSelectedNews.Category === "economy" && "اقتصاد") ||
														(news.GetSelectedNews.Category === "social" && "جامعه") ||
														(news.GetSelectedNews.Category === "sport" && "ورزش") ||
														(news.GetSelectedNews.Category === "local" && "بومی")}
												</Link>
											</div>
											{news.GetSelectedNews.subCategoryName && (
												<div className="news-path-sub-category">
													<Link className="Link-news-path-sub-category">{news.GetSelectedNews.SubCategoryName}</Link>
												</div>
											)}
										</div>
										{(CurrentUser?.Info.Role === news.GetSelectedNews.admin.Role && CurrentUser?.Info.Id === news.GetSelectedNews.admin.id && (
											<section className="delete-edit-news">
												<Link className="Link-delete-news" to={`/admin/create-news?id=${news.GetSelectedNews.id}`}>
													<button className="fa fa-edit"></button>
												</Link>
												<button onClick={() => setDeleteNews(news.GetSelectedNews.id)} className="fa fa-trash"></button>
												{DeleteNews && (
													<div className="warning-dele-news">
														<p>{fa10}</p>
														<span>
															<p>{fa7}</p>
															<p>{news.GetSelectedNews.id}</p>
														</span>
														<span>
															<p>{fa5}</p>
															<p>{news.GetSelectedNews.admin.Admin_FirstName + " " + news.GetSelectedNews.admin.Admin_LastName}</p>
														</span>
														<span>
															<p>{fa8}</p>
															<p>{news.GetSelectedNews.News_Titre}</p>
														</span>
														<span>
															<p>{fa9}</p>
															<p>{news.GetSelectedNews.News_Title}</p>
														</span>
														<span className="btn-dele-cancel">
															<button onClick={() => setDeleteNews(null)}>{fa3}</button>
															<button onClick={handleDeleteNews}>{fa2}</button>
														</span>
													</div>
												)}
											</section>
										)) ||
											(CurrentUser?.Info.Role === "Lord" && (
												<section className="delete-edit-news">
													<Link className="Link-delete-news" to={`/admin/create-news?id=${news.GetSelectedNews.id}`}>
														<button className="fa fa-edit"></button>
													</Link>
													<button className="fa fa-trash"></button>
												</section>
											))}
										<section className="date-eye-section">
											<div className="esy-div">
												{news.GetSelectedNews.Visit_Count}
												<p className="fa fa-eye"></p>
											</div>
											<div className="date-news">
												{/* <span>{DateC.DateCreate}</span>
												<span>{TimeC.TimeCreate}</span> */}
												<i className="fas fa-calendar-alt"></i>
												<span>{moment(news.GetSelectedNews.createdAt).fromNow()}</span>
											</div>
										</section>
									</div>
									<div className="Result_News_Content_Center">
										<div className="News_Result_Select_User">
											<section className="Section_News_Result">
												<div className="News_Result">
													<div className="Title_Result">
														<h6>{news.GetSelectedNews.News_Titre}</h6>
														<h1
															dangerouslySetInnerHTML={{
																__html: news.GetSelectedNews.News_Title,
															}}
														></h1>
													</div>
													<div className="content-center-current-news">
														<p
															dangerouslySetInnerHTML={{
																__html: news.GetSelectedNews.News_Content,
															}}
														></p>
													</div>
												</div>
											</section>
										</div>
									</div>
									<div className="info-news">
										<div className="info-author">
											<div className="content-info-author">
												<img src={news.GetSelectedNews.admin.Default_Image} alt="img" />
												<section>
													<p>{news.GetSelectedNews.admin.Role === "Lord" ? fa6 : fa5}</p>
													<p>{news.GetSelectedNews.admin.Admin_FirstName + " " + news.GetSelectedNews.admin.Admin_LastName}</p>
												</section>
											</div>
										</div>
										<div className="left-info">
											<div className="code-news">
												{fa7}
												<p>{+" " + news.GetSelectedNews.id}</p>
											</div>
											<div className={news.GetSelectedNews.likes[0]?.Like_News ? "is-liked" : "like-news-user"}>
												<span>{news.GetSelectedNews.Like_Count}</span>
												<i
													className="fa fa-heart"
													onClick={async () => {
														if (CurrentUser) {
															await AxiosInstance({
																method: "post",
																url: `/news/like-news?id=${news.GetSelectedNews.id}`,
															})
																.then((success) => {
																	setNews({
																		...news,
																		GetSelectedNews: {
																			...news.GetSelectedNews,
																			Like_Count: success.data.body.news.Like_Count,
																			likes: news.GetSelectedNews.likes.map((e) => ({
																				...e,
																				Like_News: success.data.body.Like_News,
																			})),
																		},
																	});
																})
																.catch((err) => {
																	console.log(err);
																	document.getElementById("need-to-login").style.display = "block";
																	document.getElementById("need-to-login").innerHTML = err.response.data.message;
																	setTimeout(() => {
																		document.getElementById("need-to-login").style.display = "none";
																	}, 5000);
																});
														} else {
															document.getElementById("need-to-login").style.display = "block";
															setTimeout(() => {
																document.getElementById("need-to-login").style.display = "none";
															}, 5000);
														}
													}}
												></i>
												<span style={{ display: "none" }} id="need-to-login" className="need-to-login">
													{fa12}
												</span>
											</div>
										</div>
									</div>
								</div>
							)) || (
								<div className="loading-data-2">
									<AnimationLoading />
								</div>
							)}
							<div className="Default_News_Container_Right">
								<div className="Content-anim-Special">
									<span className="span-anim-Special">
										<p>اخبار ویژه</p>
									</span>
									<AnimationRed />
								</div>
								<div className="ContainerRight">
									{news.GetSelectedChosen.length > 0 ? (
										news.GetSelectedChosen.sort((a, b) => a.id - b.id).map((News, i) => (
											<div key={i} className="ContainerHeaderRight">
												<div className="NewsContainer-Right">
													<div className="NewsContent-Right">
														<div className="NewsItems-Right">
															<div className="img-content-Right">
																<Link to={`/news/${News.id}`} className="ImgNews-Right">
																	<img className="imgStyleHeader-Right" src={News.Default_Image} alt="imgs" />
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
										))
									) : (
										<div className="loading-data-3">
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
											<section>
												<AnimationLoading />
											</section>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				{news.GetSelectedNews.comments?.length > 0 && (
					<div className="container-comments">
						{news.GetSelectedNews.comments.map((comment, i) => (
							<div key={i} id={comment.id + "comment"} className="content-comments">
								<div className="item-comment">
									<div className="info-user">
										<img src={comment.user.Default_Image} alt="img" />
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
											<i className="fa fa-reply"></i>
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
										<div className="container-info-comment">
											<button
												className="but-delete-comment"
												onClick={() => {
													setDeleteComment({ ...DeleteComment, id: comment.id, type: "Comment", commentId: null, newsId: news.GetSelectedNews.id });
												}}
											>
												{fa2}
											</button>
											{DeleteComment.id && (
												<div className="warning-delete-comment">
													<p>{fa4}</p>
													<div className="btn-delete-comment">
														<button
															onClick={() => {
																setDeleteComment({ ...DeleteComment, id: null, type: "", commentId: null, newsId: null });
															}}
														>
															{fa3}
														</button>
														<button onClick={() => CommentDelete()}>{fa2}</button>
													</div>
												</div>
											)}
											<button
												className="but-edit-comment"
												onClick={() => {
													setEditComment({ ...editComment, type: "Comment", id: comment.id, content: comment.Comment_Content });
													document.getElementById("usr-form").scrollIntoView({
														behavior: "smooth",
													});
												}}
											>
												{fa1}
											</button>
											<div className="like-item-container">
												<div className="date-comment-content">
													<i className="fas fa-calendar-alt" aria-hidden="true"></i>
													<p>
														{comment.updatedAt !== comment.createdAt
															? fa1 + " : " + moment(comment.updatedAt).fromNow()
															: moment(comment.createdAt).fromNow()}
													</p>
												</div>
												<div className="like-comment-content">
													<section className="like-up">
														<div
															onClick={async () => {
																await AxiosInstance({
																	method: "post",
																	url: `/news/like-comment?status=like&id=${comment.id}`,
																})
																	.then((success) => {
																		setNews({
																			...news,
																			GetSelectedNews: {
																				...news.GetSelectedNews,
																				comments: news.GetSelectedNews.comments.map((e) =>
																					e.id === success.data.CommentId
																						? {
																								...e,
																								Like_Comment: success.data.body.comment.Like_Comment,
																								UnLike_Comment: success.data.body.comment.UnLike_Comment,
																								likes: e.likes.map((e) => ({
																									...e,
																									Like_Comment: success.data.body.Like_Comment,
																									UnLike_Comment: success.data.body.UnLike_Comment,
																								})),
																						  }
																						: e
																				),
																			},
																		});
																	})
																	.catch((err) => {
																		console.log(err);
																	});
															}}
															className={comment.likes?.[0]?.Like_Comment ? "color-like fa fa-thumbs-up" : "fa fa-thumbs-up"}
														></div>
														<p id={"like-up" + comment.id} className="like-up">
															{comment.Like_Comment}
														</p>
													</section>
													<section className="like-down">
														<div
															className={comment.likes?.[0]?.UnLike_Comment ? "color-unlike fa fa-thumbs-down" : "fa fa-thumbs-down"}
															onClick={async () => {
																await AxiosInstance({
																	method: "post",
																	url: `/news/like-comment?status=unlike&id=${comment.id}`,
																})
																	.then((success) => {
																		setNews({
																			...news,
																			GetSelectedNews: {
																				...news.GetSelectedNews,
																				comments: news.GetSelectedNews.comments.map((e) =>
																					e.id === success.data.CommentId
																						? {
																								...e,
																								Like_Comment: success.data.body.comment.Like_Comment,
																								UnLike_Comment: success.data.body.comment.UnLike_Comment,
																								likes: e.likes.map((e) => ({
																									...e,
																									Like_Comment: success.data.body.Like_Comment,
																									UnLike_Comment: success.data.body.UnLike_Comment,
																								})),
																						  }
																						: e
																				),
																			},
																		});
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
													(Response, index) =>
														Response.commentId === comment.id && (
															<div
																key={index}
																id={Response.id + "response"}
																className={
																	Response.Role_Responses === "Lord"
																		? "item-map-responses-Lord"
																		: Response.Role_Responses === "Author" && Response.userId === news.GetSelectedNews.AuthorId
																		? "item-map-responses-OnAuthor"
																		: Response.Role_Responses === comment.Role_Comment
																		? "item-map-responses-main"
																		: "item-map-responses"
																}
															>
																<div id="info-user-response" className="info-user-response">
																	<img src={Response.user.Default_Image} alt="img" />
																	<div>
																		<p>{Response.user.User_FirstName + " " + Response.user.User_LastName}</p>
																		در پاسخ به
																		<p
																			onClick={() => {
																				const id = comment.responses.find((e) => Response.ResponsesToRes === e.id)?.id;
																				const section = document.getElementById(id ? id + "response" : comment.id + "comment");
																				if (section) {
																					section.scrollIntoView({
																						behavior: "instant",
																					});
																					section.id === id + "response"
																						? (section.children[0].style.backgroundColor = "#0000009c")
																						: (section.children[0].children[0].style.backgroundColor = "#0000009c");
																				}
																				setTimeout(() => {
																					section.id === id + "response"
																						? (section.children[0].style.backgroundColor = "rgb(0, 87, 75)")
																						: (section.children[0].children[0].style.backgroundColor = "#09008659");
																				}, 1000);
																			}}
																		>
																			{comment.responses.find((e) => Response.ResponsesToRes === e.id)
																				? comment.responses.find((e) => Response.ResponsesToRes === e.id).user.User_FirstName +
																				  " " +
																				  comment.responses.find((e) => Response.ResponsesToRes === e.id).user.User_LastName
																				: comment.user.User_FirstName + " " + comment.user.User_LastName}
																		</p>
																	</div>
																</div>
																<div className="text-comment-response">
																	<p>{Response.Responses_Content}</p>
																</div>
																<div className="reply-to-response">
																	<button
																		className="send-btn-response"
																		type="button"
																		onClick={() => {
																			activeResponseId === Response.id ? setActiveResponseId(null) : setActiveResponseId(Response.id);
																			setCommentsValue("");
																			setNewResponse("");
																			setNewResToRes("");
																			setActiveCommentId(null);
																			editComment.id &&
																				setEditComment({
																					...editComment,
																					type: "",
																					id: null,
																					content: "",
																				});
																		}}
																	>
																		پاسخ
																		<i className="fa fa-reply"></i>
																	</button>
																	<div className="edit-btn-time-response">
																		<button
																			className="but-delete-response"
																			onClick={() => {
																				setDeleteComment({
																					...DeleteComment,
																					id: Response.id,
																					type: "Response",
																					newsId: null,
																					commentId: Response.commentId,
																				});
																			}}
																		>
																			{fa2}
																		</button>
																		<button
																			className="but-edit-response"
																			onClick={() => {
																				activeResponseId === Response.id ? setActiveResponseId(null) : setActiveResponseId(Response.id);
																				setCommentsValue("");
																				setNewResponse("");
																				setNewResToRes("");
																				setActiveCommentId(null);
																				setEditComment({
																					...editComment,
																					type: "Response",
																					id: Response.id,
																					content: Response.Responses_Content,
																				});
																			}}
																		>
																			{fa1}
																		</button>
																		{DeleteComment.id && (
																			<div className="warning-delete-response">
																				<p>{fa4}</p>
																				<div className="btn-delete-response">
																					<button
																						onClick={() => {
																							setDeleteComment({ ...DeleteComment, id: null, type: "", commentId: null, newsId: null });
																						}}
																					>
																						{fa3}
																					</button>
																					<button onClick={() => CommentDelete()}>{fa2}</button>
																				</div>
																			</div>
																		)}
																		<p>
																			{Response.updatedAt !== Response.createdAt
																				? fa1 + " : " + moment(Response.updatedAt).fromNow()
																				: moment(Response.createdAt).fromNow()}
																		</p>
																	</div>
																</div>
																<div className="container-reply">
																	{activeResponseId === Response.id && (
																		<div className="reply-match-id-comment">
																			<textarea
																				value={editComment.id ? editComment.content : newResToRes}
																				onChange={(e) => {
																					editComment.id
																						? setEditComment({ ...editComment, content: e.target.value })
																						: setNewResToRes(e.target.value);
																				}}
																				placeholder={
																					!editComment.id ? `پاسخ به ${Response.user.User_FirstName + " " + Response.user.User_LastName}` : ""
																				}
																			></textarea>
																			<button
																				type="button"
																				onClick={
																					editComment.id
																						? CommentEdit
																						: () =>
																								SubmitResponseToRes(
																									Response.id,
																									comment.responses.find((e) => Response.ResponsesToRes === e.id)?.id ? "response" : "comment"
																								)
																				}
																			>
																				{editComment.id ? "ویرایش" : "ارسال"}
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
					<div className="content">
						<div style={{ color: "#fff" }} className="result-send-comment"></div>
						{loginComment && (
							<div className="content-login-and-register">
								<p>{fa11}</p>
								<Link to={"/login-register"} className="Link">
									<button>{fa13}</button>
								</Link>
							</div>
						)}
						{(news.GetSelectedNews.Comment_Status === false && (
							<div className="content-comment-form">
								<div className="form-comment">
									<form id="usr-form">
										<textarea
											id="textarea-comment"
											value={editComment.id ? editComment.content : CommentsValue}
											onChange={(e) => {
												editComment.id ? setEditComment({ ...editComment, content: e.target.value }) : setCommentsValue(e.target.value);
											}}
											form="usr-form"
											placeholder="عکس العمل شما نسبت به این خبر چیه ؟"
										></textarea>
										<input type="button" onClick={editComment.id ? CommentEdit : SubmitComment} value={editComment.id ? "ویرایش" : "ارسال نظر"} />
									</form>
								</div>
							</div>
						)) || (
							<div style={{ color: "#fff" }} className="result-send-comment">
								{fa14}
							</div>
						)}
					</div>
				</div>
				<i
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						});
					}}
					className="fa fa-arrow-circle-up"
				></i>
			</div>
		</Fragment>
	);
};
