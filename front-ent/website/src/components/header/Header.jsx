import "./header.css";
import Galeyre from "../../pages/data/data.js";
import { PageMenu } from "./pageMenu/PageMenu.jsx";
import { AnimationRed } from "../../animations/Animation.jsx";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

function Header() {
  function oofMenuPage() {
    document.querySelector("#ContentPageMenu").style.right = "-18%";
  }
  const navigate = useNavigate();
  function GetDataNews(e) {
    const DataNews = Galeyre.filter((x) => x.id === Number(e.target.accessKey))[0];
    navigate("/اخبار", { state: DataNews });
    document.documentElement.scrollTop = 0;
  }
  return (
    <Fragment>
      <PageMenu />
      <header onClick={oofMenuPage} className="bodyHederHome">
        <div className="Container-Slider">
          <div className="ContentSlider">
            <div className="ItemsSliderTextLeft">
              <div className="ContainerTextLeft">
                <div className="Content-Item-Tab">
                  <div className="line-Befor"></div>
                  <div className="Center-BeforAndAfter">
                    <div className="background-title">
                      <h1 className="title"> پر بازدیدها</h1>
                    </div>
                  </div>
                  <div className="line-After">
                    <AnimationRed />
                  </div>
                </div>
                <div className="ContentTextLeft">
                  <div className="TextLeft">
                    {Galeyre.slice(0, 17).map((News, i) => (
                      <ul key={i}>
                        <li>
                          <a accessKey={News.id} onClick={GetDataNews}>
                            {News.headline}
                          </a>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ItemsSliderCenter">
              {Galeyre.slice(0, 2).map((News, i) => (
                <div key={i} className="ItemSliderCenter">
                  <div className="imgCenter1">
                    {
                      <img
                        accessKey={News.id}
                        onClick={GetDataNews}
                        className="SliderImgCenter"
                        src={News.img}
                        alt="imgs"
                      />
                    }
                  </div>
                  <div className="TextImgCenter">
                    <div className="TextImg">
                      <h2>{News.Routing}</h2>
                    </div>
                    <div className="TextImg">
                      <h1>
                        <a accessKey={News.id} onClick={GetDataNews}>
                          {News.headline}
                        </a>
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {Galeyre.slice(2, 3).map((News, i) => (
              <div key={i} className="ItemsSliderRight">
                <div className="imgRight">
                  {
                    <img
                      accessKey={News.id}
                      onClick={GetDataNews}
                      className="SliderImgRight"
                      src={News.img}
                      alt="imgs"
                    />
                  }
                </div>
                <div className="RightTextImg">
                  <div className="TextImg">
                    <h2>{News.Routing}</h2>
                  </div>
                  <div className="TextImg">
                    <h1 accessKey={News.id} onClick={GetDataNews}>
                      {News.headline}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="Gallery-Row-Slider">
          {Galeyre.slice(3, 8).map((News, i) => (
            <div key={i} className="Content-Gallery">
              <div className="NewsItems-Gallery">
                <div className="imgNews-Gallery">
                  {
                    <img
                      accessKey={News.id}
                      onClick={GetDataNews}
                      className="imgStyleHeader-Gallery"
                      src={News.img}
                      alt="imgs"
                    />
                  }
                </div>
                <div className="Content-Texts-Dallery">
                  <div className="RoutingNews-Gallery">
                    <h1 className="RoutingNewsHeader-Gallery">{News.Routing}</h1>
                  </div>
                  <div className="titleNews-Gallery">
                    <h1
                      accessKey={News.id}
                      onClick={GetDataNews}
                      className="HeadlineNewsHeader-Gallery"
                    >
                      {News.headline}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="line-Center"></div>
        <div className="Container-Header">
          <div className="ContainerLeft">
            {Galeyre.slice(8, 13).map((News, i) => (
              <div key={i} className="ContainerHeaderLeft">
                <div className="NewsContainer-left">
                  <div className="NewsContent-left">
                    <div className="NewsItems-left">
                      <div className="img-content-left">
                        <div className="ImgNews-left">
                          {
                            <img
                              accessKey={News.id}
                              onClick={GetDataNews}
                              className="imgStyleHeader-left"
                              src={News.img}
                              alt="imgs"
                            />
                          }
                        </div>
                      </div>
                      <div className="RoutingNews-left">
                        <div>
                          <h1 className="RoutingNewsHeader-left">{News.Routing}</h1>
                          <a className="titleNews-left">
                            <h1
                              accessKey={News.id}
                              onClick={GetDataNews}
                              className="HeadlineNewsHeader-left"
                            >
                              {News.headline}
                            </h1>
                          </a>
                        </div>
                        <div className="abstractNews-left">
                          <h2 className="AbstractNewsHeader-left ">
                            {News.abstract}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="authorNews-left">
                      <h2 className="AuthorNewsHeader-left CommonStyleToAuthor-left">
                        {"نویسنده : " + News.author}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="ContainerRight">
            <div className="containerHeaderRight">
              {Galeyre.slice(13, 17).map((News, i) => (
                <div key={i} className="NewsContainer">
                  <div className="NewsContent">
                    <div className="NewsItems">
                      <div className="img-content">
                        <div className="ImgNews">
                          {
                            <img
                              accessKey={News.id}
                              onClick={GetDataNews}
                              className="imgStyleHeader"
                              src={News.img}
                              alt="imgs"
                            />
                          }
                        </div>
                      </div>
                      <div className="RoutingNews">
                        <div>
                          <h1 className="RoutingNewsHeader">{News.Routing}</h1>
                          <a className="titleNews">
                            <h1
                              accessKey={News.id}
                              onClick={GetDataNews}
                              className="HeadlineNewsHeader"
                            >
                              {News.headline}
                            </h1>
                          </a>
                        </div>
                        <div className="abstractNews">
                          <h2 className="AbstractNewsHeader">{News.abstract}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="authorNews">
                      <h2 className="AuthorNewsHeader CommonStyleToAuthor">
                        {"نویسنده : " + News.author}
                      </h2>
                    </div>
                  </div>
                  <div className="ContainerAuthorNews">
                    <div className="ContentAuthor">
                      <div className="ImgAuthor">
                        {
                          <img
                            accessKey={News.id}
                            onClick={GetDataNews}
                            className="imgAuthor"
                            src={News.img}
                            alt="imgs"
                          />
                        }
                      </div>
                      <h1 style={{ fontSize: "15px", marginTop: "-10px" }}>
                        برنامه نویس
                      </h1>
                      <h2 style={{ fontSize: "13px", marginTop: "-5px" }}>
                        {" "}
                        میلاد نوروزی
                      </h2>
                      <p style={{ fontSize: "11px" }}>
                        حوزوی و برنامه نویس فرانت و بک اند علاقه مند به یادگیری علوم
                        اهل استان لرستان با چند سال تجربه در حوزه برنامه نویسی
                      </p>
                    </div>
                    <div className="Bridge">
                      <li>
                        <a href="#" className="fab fa-telegram" title="تلگرام"></a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="fab fa-instagram"
                          title="اینستاگرام"
                        ></a>
                      </li>
                      <li>
                        <a href="#" className="fa fa-envelope" title="ایمیل"></a>
                      </li>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default Header;
