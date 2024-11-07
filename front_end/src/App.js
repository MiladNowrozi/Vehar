// app
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { News } from "./pages/news/News";
import Politic from "./pages/politic/Politic";
import Sport from "./pages/sport/Sport";
import Local from "./pages/local/Local";
import About from "./pages/about/About";
import Social from "./pages/social/Social";
// admin
import { LoginAndRegister } from "./components/app/login_register/Login_Register";
import { Lord } from "./components/admin/admins/lord/Lord";
import { DefaultAuthor, DefaultLord } from "./components/admin/header/pages/defaultPage/Default";
import { EditProfile } from "./components/admin/header/pages/editProfile/EditProfile";
import { ListAuthors } from "./components/admin/header/pages/listAuthors/ListAuthor";
import { ListUsers } from "./components/admin/header/pages/listUsers/ListUsers";
//
import { NotFind } from "./components/admin/admins/page_403_err/NotFind";
// fonts
import "./fonts/fontAwesome/css/all.css";
import "./app.css";
import Contact from "./pages/contact/Contact";
import Header from "./components/app/header/Header";
import { Author } from "./components/admin/admins/author/Author";
import { ListNews } from "./components/admin/header/pages/listNews/ListNews";
import { CreateNews } from "./components/admin/header/pages/createNews/CreateNews";

export const App = () => {
	return (
		<div>
			<Routes>
				{/* app route */}
				<Route path="/" element={<Home />}>
					<Route path="/" element={<Header />} />
					<Route path="/news" element={<News />} />
					<Route path="/politic" element={<Politic />} />
					<Route path="/social" element={<Social />} />
					<Route path="/sport" element={<Sport />} />
					<Route path="/local" element={<Local />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Route>
				{/* lord route */}
				<Route path="/login-register" element={<LoginAndRegister />} />
				<Route path="/lord" element={<Lord />}>
					<Route path="/lord" element={<DefaultLord />} />
					<Route path="edit-profile" element={<EditProfile />} />
					<Route path="create-news" element={<CreateNews />} />
					<Route path="news" element={<ListNews />} />
					<Route path="list-lords" element={<ListAuthors />} />
					<Route path="list-users" element={<ListUsers />} />
					<Route path="list-email" element={<ListUsers />} />
				</Route>
				{/* author route */}
				<Route path="/author" element={<Author />}>
					<Route path="/author" element={<DefaultAuthor />} />
					<Route path="edit-profile" element={<EditProfile />} />
					<Route path="create-news" element={<CreateNews />} />
				</Route>
				{/* user route */}
				{/* <Route path="/user" element={<Author />}>
					<Route path="/user" element={<DefaultUser />} />
					<Route path="edit-profile" element={<EditProfile />} />
					<Route path="create-news" element={<CreateNews />} />
				</Route> */}
				<Route path="*" element={<NotFind />} />
			</Routes>
		</div>
	);
};
