import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Login } from "./components/admins/login/Login.jsx";
import { MainAdmin } from "./components/admins/mainAdmin/MainAdmin.jsx";
import { Default } from "./components/header/pages/defaultPage/Default.jsx";
import { CreateNews } from "./components/header/pages/createNews/CreateNews.jsx";
import { EditProfile } from "./components/header/pages/editProfile/EditProfile.jsx";
import { ListAdmins } from "./components/header/pages/listAdmins/ListAdmins.jsx";
import { ListEmails } from "./components/header/pages/listEmails/ListEmails.jsx";
import { SubAdmin } from "./components/admins/subAdmin/SubAdmin.jsx";
import { NotFind } from "./components/admins/page_403_err/NotFind.js";

import "./fontAwesome/css/all.css";
import "./app.css";

function App() {
  return (
    <div className="Maine">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main-admin" element={<MainAdmin />}>
            <Route path="" element={<Default />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="create-news" element={<CreateNews />} />
            <Route path="list-admins" element={<ListAdmins />} />
            <Route path="list-emails" element={<ListEmails />} />
          </Route>
          <Route path="/sub-admin" element={<SubAdmin />}>
            <Route path="default" element={<Default />} />
          </Route>
          <Route path="*" element={<NotFind />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
