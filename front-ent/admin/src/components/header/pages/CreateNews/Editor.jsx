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

      const values = {
        title: { value: title.value, name: "title" },
        sh: { value: sh.value, name: "sh" },
        editor: { value: editorRef.current.getContent(), name: "editor" },
        category: { value: getCategory.id, name: "category" },
      };

      const filterValues = Object.values(values).filter((i) => {
        return i.value == "";
      });

      if (filterValues.length <= 0) {
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
        const showWarning = document.getElementById("submit-warning");
        showWarning.style.display = "flex";
        showWarning.innerHTML = `<p style="color: green;">خبر با موفقیت ارسال شد!</p>`;
        setTimeout(() => {
          showWarning.style.display = "none";
        }, 5000);
      } else {
        const showWarning = document.getElementById("submit-warning");
        showWarning.style.display = "flex";
        showWarning.innerHTML = `لطفاً فیلد:${
          title.value == "" ? `<p style="color: red;">عنوان خبر،</p>` : ""
        }
          ${sh.value == "" ? `<p style="color: red;">توضیح کوتاه،</p>` : ""}
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
