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
import { LoginAndRegister } from "./components/app/login_register/Login_Register";
import { MainAdmin } from "./components/admin/admins/mainAdmin/MainAdmin";
import { Default } from "./components/admin/header/pages/defaultPage/Default";
import { EditProfile } from "./components/admin/header/pages/editProfile/EditProfile";
import { AxiosDefaultUrl, CreateNews } from "./components/admin/header/pages/createNews/CreateNews";
import { ListAdmins } from "./components/admin/header/pages/listAdmins/ListAuthor";
import { ListEmails } from "./components/admin/header/pages/listEmails/ListEmails";
import { NotFind } from "./components/admin/admins/page_403_err/NotFind";
// fonts
import "./fonts/fontAwesome/css/all.css";
import "./app.css";
import { AuthContextProvider } from "./context/authContext";
import Contact from "./pages/contact/Contact";
import Header from "./components/app/header/Header";
import { Author } from "./components/admin/admins/author/Author";

function App() {
	const CurrentUser = JSON.parse(localStorage.getItem("user"));

	window.addEventListener("load", async () => {
		if (CurrentUser?.id !== undefined) {
			await AxiosDefaultUrl({
				method: "get",
				url: `user/get/${CurrentUser.id}`,
				withCredentials: true,
			})
				.then(async (success) => {
					if (success.data.success) {
						if (success.data.body.createdAt !== CurrentUser.createdAt || success.data.body.updatedAt !== CurrentUser.updatedAt) {
							await AxiosDefaultUrl({
								method: "post",
								url: "auth/logout",
								withCredentials: true,
							});
							localStorage.setItem("user", null);
						}
						return;
					} else {
						await AxiosDefaultUrl({
							method: "post",
							url: "auth/logout",
							withCredentials: true,
						});
						localStorage.setItem("user", null);
					}
				})
				.catch(async (e) => {
					await AxiosDefaultUrl({
						method: "post",
						url: "auth/logout",
						withCredentials: true,
					});
					localStorage.setItem("user", null);
				});
		}
	});

	return (
		<BrowserRouter>
			<AuthContextProvider>
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
					{/* admin route */}
					<Route path="/login-register" element={<LoginAndRegister />} />
					<Route path="/main-admin" element={<MainAdmin />}>
						<Route path="/main-admin" element={<Default />} />
						<Route path="edit-profile" element={<EditProfile />} />
						<Route path="create-news" element={<CreateNews />} />
						<Route path="list-admins" element={<ListAdmins />} />
						<Route path="list-emails" element={<ListEmails />} />
					</Route>
					<Route path="/sub-admin" element={<Author />}>
						<Route path="/sub-admin" element={<Default />} />
					</Route>
					<Route path="*" element={<NotFind />} />
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
