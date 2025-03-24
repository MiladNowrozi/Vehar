import React, { useState, useEffect } from "react";
import "./upload.css"; // Import the CSS file
import { AxiosInstance } from "../../../../../../axiosInstance";

const Upload = () => {
	const [Images, setImages] = useState([]);
	const [Videos, setVideos] = useState([]);
	const [LimitImages, setLimitImages] = useState(50);
	const [LimitVideo, setLimitVideo] = useState(10);
	const [loadingImages, setLoadingImages] = useState(false);
	const [loadingVideo, setLoadingVideo] = useState(false);
	//
	const [openImages, setOpenImages] = useState(false);
	const [openVideo, setOpenVideo] = useState(false);
	const [openSound, setOpenSound] = useState(false);

	const [files, setFiles] = useState([]);

	const handleFileChange = (event) => {
		setFiles(event.target.files);
	};

	const handleUpload = async () => {
		if (files.length > 0) {
			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append("files", files[i]);
			}

			try {
				await AxiosInstance.post("/upload/news", formData)
					.then((success) => {
						alert("آپلود شما با موفقیت انجام شد .");
					})
					.catch((e) => {
						console.log(e);
					});
			} catch (error) {
				console.error("Error uploading files:", error);
			}
		} else {
			alert("لطفاً فایل های خود را انتخاب کنید !");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoadingImages(true);
			try {
				await AxiosInstance({
					method: "get",
					url: `download/all-images?limit=${LimitImages}`,
					withCredentials: true,
				})
					.then((success) => {
						console.log(success);
						setImages(success.data.body);
					})
					.catch((e) => {
						console.log(e);
					});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
			setLoadingImages(false);
		};
		fetchData();
	}, [LimitImages]);

	useEffect(() => {
		const fetchData = async () => {
			setLoadingVideo(true);
			try {
				await AxiosInstance({
					method: "get",
					url: `download/all-videos?limit=${LimitVideo}`,
					withCredentials: true,
				})
					.then((success) => {
						console.log(success);
						setVideos(success.data.body);
					})
					.catch((e) => {
						console.log(e);
					});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
			setLoadingVideo(false);
		};
		fetchData();
	}, [LimitVideo]);

	useEffect(() => {
		const ImagesScroll = document.getElementById("items-images-scroll-id");
		const handleScroll = () => {
			if (ImagesScroll && ImagesScroll.scrollTop + ImagesScroll.clientHeight >= ImagesScroll.scrollHeight) {
				setLimitImages(LimitImages + 50);
			}
		};
		ImagesScroll && ImagesScroll.addEventListener("scroll", handleScroll);
	}, [loadingImages, LimitImages]);

	useEffect(() => {
		const VideoScroll = document.getElementById("items-video-scroll-id");
		const handleScroll = () => {
			if (VideoScroll && VideoScroll.scrollTop + VideoScroll.clientHeight >= VideoScroll.scrollHeight) {
				setLimitVideo(LimitVideo + 10);
			}
		};
		VideoScroll && VideoScroll.addEventListener("scroll", handleScroll);
	}, [loadingVideo, LimitVideo]);

	return (
		<div className="container-gallery-files">
			<div className="content-option-button">
				<button
					onClick={() => {
						setOpenSound(true);
						setOpenVideo(false);
						setOpenImages(false);
					}}
				>
					صوتی
				</button>
				<button
					onClick={() => {
						setOpenVideo(true);
						setOpenImages(false);
						setOpenSound(false);
						setLoadingVideo(true);
					}}
				>
					ویدئو ها
				</button>
				<button
					onClick={() => {
						setOpenImages(true);
						setOpenVideo(false);
						setOpenSound(false);
						setLoadingImages(true);
					}}
				>
					تصاویر
				</button>
				<input id="upload_files_id" style={{ display: "none" }} type="file" multiple onChange={handleFileChange} />
				<div className="option-upload">
					<label htmlFor="upload_files_id" className="fa fa-upload"></label>
					<button onClick={handleUpload}>ارسال</button>
				</div>
			</div>
			<div className="content-gallery-files">
				{openImages && (
					<div className="content-images">
						<div id="items-images-scroll-id" className="items-images">
							{Images.images?.map((Image, index) => (
								<div key={index} className="list-item">
									<img src={process.env.REACT_APP_SET_URLS + Image.FilePath} alt="images" />
								</div>
							))}
							{loadingImages && <p className="loadingImages">Loading...</p>}
						</div>
					</div>
				)}
				{openVideo && (
					<div className="content-video">
						<div id="items-video-scroll-id" className="items-video">
							{Videos.video?.map((Video, index) => (
								<div key={index} className="list-item">
									<video src={Video.FilePath}></video>
								</div>
							))}
							{loadingVideo && <p className="loadingVideo">Loading...</p>}
						</div>
					</div>
				)}
				{openSound && (
					<div className="content-sound">
						<div className="items-sound">
							<h1>sound</h1>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Upload;
