import { useEffect, useState } from "react";
import { AxiosDefaultUrl } from "../../components/admin/header/pages/createNews/CreateNews";
import "./sport.css";
import { PageMenu } from "../../components/app/header/pageMenu/PageMenu";
import parse from "html-react-parser";
const Sport = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const res = async () => {
      try {
        const res = await AxiosDefaultUrl({
          method: "get",
          url: "news/get-all/sports",
        });
        setData(res.data.body);
      } catch (error) {
        console.log(error);
      }
    };
    res();
  }, []);
  return data?.map((News) => {
    return (
      <div key={News.id} className="container-sport">
        <PageMenu />
        <div className="left-sport-offer"></div>
        <div className="center-sport-current">
          <div className="title-sport">{News.title}</div>
          <div className="SD-sport">{News.Description}</div>
          <div className="content-sport">{parse(News.content)}</div>
        </div>
        <div className="right-sport-offer"></div>
      </div>
    );
  });
};

export default Sport;
