import "./header.css";
//
import { PageMenu } from "./pageMenu/PageMenu.jsx";
import { AnimationRed } from "../../../animations/Animation.jsx";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AxiosInstance } from "../../../axiosInstance.js";
//
function Header() {
	// const [ReceiveAllNews, setReceiveAllNews] = useState([]);
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
			// await AxiosInstance({
			// 	method: "get",
			// 	url: "news/get-all",
			// 	withCredentials: true,
			// })
			// 	.then((success) => {
			// 		setReceiveAllNews(success.data.body);
			// 	})
			// 	.catch((e) => {
			// 		console.log(e);
			// 	});
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

	return (
		<Fragment>
			<PageMenu />
			<div onClick={oofMenuPage} className="bodyHederHome">
				<div className="Container-Slider">
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
										{MostVisitedNews.map((e) => (
											<div key={e.id} className="li-full-see">
												<Link className="link" to={`/news/${e.id}`}>
													<p dangerouslySetInnerHTML={{ __html: e.News_Title }}></p>
												</Link>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="ItemsSlider">
							{SliderNews.SliderNews.sort((a, b) => b.id - a.id).map((e, i) => (
								<div key={e.id} className={"milad imgCenter" + i}>
									<Link className="link-slider-img" to={`/news/${e.id}`}>
										<img src={e.News_Images} alt="img" />
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
				<div className="Gallery-Row-Slider">
					{SliderNews.ChoiceNews.map((e, i) => (
						<div key={i} className="Content-Gallery">
							<Link to={`/news/${e.id}`} className="HeadlineNewsHeader-Gallery">
								<img src={e.News_Images} alt="img" />
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
				<div className="Container-Header">
					<div className="ContainerLeft">
						{SliderNews.SubNoteNews.length > 0 && (
							<div className="container-note">
								<div className="content-title-note">
									<span className="span-title-note">
										<p>یادداشت</p>
									</span>
									<AnimationRed />
								</div>
								{SliderNews.SubNoteNews.map((e, i) => (
									<div key={i} className="content-note">
										<div key={i} className="content-writer">
											<img src={e.News_Images} alt="img" />
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
						)}
						<div className="Container-political">
							<div className="content-title-political-and-social">
								<span className="span-title-political-and-social">
									<p>آخرین اخبار</p>
								</span>
								<AnimationRed />
							</div>
							<div className="Container-Header-Left">
								{LastNews.map((News, i) => (
									<div key={i} className="News-Container-left" style={{ borderBottom: i === LastNews.length - 1 ? 0 : "" }}>
										<Link className="Routing-News-Header-left" to={`/news/${News.id}`}>
											<p dangerouslySetInnerHTML={{ __html: News.News_Title }}></p>
										</Link>
									</div>
								))}
							</div>
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
						<div className="containerHeaderRight">
							{SliderNews.SpecialNews.sort((a, b) => b.id - a.id).map((News, i) => (
								<div key={i} className="NewsContainer">
									<div className="NewsContent" style={{ borderBottom: i === SliderNews.SpecialNews.length - 1 ? 0 : "" }}>
										<div className="NewsItems">
											<div className="img-content">
												<div className="ImgNews">
													<Link to={`/news/${News.id}`} className="HeadlineNewsHeader">
														<img className="imgStyleHeader" src={News.News_Images} alt="imgs" />
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
					</div>
				</div>
				<div className="content-title-reading-content">
					<span className="span-title-reading-content">
						<p>شبکه های اجتماعی</p>
					</span>
					<AnimationRed />
				</div>
				<div className="Gallery-reading-content">
					{/* {ReceiveAllNews.map((News, i) =>
						News.Category.News.map((News) => (
							<div key={i} className="Content-Gallery">
								<div className="NewsItems-Gallery">
									<div className="imgNews-Gallery">
										{<img className="imgStyleHeader-Gallery" src={News.News_Images} alt="imgs" />}
									</div>
									<div className="Content-Texts-Dallery">
										<div className="RoutingNews-Gallery">
											<h1 className="RoutingNewsHeader-Gallery"></h1>
										</div>
										<div className="titleNews-Gallery">
											<h1 className="HeadlineNewsHeader-Gallery" dangerouslySetInnerHTML={{ __html: News.News_Title }}>
												{News.headline}
											</h1>
										</div>
									</div>
								</div>
							</div>
						))
					)} */}
				</div>
			</div>
		</Fragment>
	);
}

export default Header;
