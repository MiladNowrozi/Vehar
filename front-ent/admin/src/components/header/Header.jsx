import "./header.css";
import CreateNews from "./pages/CreateNews";
const HeaderAdmin = () => {
  return (
    <>
      <section className="content-header-admin" style={{ width: "100%" }}>
        <div className="header-header-admin">
          <CreateNews />
        </div>
      </section>
    </>
  );
};

export default HeaderAdmin;
