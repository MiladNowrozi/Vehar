import "./news.css";
import { Link, useLocation } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { PageMenu } from "../../components/app/header/pageMenu/PageMenu";
import { AxiosInstance } from "../../axiosInstance.js";
import { AnimationRed } from "../../animations/Animation.jsx";
import { AuthContext } from "../../context/authContext.js";
export const News = () => {
	const { CurrentUser } = useContext(AuthContext);
	const [news, setNews] = useState({
		CurrentNews: [],
		SendSpecial: [],
		SendChosen: [],
		Comments: [],
		Likes: [],
	});
	const [ReceiveComment, setReceiveComment] = useState([]);
	const [ReceiveResponse, setReceiveResponse] = useState([]);
	const [ReceiveResResponse, setReceiveResResponse] = useState([]);
	const [ReceiveResToRes, setReceiveResToRes] = useState([]);
	const NewsId = useLocation().pathname.split("/")[2];
	// const [refreshKey, setRefreshKey] = useState(0);
	useEffect(() => {
		const FetchData = async () => {
			try {
				await AxiosInstance({
					method: "get",
					url: `/news/get?id=${NewsId}`,
				})
					.then((success) => {
						const { CurrentNews, SendSpecial, SendChosen, Comments } = success.data.body;
						console.log(success.data.body);

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
				.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })
				.split("T")[0],
		},
		{ TimeCreate: new Date(news.CurrentNews.createdAt).toTimeString().split(" ")[0] },
	];
	const SubmitComment = async (e) => {
		e.preventDefault();
		await AxiosInstance({
			method: "get",
			url: `/news/comment?text=${CommentsValue}&newsId=${news.CurrentNews.id}`,
		})
			.then((success) => {
				setCommentsValue("");
				document.getElementById("textarea-comment").value = "";
				document.querySelector(".content-comment-form").style.display = "none";
				document.querySelector(".result-send-comment").innerHTML = success.data.message;
				setTimeout(() => {}, [5000]);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [CommentsValue, setCommentsValue] = useState("");
	const [newResponse, setNewResponse] = useState("");
	const [newResToResponse, setNewResToResponse] = useState("");
	const [newResToRes, setNewResToRes] = useState("");
	const [activeCommentId, setActiveCommentId] = useState(null);
	const [activeResponseId, setActiveResponseId] = useState(null);
	const [activeResToResponseId, setActiveResToResponseId] = useState(null);
	const [activeResToResId, setActiveResToResId] = useState(null);
	//
	const handleResponseSubmit = async (commentId) => {
		await AxiosInstance({
			method: "post",
			url: `/news/responses?text=${newResponse}&commentId=${commentId}`,
		})
			.then((response) => {
				setReceiveResponse(response.data.body);
			})
			.catch((err) => {
				console.log(err);
			});

		setNewResponse("");
		setActiveCommentId(null);
	};
	//
	const handleResToResponseSubmit = async (resId) => {
		await AxiosInstance({
			method: "post",
			url: `/news/res-to-responses?text=${newResToResponse}&resId=${resId}`,
		})
			.then((response) => {
				setReceiveResResponse(response.data.body);
			})
			.catch((err) => {
				console.log(err);
			});

		setNewResToResponse("");
		setActiveResToResponseId(null);
	};
	//
	const ResToRes = async (resToResId) => {
		await AxiosInstance({
			method: "post",
			url: `/news/res-to-res?text=${newResToRes}&resToResId=${resToResId}`,
		})
			.then((response) => {
				setNewResToRes("");
				setActiveResToResId(null);
				setReceiveResToRes(response.data.body);
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
															<h1 className="RoutingNewsHeader-left" dangerouslySetInnerHTML={{ __html: e.News_Titre }}></h1>
															<Link to={`/news/${e.id}`} className="titleNews-left">
																<h1 className="HeadlineNewsHeader-left" dangerouslySetInnerHTML={{ __html: e.News_Title }}></h1>
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
														<h1 dangerouslySetInnerHTML={{ __html: news.CurrentNews.News_Title }}></h1>
													</div>
													<div className="content-center-current-news">
														<p dangerouslySetInnerHTML={{ __html: news.CurrentNews.News_Content }}></p>
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
																	<h1 className="HeadlineNewsHeader-Right" dangerouslySetInnerHTML={{ __html: News.News_Title }}></h1>
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
				{news.Comments.length > 0 && (
					<div className="container-comments">
						{news.Comments.map((e, i) => (
							<div key={i} className="content-comments">
								<div className="item-comment">
									<div className="info-user">
										<img src={e.user.User_Img} alt="img" />
										<p>{e.user.User_FirstName + " " + e.user.User_LastName + " :"}</p>
									</div>
									<div className="text-comment">
										<p>{e.Comment_Content}</p>
									</div>
									<div className="btn-reply-and-likes">
										<button
											type="button"
											onClick={() => {
												activeCommentId === e.id ? setActiveCommentId("") : setActiveCommentId(e.id);
												setActiveResponseId("");
												setActiveResToResId("");
												setActiveResToResponseId("");
											}}
										>
											پاسخ
										</button>
										<div className="like-comment">
											<section className="like-up">
												<div
													onClick={async () => {
														await AxiosInstance({
															method: "post",
															url: `/news/like?type=comment&id=${e.id}`,
														})
															.then((success) => {
																document.getElementById("like-up" + e.id).textContent = success.data.body.Like_Comment;
																document.getElementById("like-down" + e.id).textContent = success.data.body.UnLike_Comment;
																document.getElementById("refresh-like").textContent = success.data.body.Like_Count;
															})
															.catch((err) => {
																console.log(err);
															});
													}}
													className="fa fa-thumbs-up"
												></div>
												<p id={"like-up" + e.id} className="like-up">
													{e.Like_Comment}
												</p>
											</section>
											<section className="like-down">
												<div
													className="fa fa-thumbs-down"
													onClick={async () => {
														await AxiosInstance({
															method: "post",
															url: `/news/like?type=uncomment&id=${e.id}`,
														})
															.then((success) => {
																document.getElementById("like-up" + e.id).textContent = success.data.body.Like_Comment;
																document.getElementById("like-down" + e.id).textContent = success.data.body.UnLike_Comment;
																document.getElementById("refresh-like").textContent = success.data.body.Like_Count;
															})
															.catch((err) => {
																console.log(err);
															});
													}}
												></div>
												<p id={"like-down" + e.id} className="like-down">
													{e.UnLike_Comment}
												</p>
											</section>
										</div>
									</div>
								</div>
								<div className="question">
									<div className="container-reply">
										{activeCommentId === e.id && (
											<div className="reply-match-id-comment">
												<textarea
													value={newResponse}
													onChange={(e) => {
														setNewResponse(e.target.value);
													}}
													placeholder={`پاسخ به ${e.user.User_FirstName + " " + e.user.User_LastName + " :"}`}
												></textarea>
												<button type="button" onClick={() => handleResponseSubmit(e.id)}>
													ارسال
												</button>
											</div>
										)}
									</div>
									<div className="container-responses">
										{e.responses.length > 0 && (
											<div className="content-response">
												<div className="title-saying">
													<h4>
														بحث با <p>{e.user.User_FirstName + " " + e.user.User_LastName}</p>
													</h4>
												</div>
												{e.responses.map((response, index) => (
													<div key={index} className="content-map-responses">
														<div className="item-map-responses">
															<div className="info-user-response">
																<img src={response.user.User_Img} alt="img" />
																<p>{response.user.User_FirstName + " " + response.user.User_LastName + " :"}</p>
															</div>
															<div className="text-comment-response">
																<p>{response.Responses_Content}</p>
															</div>
															<div className="reply-to-response">
																<button
																	type="button"
																	onClick={() => {
																		activeResponseId === response.id ? setActiveResponseId("") : setActiveResponseId(response.id);
																		setActiveResToResId("");
																		setActiveCommentId("");
																		setActiveResToResponseId("");
																	}}
																>
																	پاسخ
																</button>
															</div>
															<div className="container-reply">
																{activeResponseId === response.id && (
																	<div className="reply-match-id-comment">
																		<textarea
																			value={newResToResponse}
																			onChange={(e) => {
																				setNewResToResponse(e.target.value);
																			}}
																			placeholder={`پاسخ به ${response.user.User_FirstName + " " + response.user.User_LastName + " :"}`}
																		></textarea>
																		<button type="button" onClick={() => handleResToResponseSubmit(response.id)}>
																			ارسال
																		</button>
																	</div>
																)}
															</div>
														</div>
														<div className="container-res-to-responses">
															{(ReceiveResResponse.length === 0 &&
																response.resToResponses.length > 0 &&
																response.resToResponses.map((resToResponses, index) => (
																	<div key={index} className="content-map-res">
																		<div>
																			{resToResponses.responsesId === response.id && (
																				<div>
																					<div className="info-user-res">
																						<img src={resToResponses.user.User_Img} alt="img" />
																						<p>{resToResponses.user.User_FirstName + " " + resToResponses.user.User_LastName + " :"}</p>
																					</div>
																					<div className="text-comment-res">
																						<p>{resToResponses.ResToResponses_Content}</p>
																					</div>
																					<div className="reply-to-res">
																						<button
																							type="button"
																							onClick={() => {
																								activeResToResponseId === resToResponses.id
																									? setActiveResToResponseId("")
																									: setActiveResToResponseId(resToResponses.id);
																								setActiveCommentId("");
																								setActiveResponseId("");
																								setActiveResToResId("");
																								setNewResToRes("");
																							}}
																						>
																							پاسخ
																						</button>
																					</div>
																				</div>
																			)}
																		</div>
																		<div className="container-reply">
																			{activeResToResponseId === resToResponses.id && (
																				<div className="reply-match-id-comment">
																					<textarea
																						value={newResToRes}
																						onChange={(e) => {
																							setNewResToRes(e.target.value);
																						}}
																						placeholder={`پاسخ به ${
																							resToResponses.user.User_FirstName + " " + resToResponses.user.User_LastName
																						}`}
																					></textarea>
																					<button type="button" onClick={() => ResToRes(resToResponses.id)}>
																						ارسال
																					</button>
																				</div>
																			)}
																		</div>
																		<div className="container-res-to-res">
																			{(ReceiveResToRes.length === 0 &&
																				resToResponses.resToRes.length > 0 &&
																				resToResponses.resToRes.map((resToRes, i) => (
																					<div key={i}>
																						{resToRes.resToResponsesId === resToResponses.id && (
																							<div className="content-map-res-to-res">
																								<div className="info-user-res-to-res">
																									<img src={resToRes.user.User_Img} alt="img" />
																									<p>{resToRes.user.User_FirstName + " " + resToRes.user.User_LastName + " :"}</p>
																								</div>
																								<div className="text-comment-res-to-res">
																									<p>{resToRes.ResToRes_Content}</p>
																								</div>
																								<div className="reply-to-res-to-res">
																									<button
																										type="button"
																										onClick={() => {
																											activeResToResId === resToRes.id
																												? setActiveResToResId("")
																												: setActiveResToResId(resToRes.id);
																											setActiveResToResponseId("");
																											setActiveResponseId("");
																											setActiveCommentId("");
																										}}
																									>
																										پاسخ
																									</button>
																								</div>
																							</div>
																						)}
																						{activeResToResId === resToRes.id && (
																							<div className="reply-match-id-res-to-res">
																								<textarea
																									value={newResToRes}
																									onChange={(e) => {
																										setNewResToRes(e.target.value);
																									}}
																									placeholder={`پاسخ به ${
																										resToRes.user.User_FirstName + " " + resToRes.user.User_LastName + " :"
																									}`}
																								></textarea>
																								<button type="button" onClick={() => ResToRes(resToRes.id)}>
																									ارسال
																								</button>
																							</div>
																						)}
																					</div>
																				))) ||
																				ReceiveResToRes.map((res, i) => (
																					<div key={i}>
																						<div>
																							<div className="info-user-res-to-res">
																								<img src={res.user.User_Img} alt="img" />
																								<p>{res.user.User_FirstName + " " + res.user.User_LastName}</p>
																							</div>
																							<div className="text-comment-res">
																								<p>{res.ResToResponses_Content}</p>
																							</div>
																							<div className="reply-to-res">
																								<button
																									type="button"
																									onClick={() => {
																										activeResToResId === res.id ? setActiveResToResId("") : setActiveResToResId(res.id);
																										setActiveResToResponseId("");
																										setActiveResponseId("");
																										setActiveCommentId("");
																									}}
																								>
																									پاسخ
																								</button>
																							</div>
																						</div>
																						{activeResToResId === res.id && (
																							<div>
																								<div className="reply-match-id-comment">
																									<textarea
																										value={newResToRes}
																										onChange={(e) => {
																											setNewResToRes(e.target.value);
																										}}
																										placeholder={`پاسخ به ${res.user.User_FirstName + " " + res.user.User_LastName + " :"}`}
																									></textarea>
																									<button type="button" onClick={() => ResToRes(res.id)}>
																										ارسال
																									</button>
																								</div>
																							</div>
																						)}
																					</div>
																				))}
																		</div>
																	</div>
																))) ||
																ReceiveResResponse.map((res, index) => (
																	<div key={index} className="content-map-res">
																		<div>
																			{res.responsesId === response.id && (
																				<div>
																					<div className="info-user-res">
																						<img src={res.user.User_Img} alt="img" />
																						<p>{res.user.User_FirstName + " " + res.user.User_LastName}</p>
																					</div>
																					<div className="text-comment-res">
																						<p>{res.ResToResponses_Content}</p>
																					</div>
																					<div className="reply-to-res">
																						<button
																							type="button"
																							onClick={() => {
																								activeResToResponseId === res.id
																									? setActiveResToResponseId("")
																									: setActiveResToResponseId(res.id);
																								setActiveResponseId("");
																								setActiveResToResId("");
																								setActiveCommentId("");
																							}}
																						>
																							پاسخ
																						</button>
																					</div>
																				</div>
																			)}
																		</div>
																		<div className="container-reply">
																			{activeResToResponseId === res.id && (
																				<div className="reply-match-id-comment">
																					<textarea
																						value={newResToRes}
																						onChange={(e) => {
																							setNewResToRes(e.target.value);
																						}}
																						placeholder={`پاسخ به ${response.user.User_FirstName + " " + response.user.User_LastName + " :"}`}
																					></textarea>
																					<button type="button" onClick={() => ResToRes(res.id)}>
																						ارسال
																					</button>
																				</div>
																			)}
																		</div>
																	</div>
																))}
														</div>
													</div>
												))}
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
							<div className="result-send-comment"></div>
							<div className="content-comment-form">
								<div className="form-comment">
									<form id="usr-form">
										<textarea
											id="textarea-comment"
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
