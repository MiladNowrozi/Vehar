import { useContext } from "react";
import "./default.css";
import { AuthContext } from "../../../../../context/authContext";

export const DefaultLord = () => {
	const { CurrentUser } = useContext(AuthContext);

	return (
		<div className="content-profile-lord">
			<div className="image-lord">
				<img
					src={
						CurrentUser.Lord_Img
							? CurrentUser.Lord_Img
							: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/100px-User_icon_2.svg.png"
					}
					alt="lord"
				/>
			</div>
			<div className="lord-name">
				<h1>{CurrentUser.Lord_FirstName && CurrentUser.Lord_FirstName + " " + CurrentUser.Lord_LastName}</h1>
			</div>
			<div className="lord-title">
				<h2>{CurrentUser.Lord_Describe}</h2>
			</div>
			<div className="lord-Bio">
				<h3>{CurrentUser.Lord_Content}</h3>
			</div>
		</div>
	);
};

export const DefaultAuthor = () => {
	const { CurrentAuthor } = useContext(AuthContext);

	return (
		<div className="content-profile-author">
			<div className="image-author">
				<img
					src={
						CurrentAuthor.Author_Img
							? CurrentAuthor.Author_Img
							: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/100px-User_icon_2.svg.png"
					}
					alt="author"
				/>
			</div>
			<div className="author-name">
				<h1>{CurrentAuthor.Author_FirstName && CurrentAuthor.Author_FirstName + " " + CurrentAuthor.Author_LastName}</h1>
			</div>
			<div className="author-title">
				<h2>{CurrentAuthor.Author_Describe}</h2>
			</div>
			<div className="author-Bio">
				<h3>{CurrentAuthor.Author_Content}</h3>
			</div>
		</div>
	);
};
