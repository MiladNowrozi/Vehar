import "./header.css";
import Galeyre from "../../../pages/data/data.js";

import { PageMenu } from "./pageMenu/PageMenu.jsx";
import { AnimationRed } from "../../../animations/Animation.jsx";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosDefaultUrl } from "../../admin/header/pages/createNews/CreateNews.jsx";

function Header() {
	function oofMenuPage() {
		document.querySelector("#ContentPageMenu").style.right = "-18%";
	}
	const navigate = useNavigate();
	function GetDataNews(e) {
		const DataNews = Galeyre.filter((x) => x.id === Number(e.target.Key))[0];
		navigate("/news", { state: DataNews });
		document.documentElement.scrollTop = 0;
	}

	// const [category, setCategory] = useState();
	// const [subColumn, setSubColumn] = useState({
	//   OneColumn: [],
	//   TwoColumn: [],
	// });
	// useEffect(() => {
	//   const res = async () => {
	//     try {
	//       const res = await AxiosDefaultUrl({
	//         method: "get",
	//         url: "news/get-all/sports",
	//       });
	//       setCategory(
	//         res.data.body?.map((e) => {
	//           return e;
	//         })
	//       );
	//     } catch (error) {
	//       console.log(error);
	//     }
	//     try {
	//       const res = await AxiosDefaultUrl({
	//         method: "get",
	//         url: "news/get-all/subColumn",
	//       });
	//       const One = res.data.body?.filter((e) => {
	//         return e.subColumn === "one-column";
	//       });
	//       const Two = res.data.body?.filter((e) => {
	//         return e.subColumn === "first-column" || e.subColumn === "scend-column";
	//       });
	//       setSubColumn((prev) => ({ ...prev, OneColumn: One, TwoColumn: Two }));
	//     } catch (error) {
	//       console.log(error);
	//     }
	//   };
	//   res();
	// }, []);
	return (
		<Fragment>
			<PageMenu />
			<header onClick={oofMenuPage} className="bodyHederHome">
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
										{/* {category?.map((News) => {
                      return (
                        <ul>
                          <li>
                            <a Key={News.id} onClick={GetDataNews}>
                              {News.Description}
                            </a>
                          </li>
                        </ul>
                      );
                    })} */}
									</div>
								</div>
							</div>
						</div>
						<div className="ItemsSliderCenter">
							{/* {subColumn.TwoColumn.map((News) => {
                return (
                  <div key={News.id} className="ItemSliderCenter">
                    <div className="imgCenter1">
                      {
                        <img
                          Key="gff"
                          onClick={GetDataNews}
                          className="SliderImgCenter"
                          src={News.images}
                          alt="img"
                        />
                      }
                    </div>
                    <div className="TextImgCenter">
                      <div className="TextImg">
                        <h2>{News.title}</h2>
                      </div>
                      <div className="TextImg">
                        <h1>
                          <a Key="jh" onClick={GetDataNews}>
                            {News.Description}
                          </a>
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })} */}
						</div>
						{/* {subColumn.OneColumn.map((News) => {
              return (
                <div key={News.id} className="ItemsSliderRight">
                  <div className="imgRight">
                    {
                      <img
                        Key={News.id}
                        onClick={GetDataNews}
                        className="SliderImgRight"
                        src={News.images}
                        alt="imgs"
                      />
                    }
                  </div>
                  <div className="RightTextImg">
                    <div className="TextImg">
                      <h2>{News.title}</h2>
                    </div>
                    <div className="TextImg">
                      <h1 Key={News.id} onClick={GetDataNews}>
                        {News.Description}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })} */}
					</div>
				</div>
				<div className="content-title-chosen">
					<span className="span-title-chosen">
						<p>منتخب</p>
					</span>
					<AnimationRed />
				</div>
				<div className="Gallery-Row-Slider">
					{/* {category?.map((News) => {
            return (
              <div key={News.id} className="Content-Gallery">
                <img Key={News.id} onClick={GetDataNews} src={News.images} alt="img" />
                <div className="Content-Texts-Dallery">
                  <p className="RoutingNewsHeader-Gallery">{News.title}</p>
                  <p Key={News.id} onClick={GetDataNews} className="HeadlineNewsHeader-Gallery">
                    {News.Description}
                  </p>
                </div>
              </div>
            );
          })} */}
				</div>

				<div className="Container-Header">
					<div className="ContainerLeft">
						<div className="content-title-political-and-social">
							<span className="span-title-political-and-social">
								<p>سیاسی و اجتمایی</p>
							</span>
							<AnimationRed />
						</div>
						{Galeyre.slice(8, 13).map((News, i) => (
							<div key={i} className="ContainerHeaderLeft">
								<div className="NewsContainer-left">
									<div className="NewsContent-left">
										<div className="NewsItems-left">
											<div className="img-content-left">
												<div className="ImgNews-left">
													{<img Key={News.id} onClick={GetDataNews} className="imgStyleHeader-left" src={News.img} alt="imgs" />}
												</div>
											</div>
											<div className="RoutingNews-left">
												<div>
													<h1 className="RoutingNewsHeader-left">{News.Routing}</h1>
													<a className="titleNews-left">
														<h1 Key={News.id} onClick={GetDataNews} className="HeadlineNewsHeader-left">
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
					<div className="ContainerRight">
						<div className="content-title-special-news">
							<span className="span-title-special-news">
								<p>اخبار ویژه</p>
							</span>
							<AnimationRed />
						</div>
						<div className="containerHeaderRight">
							{/* {category?.map((News) => {
                return (
                  <div key={News.id} className="NewsContainer">
                    <div className="NewsContent">
                      <div className="NewsItems">
                        <div className="img-content">
                          <div className="ImgNews">
                            {
                              <img
                                Key={News.id}
                                onClick={GetDataNews}
                                className="imgStyleHeader"
                                src={News.images}
                                alt="imgs"
                              />
                            }
                          </div>
                        </div>
                        <div className="RoutingNews">
                          <div>
                            <h1 className="RoutingNewsHeader">{News.title}</h1>
                            <a className="titleNews">
                              <h1
                                Key={News.id}
                                onClick={GetDataNews}
                                className="HeadlineNewsHeader"
                              >
                                {News.headline}
                              </h1>
                            </a>
                          </div>
                          <div className="abstractNews">
                            <h2 className="AbstractNewsHeader">{News.Description}</h2>
                          </div>
                        </div>
                      </div>
                      <div className="authorNews">
                        <h2 className="AuthorNewsHeader CommonStyleToAuthor">
                          {"نویسنده : " + News.author}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })} */}
						</div>
					</div>
				</div>
				<div className="content-title-reading-content">
					<span className="span-title-reading-content">
						<p>برای مطالعه</p>
					</span>
					<AnimationRed />
				</div>
				<div className="Gallery-reading-content">
					{Galeyre.slice(3, 8).map((News, i) => (
						<div key={i} className="Content-Gallery">
							<div className="NewsItems-Gallery">
								<div className="imgNews-Gallery">
									{<img Key={News.id} onClick={GetDataNews} className="imgStyleHeader-Gallery" src={News.img} alt="imgs" />}
								</div>
								<div className="Content-Texts-Dallery">
									<div className="RoutingNews-Gallery">
										<h1 className="RoutingNewsHeader-Gallery">{News.Routing}</h1>
									</div>
									<div className="titleNews-Gallery">
										<h1 Key={News.id} onClick={GetDataNews} className="HeadlineNewsHeader-Gallery">
											{News.headline}
										</h1>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* <div className="container-videos-title"> */}
				{/* <div className="content-title-videos-title">
            <span className="span-title-videos-title">
              <p>برای مطالعه</p>
            </span>
            <AnimationRed />
          </div> */}
				{/* </div> */}
			</header>
		</Fragment>
	);
}

export default Header;
