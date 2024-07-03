import "./header.css";
import CreateNews from "./pages/CreatNews/CreateNews";
import EditProfile from "./pages/EditProfile/EditProfile";

const HeaderAdmin = () => {
  return (
    <>
      <section className="content-header-admin" style={{ width: "100%" }}>
        <div className="header-header-admin">
          <CreateNews />
          <EditProfile />
        </div>
      </section>
    </>
  );
};

export default HeaderAdmin;
