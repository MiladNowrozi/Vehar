import "./createnews.css";
import Editor from "./Editor";

const CreateNews = () => {
  return (
    <>
      <div className="news-create-admin">
        <form className="input-news-admin" action="/">
          <label>عنوان خبر :</label>
          <input
            type="text"
            name="lname"
            autoComplete="off"
            placeholder="جهان بینی خبرنگاران ..."
          ></input>
          <label>توضیح کوتاه :</label>
          <input
            type="text"
            name="lname"
            autoComplete="off"
            placeholder="خبرنگار باید به دید جهانی، وقایع را نگاه کند ..."
          ></input>

          <label>متن خبر :</label>
          <Editor />

          <div className="buttons-create-news">
            <button
              type="button"
              onClick={() => {
                document.querySelector(".admin-edit-page").style.display = "none";
                document.querySelector(".edit-profile-admin").style.display = "flex";
                document.querySelector(".news-create-admin").style.display = "none";
              }}
            >
              انصراف
            </button>
            <input type="submit" value="ثبت" />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
