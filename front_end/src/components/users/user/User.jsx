import { Outlet } from "react-router-dom";
import "./user.css";

export const User = () => {
	return (
		<div className="sob-admin">
			<h1>User</h1>
			<Outlet />
		</div>
	);
};
