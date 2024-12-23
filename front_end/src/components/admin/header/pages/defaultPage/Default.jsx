import { useContext } from "react";
import "./default.css";
import { AuthContext } from "../../../../../context/authContext";

export const DefaultAdmin = () => {
	const { CurrentUser } = useContext(AuthContext);

	return (
		<div className="content-profile-lord">
			<div className="image-lord">
				<img
					src={
						CurrentUser.Info.Img
							? CurrentUser.Info.Img
							: "http://localhost:5000/get-images?name=/2024/09/%DB%B2%DB%B0%DB%B2%DB%B4%DB%B0%DB%B9%DB%B1%DB%B4_%DB%B2%DB%B2%DB%B1%DB%B7%DB%B1%DB%B1-scaled.jpg"
					}
					alt="lord"
				/>
			</div>
			<div className="lord-name">
				<h1>{CurrentUser.Info.FirstName && CurrentUser.Info.FirstName + " " + CurrentUser.Info.LastName}</h1>
			</div>
			<div className="lord-title">
				<h2>{CurrentUser.Info.Describe}</h2>
			</div>
			<div className="lord-Bio">
				<h3>{CurrentUser.Info.Content}</h3>
			</div>
		</div>
	);
};

export const DefaultAuthor = () => {
	const { CurrentUser } = useContext(AuthContext);

	return (
		<div className="content-profile-author">
			<div className="image-author">
				<img
					src={
						CurrentUser.Info.Img
							? CurrentUser.Info.Img
							: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/100px-User_icon_2.svg.png"
					}
					alt="author"
				/>
			</div>
			<div className="author-name">
				<h1>{CurrentUser.Info.FirstName && CurrentUser.Info.FirstName + " " + CurrentUser.Info.LastName}</h1>
			</div>
			<div className="author-title">
				<h2>{CurrentUser.Info.Describe}</h2>
			</div>
			<div className="author-Bio">
				<h3>{CurrentUser.Info.Content}</h3>
			</div>
		</div>
	);
};
