import React, { useEffect, useState } from "react";

import "./createnews.css";

import EditorContent from "./Editor.jsx";
import { Link } from "react-router-dom";

const CreateNews = () => {
  const [getId, setGetId] = useState(null);
  const handleChange = (e) => {
    const ele = document.getElementsByName("HandleCheckbox");
    if (document.getElementById(e.target.id).checked) {
      setGetId(e.target.id);
      for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false;
        document.getElementById(e.target.id).checked = true;
      }
    } else {
      setGetId("");
    }
  };

  return (
    <>
      <div className="news-create-admin">
        <form id="loginForm" className="input-news-admin">
          <label>عنوان خبر :</label>
          <input id="title" type="text" autoComplete="off" placeholder="جهان بینی خبرنگاران ..." />
          <label>توضیح کوتاه :</label>
          <input
            id="sh"
            type="text"
            autoComplete="off"
            placeholder="خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
          />
          <label>متن خبر :</label>
          <EditorContent />
          <div className="checkbox-content">
            <div id={getId} className="title-category">
              <h2>مربوط به دسته</h2>
            </div>
            <input type="checkbox" id="sports" onChange={handleChange} name="HandleCheckbox" />
            <label htmlFor="sports">ورزشی</label>
            <br />
            <input
              type="checkbox"
              id="cultural-and-artistic"
              onChange={handleChange}
              name="HandleCheckbox"
            />
            <label htmlFor="cultural-and-artistic">فرهنگی و هنری</label>
            <br />
            <input
              type="checkbox"
              id="political-and-social"
              onChange={handleChange}
              name="HandleCheckbox"
            />
            <label htmlFor="political-and-social">سیاسی و اجتماعی</label>
            <br />
            <input
              type="checkbox"
              id="special-news"
              onChange={handleChange}
              name="HandleCheckbox"
            />
            <label htmlFor="special-news">اخبار ویژه</label>
            <br />
            <input type="checkbox" id="slider" onChange={handleChange} name="HandleCheckbox" />
            <label htmlFor="slider">اسلایدر</label>
            <br />
            <input
              type="checkbox"
              id="full-viewers"
              onChange={handleChange}
              name="HandleCheckbox"
            />
            <label htmlFor="full-viewers">پر بیننده ها</label>
            <br />
            <input
              type="checkbox"
              id="important-news"
              onChange={handleChange}
              name="HandleCheckbox"
            />
            <label htmlFor="important-news">خبر مهم</label>
            <br />
            <input type="checkbox" id="dialogue" onChange={handleChange} name="HandleCheckbox" />
            <label htmlFor="dialogue">گفت و گو</label>
            <br />
            <input type="checkbox" id="mahdism" onChange={handleChange} name="HandleCheckbox" />
            <label htmlFor="mahdism">مهدویت</label>
            <br />
            <input type="checkbox" id="notes" onChange={handleChange} name="HandleCheckbox" />
            <label htmlFor="notes">یادداشت ها</label>
          </div>
          <div className="buttons-create-news">
            <Link to={"/main-admin"}>انصراف</Link>
            <div id="submit-warning"></div>
            <button type="submit">ارسال</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
