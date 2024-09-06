import React, { useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";

import "./createnews.css";

export const AxiosDefaultUrl = axios.create({ baseURL: "http://localhost:5000" });

export const CreateNews = () => {
  const [input, setInput] = useState({
    Title: "",
    Short_Description: "",
    Editor: "",
    Category: "",
  });

  const handelChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelEditorChange = (e) => {
    setInput((prev) => ({ ...prev, Editor: e }));
  };

  const handleChange = (e) => {
    const ele = document.getElementsByName("HandleCheckbox");
    if (document.getElementById(e.target.id).checked) {
      setInput((prev) => ({ ...prev, Category: e.target.id }));
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;
        document.getElementById(e.target.id).checked = true;
      }
    } else {
      setInput((prev) => ({ ...prev, Category: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.Title === "" &&
      input.Short_Description === "" &&
      input.Editor === "" &&
      input.Category === ""
    ) {
      const showWarning = document.getElementById("submit-warning");
      showWarning.style.display = "flex";
      showWarning.innerHTML = `<p style="color: red;">لطفاً فیلد ها را پر کنید!</p>`;
      setTimeout(() => {
        showWarning.style.display = "none";
      }, 5000);
    } else if (
      input.Title === "" ||
      input.Short_Description === "" ||
      input.Editor === "" ||
      input.Category === ""
    ) {
      const showWarning = document.getElementById("submit-warning");
      showWarning.style.display = "flex";
      showWarning.innerHTML = `لطفاً فیلد،&nbsp;<p style="color: red;">${
        input.Title === "" ? "عنوان خبر، " : ""
      }${input.Short_Description === "" ? "توضیح کوتاه، " : ""}${
        input.Editor === "" ? "متن خبر، " : ""
      }${input.Category === "" ? "دسته مربوطه، " : ""}</p> را هم پر کنید!`;
      setTimeout(() => {
        showWarning.style.display = "none";
      }, 5000);
    } else {
      try {
        await AxiosDefaultUrl({
          method: "post",
          url: "news/create",
          data: input,
        })
          .then((success) => {
            const showWarning = document.getElementById("submit-warning");
            showWarning.style.display = "flex";
            showWarning.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
            setTimeout(() => {
              showWarning.style.display = "none";
            }, 5000);
          })
          .catch((err) => {
            const showWarning = document.getElementById("submit-warning");
            showWarning.style.display = "flex";
            showWarning.innerHTML = `<p style="color: red;">${
              err.response.data.message === undefined
                ? `ارسال درخواست ناموفق!<br/> علت خطا: ${err.message}`
                : err.response.data.message
            }</p>`;
            setTimeout(() => {
              showWarning.style.display = "none";
            }, 5000);
          });
      } catch (error) {
        const showWarning = document.getElementById("submit-warning");
        showWarning.style.display = "flex";
        showWarning.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
        setTimeout(() => {
          showWarning.style.display = "none";
        }, 5000);
      }
    }
  };

  return (
    <>
      <div className="news-create-admin">
        <form id="loginForm" className="input-news-admin">
          <label htmlFor="Title">عنوان خبر :</label>
          <input
            type="text"
            id="Title"
            name="Title"
            autoComplete="off"
            placeholder="جهان بینی خبرنگاران ..."
            onChange={handelChange}
          />
          <label htmlFor="Short_Description">توضیح کوتاه :</label>
          <input
            type="text"
            id="Short_Description"
            name="Short_Description"
            autoComplete="off"
            placeholder="خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
            onChange={handelChange}
          />

          {/*for more abut editor please see https://www.tiny.cloud/docs/tinymce/latest/ */}

          <label htmlFor="TextEditor">متن خبر :</label>
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            onEditorChange={handelEditorChange}
            init={{
              width: "70%",
              height: "50vh",
              auto_focus: true,
              placeholder: "تایپ کردن ...",
              license_key: "gpl",
              language_url: "/tinymce/fa.js",
              language: "fa",
              plugins: [
                "autosave", // it required for 'restoredraft plugin'
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "code",
                "fullscreen",
                "help",
                "image",
                "insertdatetime",
                "link",
                "lists", // it required for 'numlist bullist plugin , and both only setting to toolbar'
                "media",
                "preview",
                "searchreplace",
                "table",
                "visualblocks",
                "accordion",
                "directionality", // it required for 'ltr rtl plugin'
                "emoticons",
                "advlist", //it is to listing both "numlist bullist plugin" in toolbar
                "nonbreaking",
                "pagebreak",
                // "quickbars", // for more abut it please see https://www.tiny.cloud/docs/tinymce/latest/quickbars/
                // "save",
                "visualchars",
                "wordcount",
              ],
              toolbar: [
                "ltr rtl preview undo redo blocks fontfamily fontsize bold italic underline strikethrough link image media table mergetags addcomment showcomments spellcheckdialog a11ycheck typography align lineheight checklist numlist bullist indent outdent emoticons charmap removeformat",
              ],
            }}
          />

          <div className="checkbox-content">
            <div className="title-category">
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
            <button onClick={handleSubmit} type="submit">
              ارسال
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
