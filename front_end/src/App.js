// app
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { News } from "./pages/news/News";
import Politic from "./pages/politic/Politic";
import Sport from "./pages/sport/Sport";
import Local from "./pages/local/Local";
import About from "./pages/about/About";
import Social from "./pages/social/Social";
// admin
import { LoginAndRegister } from "./components/admin/admins/login_register/Login_Register";
import { MainAdmin } from "./components/admin/admins/mainAdmin/MainAdmin";
import { Default } from "./components/admin/header/pages/defaultPage/Default";
import { EditProfile } from "./components/admin/header/pages/editProfile/EditProfile";
import { CreateNews } from "./components/admin/header/pages/createNews/CreateNews";
import { ListAdmins } from "./components/admin/header/pages/listAdmins/ListAdmins";
import { ListEmails } from "./components/admin/header/pages/listEmails/ListEmails";
import { SubAdmin } from "./components/admin/admins/subAdmin/SubAdmin";
import { NotFind } from "./components/admin/admins/page_403_err/NotFind";
// fonts
import "./fonts/fontAwesome/css/all.css";
import "./app.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* app route */}
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/politic" element={<Politic />} />
        <Route path="/social" element={<Social />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/local" element={<Local />} />
        <Route path="/about" element={<About />} />
        {/* admin route */}

        <Route path="/login-register" element={<LoginAndRegister />} />
        <Route path="/main-admin" element={<MainAdmin />}>
          <Route path="" element={<Default />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="create-news" element={<CreateNews />} />
          <Route path="list-admins" element={<ListAdmins />} />
          <Route path="list-emails" element={<ListEmails />} />
        </Route>
        <Route path="/sub-admin" element={<SubAdmin />}>
          <Route path="" element={<Default />} />
        </Route>
        <Route path="*" element={<NotFind />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
