import React, { useState } from "react";
import SunEditor from "suneditor-react";
import parse from "html-react-parser";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

// for more abut editor please see http://suneditor.com/

const Editor = () => {
  const [content, setContent] = useState("");
  return (
    <SunEditor
      defaultValue={content}
      lang={"fa"}
      width="100%"
      height="auto"
      onChange={setContent}
      setOptions={{
        templates: [
          {
            name: "Template-1",
            html: "<p>HTML source1</p>",
          },
          {
            name: "Template-2",
            html: "<p>HTML source2</p>",
          },
        ],
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["paragraphStyle", "blockquote"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          "/", // Line break
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
          /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
          ["save", "template"],
          /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
        ],
      }}
    />
  );
};

export default Editor;
