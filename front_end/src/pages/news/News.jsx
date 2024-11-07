import "./news.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Galeyre from "../data/data";
import Navbar from "../../components/app/navbar/Navbar";
import Footer from "../../components/app/footer/Footer";
import { PageMenu } from "../../components/app/header/pageMenu/PageMenu";
import { AxiosInstance } from "../../axiosInstance.js";
export const News = () => {
	const navigate = useNavigate();
	// const DataNews = useLocation();
	// const data = DataNews.state;
	const [news, setNews] = useState({});

	const FetchData = async () => {
		try {
			const res = await AxiosInstance({
				method: "get",
				url: "/news/get/1",
			});
			setNews(res.data.body);
		} catch (error) {
			console.log(error);
		}
	};
	FetchData();

	function GetDataNews(e) {
		const DataNews = Galeyre.filter((x) => x.id === Number(e.target.accessKey))[0];
		navigate("/news", { state: DataNews });
		document.documentElement.scrollTop = 0;
	}

	return (
		<Fragment>
			<div className="bodyHome">
				<div className="Navbar defaultNavbar">
					<Navbar />
				</div>
				<div className="ResultNewsHeader">
					<PageMenu />
					<div className="ResultNewsContainer">
						<div className="ResultNewsContent">
							<div className="Default_News_Container_Left">
								<div className="ContainerLeft">
									{Galeyre.slice(8, 13).map((News, i) => (
										<div key={i} className="ContainerHeaderLeft">
											<div className="NewsContainer-left">
												<div className="NewsContent-left">
													<div className="NewsItems-left">
														<div className="img-content-left">
															<div className="ImgNews-left">
																{<img accessKey={News.id} onClick={GetDataNews} className="imgStyleHeader-left" src={News.img} alt="imgs" />}
															</div>
														</div>
														<div className="RoutingNews-left">
															<div>
																<h1 className="RoutingNewsHeader-left">{News.Routing}</h1>
																<a className="titleNews-left">
																	<h1 accessKey={News.id} onClick={GetDataNews} className="HeadlineNewsHeader-left">
																		{News.headline}
																	</h1>
																</a>
															</div>
															<div className="abstractNews-left">
																<h2 className="AbstractNewsHeader-left ">{News.abstract}</h2>
															</div>
														</div>
													</div>
													<div className="authorNews-left">
														<h2 className="AuthorNewsHeader-left CommonStyleToAuthor-left">{"نویسنده : " + News.author}</h2>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="Result_News_Container_Center">
								<div className="Result_News_Content_Center">
									<div className="News_Result_Select_User">
										<section className="Section_News_Result">
											<div className="News_Result">
												<div className="Title_Result">
													<div>
														<h6>{news.title}</h6>
													</div>
													<div>
														<h1>{news.Description}</h1>
													</div>
												</div>
												{/* <img className="Img_Result" src={data.img} alt="img" /> */}
												<div className="P_News" style={{ textAlign: "justify" }}>
													<p id="Content-news"></p>
													{window.addEventListener("load", () => {
														document.getElementById("Content-news").innerHTML = news.content;
													})}
												</div>
											</div>
										</section>
									</div>
								</div>
							</div>
							<div className="Default_News_Container_Right">
								<div className="ContainerRight">
									{Galeyre.slice(13, 17).map((News, i) => (
										<div key={i} className="ContainerHeaderRight">
											<div className="NewsContainer-Right">
												<div className="NewsContent-Right">
													<div className="NewsItems-Right">
														<div className="img-content-Right">
															<div className="ImgNews-Right">
																{<img accessKey={News.id} onClick={GetDataNews} className="imgStyleHeader-Right" src={News.img} alt="imgs" />}
															</div>
														</div>
														<div className="RoutingNews-Right">
															<div>
																<h1 className="RoutingNewsHeader-Right">{News.Routing}</h1>
																<a className="titleNews-Right">
																	<h1 accessKey={News.id} onClick={GetDataNews} className="HeadlineNewsHeader-Right">
																		{News.headline}
																	</h1>
																</a>
															</div>
															<div className="abstractNews-Right">
																<h2 className="AbstractNewsHeader-Right ">{News.abstract}</h2>
															</div>
														</div>
													</div>
													<div className="authorNews-Right">
														<h2 className="AuthorNewsHeader-Right CommonStyleToAuthor-Right">{"نویسنده : " + News.author}</h2>
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
				<div className="FooterHome">
					<Footer />
				</div>
			</div>
		</Fragment>
	);
};
