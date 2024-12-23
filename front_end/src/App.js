// app
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import { News } from "./pages/news/News";
import About from "./pages/about/About";

// admin
import { LoginAndRegister } from "./components/app/login_register/Login_Register";
import { DefaultAdmin } from "./components/admin/header/pages/defaultPage/Default";
import { EditProfile } from "./components/admin/header/pages/editProfile/EditProfile";
import { ListAuthors } from "./components/admin/header/pages/listAuthors/ListAuthor";
import { ListUsers } from "./components/admin/header/pages/listUsers/ListUsers";
//
import { NotFind } from "./components/admin/admins/page_403_err/NotFind";
// fonts
import "./fonts/fontAwesome/css/all.css";
import "./app.css";
import Header from "./components/app/header/Header";
import { ListNews } from "./components/admin/header/pages/listNews/ListNews";
import { CreateNews } from "./components/admin/header/pages/createNews/CreateNews";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import ContactUs from "./pages/ContactUs/ContactUs";
import Participation from "./pages/Participation/Participation";
import Archive from "./pages/Archive/Archive";
import { Admin } from "./components/admin/admins/admin/Admin";
// user
import { User } from "./components/users/user/User";
import { DefaultPage } from "./components/users/page/DefaultPage.jsx";
import Profile from "./components/users/page/options/profile/Profile.jsx";
import Likes from "./components/users/page/options/likes/Likes.jsx";
import Comment from "./components/users/page/options/comments/Comment.jsx";
import History from "./components/users/page/options/history/History.jsx";

export const App = () => {
	const { CurrentUser } = useContext(AuthContext);
	return (
		<div>
			<Routes>
				{/* app route */}
				<Route path="/" element={<Home />}>
					<Route path="/" element={<Header />} />
					<Route path="/news/:id" element={<News />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact-us" element={<ContactUs />} />
					<Route path="/participation" element={<Participation />} />
					<Route path="/archive" element={<Archive />} />
				</Route>
				{/* lord route */}
				<Route path="/login-register" element={<LoginAndRegister />} />
				<Route
					path="/admin"
					element={CurrentUser?.Info.Role === "Lord" || CurrentUser?.Info.Role === "OnAuthor" ? <Admin /> : <Navigate to="/login-register" />}
				>
					<Route path="/admin" element={<DefaultAdmin />} />
					<Route path="edit-profile" element={<EditProfile />} />
					<Route path="create-news" element={<CreateNews />} />
					<Route path="news" element={<ListNews />} />
					<Route path="list-lords" element={<ListAuthors />} />
					<Route path="list-users" element={<ListUsers />} />
					<Route path="list-email" element={<ListUsers />} />
				</Route>

				{/* user route */}
				<Route path="/user" element={CurrentUser?.Info.Role === "OnUser" ? <User /> : <Navigate to="/login-register" />}>
					<Route path="/user" element={<DefaultPage />} />
					<Route path="profile" element={<Profile />} />
					<Route path="likes" element={<Likes />} />
					<Route path="history" element={<History />} />
					<Route path="comment" element={<Comment />} />
				</Route>
				<Route path="*" element={<NotFind />} />
			</Routes>
		</div>
	);
};
