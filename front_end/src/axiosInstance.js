import axios from "axios";
export const AxiosInstance = axios.create({
	baseURL: "http://localhost:5000", // Replace with your API base URL
});

// // Request interceptor to attach JWT to headers
AxiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("user");
		if (JSON.parse(token)?.accessToken) {
			config.headers["Authorization"] = `Bearer ${JSON.parse(token).accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// Response interceptor to handle token expiration and refresh
AxiosInstance.interceptors.response.use(
	(response) => {
		// Handle successful responses
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		// Check if the error is due to an unauthorized request (401)
		if (error.response && error.response.status === 401) {
			const token = localStorage.getItem("user");
			if (JSON.parse(token)?.refreshToken) {
				console.log(JSON.parse(token).Info.Role);
				try {
					// Attempt to refresh the token
					const response = await axios.post(`http://localhost:5000/auth/refresh-token?Role=${JSON.parse(token).Info.Role}`, {
						refreshToken: JSON.parse(token).refreshToken,
					});

					localStorage.setItem("user", JSON.stringify(response.data?.body));
					// Update the original request with the new token
					originalRequest.headers["Authorization"] = `Bearer ${response.data?.body.refreshToken}`;

					// Retry the original request
					return axios(originalRequest);
				} catch (refreshError) {
					localStorage.setItem("user", null);
					window.location.href = "/login-register";
					console.error("Refresh token failed:", refreshError);
					return Promise.reject(refreshError);
				}
			} else {
				localStorage.setItem("user", null);
				window.location.href = "/login-register";
			}
		}
		// Handle other errors
		return Promise.reject(error);
	}
);
