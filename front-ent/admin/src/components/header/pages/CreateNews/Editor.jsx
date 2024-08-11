import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";

// for more abut editor please see https://www.tiny.cloud/docs/tinymce/latest/

const EditorContent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let title = document.getElementById("title");
      let sh = document.getElementById("sh");
      let getCategory = document.querySelector(".title-category");

      if (title.value == "") {
        alert("لطفا فیلد عنوان را پر کنید!");
      }
      if (sh.value == "") {
        alert("لطفا فیلد توضیح کوتاه را پر کنید! ");
      }
      if (editorRef.current.getContent() == "") {
        alert("لطفاً متن خبر را بنویسید!");
      }
      if (getCategory.id == "") {
        alert("لطفاً دسته مربوطه را انتخاب کنید!");
      } else {
        await axios({
          method: "post",
          url: "http://localhost:5000/auth/data",
          data: {
            title: title.value,
            sh: sh.value,
            lastName: editorRef.current.getContent(),
            category: getCategory.id,
          },
        });
        alert("خبر با موفقیت ارسال شد!");
      }
    });
  }, []);

  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        // tinymceScriptSrc={process.env.REACT_APP_URL_TMCE}
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
