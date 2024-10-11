import { Outlet } from "react-router-dom";
import "./author.css";

export const Author = () => {
	return (
		<div className="sob-admin">
			<h1>Author</h1>
			<Outlet />
		</div>
	);
};
