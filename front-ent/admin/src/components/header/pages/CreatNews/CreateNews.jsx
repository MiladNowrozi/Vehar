import "./createnews.css";

const CreateNews = () => {
  return (
    <>
      <div className="news-create-admin">
        <div className="title-news-admin">
          <h1>ایجاد یک خبر جدید </h1>
        </div>
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
          <textarea name="subject" placeholder="تایپ کردن ..."></textarea>
          <div className="row">
            <input type="submit" value="ثبت" />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
