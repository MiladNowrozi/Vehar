import "./header.css";
//
import { PageMenu } from "./pageMenu/PageMenu.jsx";
import { AnimationLoading, AnimationRed } from "../../../animations/Animation.jsx";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AxiosInstance } from "../../../axiosInstance.js";
//
function Header() {
	//
	const [MostVisitedNews, SetMostVisitedNews] = useState([]);
	const [LastNews, SetLastNews] = useState([]);
	const [SliderNews, SetSliderNews] = useState({
		SliderNews: [],
		ChoiceNews: [],
		SpecialNews: [],
		SubNoteNews: [],
	});
	function oofMenuPage() {
		document.querySelector("#ContentPageMenu").style.right = "-18%";
	}
	const Urls = useLocation().search;
	useEffect(() => {
		const NewsHeader = async () => {
			await AxiosInstance({
				method: "get",
				url: `news/most-visited${Urls}`,
				withCredentials: true,
			})
				.then((success) => {
					SetMostVisitedNews(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
			await AxiosInstance({
				method: "get",
				url: `news/sliders${Urls}`,
				withCredentials: true,
			})
				.then((success) => {
					console.log(success.data.body);

					SetSliderNews((prev) => ({
						...prev,
						SpecialNews: success.data.body.SpecialNews,
						SliderNews: success.data.body.SliderNews,
						ChoiceNews: success.data.body.ChoiceNews,
						SubNoteNews: success.data.body.SubNoteNews,
					}));
				})
				.catch((e) => {
					console.log(e);
				});
			await AxiosInstance({
				method: "get",
				url: `news/last-news${Urls}`,
				withCredentials: true,
			})
				.then((success) => {
					SetLastNews(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		NewsHeader();
	}, [Urls]);
	// Ticker news api
	const [currentIndex, setCurrentIndex] = useState(0);
	const [TickerNews, setTickerNews] = useState([]);
	const Timer = 10000;
	useEffect(() => {
		const SendData = async () => {
			await AxiosInstance({
				method: "get",
				url: `news/news-tickers${Urls}`,
				withCredentials: true,
			})
				.then((success) => {
					setTickerNews(success.data.body);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		SendData();
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % TickerNews.length);
		}, Timer);
		return () => clearInterval(interval);
	}, [Urls, TickerNews.length, Timer]);

	return (
		<Fragment>
			<PageMenu />
			<div onClick={oofMenuPage} className="bodyHederHome">
				<div className="Container-Slider">
					<div className="container-ticker">
						{TickerNews.length > 0 && (
							<div className="content-ticker">
								<Link to={`/news/${TickerNews[currentIndex]?.id}`} className="link-ticker">
									<p>{TickerNews[currentIndex]?.News_Title}</p>
								</Link>
								<span></span>
								<i className="fa fa-chevron-left"></i>
							</div>
						)}
					</div>
					<div className="ContentSlider">
						<div className="ItemsSliderTextLeft">
							<div className="ContainerTextLeft">
								<div className="Content-Item-full-viewers">
									<span className="span-title-full-viewers">
										<p>پر بیننده ها</p>
									</span>
									<AnimationRed />
								</div>
								<div className="ContentTextLeft">
									<div className="TextLeft">
										{(MostVisitedNews.length > 0 &&
											MostVisitedNews.map((e) => (
												<div key={e.id} className="li-full-see">
													<Link className="link" to={`/news/${e.id}`}>
														<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
													</Link>
												</div>
											))) || (
											<div className="loading-data-4">
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
						{(SliderNews.SliderNews.length > 0 && (
							<div className="ItemsSlider">
								{SliderNews.SliderNews.sort((a, b) => b.id - a.id).map((e, i) => (
									<div key={e.id} className={"milad imgCenter" + i}>
										<Link className="link-slider-img" to={`/news/${e.id}`}>
											<img src={e.Default_Image} alt="img" />
										</Link>
										<div className="TextImgCenter">
											<div className="TextImg-1">
												<p dangerouslySetInnerHTML={{ __html: e.News_Titre }}></p>
											</div>
											<div className="TextImg-2">
												<Link className="link-slider-title" to={`/news/${e.id}`}>
													<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						)) || (
							<div className="loading-data-5">
								<section>
									<span>
										<AnimationLoading />
									</span>
									<span>
										<AnimationLoading />
									</span>
								</section>
								<section>
									<AnimationLoading />
								</section>
							</div>
						)}
					</div>
				</div>
				<div className="content-title-chosen">
					<div className="test">
						<div className="span-title-chosen">
							<p>منتخب</p>
						</div>
						<span className="span">
							<AnimationRed />
						</span>
					</div>
				</div>
				{(SliderNews.ChoiceNews.length > 0 && (
					<div className="Gallery-Row-Slider">
						{SliderNews.ChoiceNews.map((e, i) => (
							<div key={i} className="Content-Gallery">
								<Link to={`/news/${e.id}`} className="HeadlineNewsHeader-Gallery">
									<img src={e.Default_Image} alt="img" />
								</Link>
								<div className="Content-Texts-Dallery">
									<p className="RoutingNewsHeader-Gallery"> به این جمع بپیوندید!</p>
									<Link className="HeadlineNewsHeader-Gallery" to={`/news/${e.id}`}>
										<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
									</Link>
								</div>
							</div>
						))}
					</div>
				)) || (
					<div className="loading-data-6">
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
				<div className="Container-Header">
					<div className="ContainerLeft">
						<div className="content-title-note">
							<span className="span-title-note">
								<p>یادداشت</p>
							</span>
							<AnimationRed />
						</div>
						{(SliderNews.SubNoteNews.length > 0 && (
							<div className="container-note">
								{SliderNews.SubNoteNews.map((e, i) => (
									<div key={i} className="content-note">
										<div key={i} className="content-writer">
											<img src={e.Default_Image} alt="img" />
										</div>
										<div className="content-write">
											<div className="titre-note">
												<p>{e.News_Titre}</p>
											</div>
											<div className="comment-note">
												<Link to={`/news/${e.id}`}>
													<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						)) || (
							<div className="loading-data-7">
								<section>
									<AnimationLoading />
								</section>
							</div>
						)}
						<div className="Container-political">
							<div className="content-title-political-and-social">
								<span className="span-title-political-and-social">
									<p>آخرین اخبار</p>
								</span>
								<AnimationRed />
							</div>
							{(LastNews.length > 0 && (
								<div className="Container-Header-Left">
									{LastNews.map((News, i) => (
										<div key={i} className="News-Container-left" style={{ borderBottom: i === LastNews.length - 1 ? 0 : "" }}>
											<Link className="Routing-News-Header-left" to={`/news/${News.id}`}>
												<p dangerouslySetInnerHTML={{ __html: News.News_Title }}></p>
											</Link>
										</div>
									))}
								</div>
							)) || (
								<div className="loading-data-8">
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
					<div className="ContainerRight">
						<div className="content-title-special-news">
							<span className="span-title-special-news">
								<p>{`اخبار ویژه${
									(Urls.split("?cat=")[1] === "politic" && " سیاست") ||
									(Urls.split("?cat=")[1] === "economy" && " اقتصاد") ||
									(Urls.split("?cat=")[1] === "social" && " جامعه") ||
									(Urls.split("?cat=")[1] === "sport" && " ورزش") ||
									(Urls.split("?cat=")[1] === "local" && " بومی") ||
									""
								}`}</p>
							</span>
							<AnimationRed />
						</div>
						{(SliderNews.SpecialNews.length > 0 && (
							<div className="containerHeaderRight">
								{SliderNews.SpecialNews.sort((a, b) => b.id - a.id).map((News, i) => (
									<div key={i} className="NewsContainer">
										<div className="NewsContent" style={{ borderBottom: i === SliderNews.SpecialNews.length - 1 ? 0 : "" }}>
											<div className="NewsItems">
												<div className="img-content">
													<div className="ImgNews">
														<Link to={`/news/${News.id}`} className="HeadlineNewsHeader">
															<img className="imgStyleHeader" src={News.Default_Image} alt="imgs" />
														</Link>
													</div>
												</div>
												<div className="RoutingNews">
													<div>
														<h1 className="RoutingNewsHeader">یادم نرود که بتنظیمانم</h1>
														<Link className="HeadlineNewsHeader" to={`/news/${News.id}`}>
															<h1 dangerouslySetInnerHTML={{ __html: News.News_Title }}></h1>
														</Link>
													</div>
													<div className="abstractNews">
														<h2 className="AbstractNewsHeader" dangerouslySetInnerHTML={{ __html: News.News_Describe }}></h2>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)) || (
							<div className="loading-data-9">
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

				{/* <div className="content-title-reading-content">
					<span className="span-title-reading-content">
						<p>شبکه های اجتماعی</p>
					</span>
					<AnimationRed />
				</div>
				<div className="Gallery-reading-content">
					<div className="Content-Gallery">
						<div className="NewsItems-Gallery">
							<div className="imgNews-Gallery">{<img className="imgStyleHeader-Gallery" alt="imgs" />}</div>
							<div className="Content-Texts-Dallery">
								<div className="RoutingNews-Gallery">
									<h1 className="RoutingNewsHeader-Gallery"></h1>
								</div>
								<div className="titleNews-Gallery">
									<h1 className="HeadlineNewsHeader-Gallery"></h1>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</Fragment>
	);
}

export default Header;
