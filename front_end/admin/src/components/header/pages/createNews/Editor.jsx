import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

// for more abut editor please see https://www.tiny.cloud/docs/tinymce/latest/

const EditorContent = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title");
      const Short_Description = document.getElementById("Short_Description");
      const getCategory = document.querySelector(".title-category");
      const showWarning = document.getElementById("submit-warning");

      const values = {
        Title: { value: title.value, name: "Title" },
        Short_Description: { value: Short_Description.value, name: "Short_Description" },
        Editor: { value: editorRef.current.getContent(), name: "Editor" },
        Category: { value: getCategory.id, name: "Category" },
      };

      const filterValues = Object.values(values).filter((i) => {
        return i.value == "";
      });
      if (filterValues.length <= 0) {
        try {
          await axios({
            method: "post",
            url: process.env.REACT_APP_URL_API + "news/create",
            data: {
              Title: title.value,
              Short_Description: Short_Description.value,
              Editor: editorRef.current.getContent(),
              Category: getCategory.id,
            },
          })
            .then((success) => {
              showWarning.style.display = "flex";
              showWarning.innerHTML = `<p style="color: green;">${success.data.message}</p>`;
              setTimeout(() => {
                showWarning.style.display = "none";
              }, 5000);
            })
            .catch((err) => {
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
          showWarning.style.display = "flex";
          showWarning.innerHTML = `<p style="color: red;">${`ارسال درخواست ناموفق!<br/> علت خطا: ${error.message}`}</p>`;
          setTimeout(() => {
            showWarning.style.display = "none";
          }, 5000);
        }
      } else {
        showWarning.style.display = "flex";
        showWarning.innerHTML = `لطفاً فیلد:${
          title.value == "" ? `<p style="color: red;">عنوان خبر،</p>` : ""
        }
        ${Short_Description.value == "" ? `<p style="color: red;">توضیح کوتاه،</p>` : ""}
        ${editorRef.current.getContent() == "" ? `<p style="color: red;">متن خبر،</p>` : ""}
        ${getCategory.id == "" ? `<p style="color: red;">دسته مربوطه،</p>` : ""} را هم پر کنید!`;
        setTimeout(() => {
          showWarning.style.display = "none";
        }, 5000);
      }
    });
  }, []);

  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(_evt, editor) => (editorRef.current = editor)}
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
    </>
  );
};

export default EditorContent;
