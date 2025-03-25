import React, { useState, useEffect } from "react";
import "./upload.css"; // Import the CSS file
import { AxiosInstance } from "../../../../../../axiosInstance";
import { CreateNews } from "../CreateNews";

const Upload = ({ editorRef, setFilePickerOpen }) => {
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

	const [selectedImage, setSelectedImage] = useState([]);
	const toggleImageSelection = (image) => {
		setSelectedImage((prev) => {
			if (prev.includes(image)) {
				return prev.filter((img) => img !== image);
			} else {
				return [...prev, image];
			}
		});
	};

	const insertImagesToEditor = () => {
		setFilePickerOpen(false);
		if (editorRef.current) {
			const imageTags = selectedImage.map((img) => `<img src="${img}" alt="Selected Image" style="max-width: 100%; height: auto;" />`).join("");
			editorRef.current.insertContent(imageTags);
			setSelectedImage([]); // Clear selection after inserting
			document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
		}
	};
	return (
		<div className="container-gallery-files">
			<div className="content-option-button">
				<button
					type="button"
					onClick={() => {
						setOpenSound(true);
						setOpenVideo(false);
						setOpenImages(false);
					}}
				>
					صوتی
				</button>
				<button
					type="button"
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
					type="button"
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
					<button type="button" onClick={handleUpload}>
						ارسال
					</button>
				</div>
			</div>
			<div className="content-gallery-files">
				{openImages && (
					<div className="content-images">
						<div id="items-images-scroll-id" style={{ height: window.innerHeight - 145 }} className="items-images">
							{Images.images?.map((Image, index) => (
								<div key={index} className="list-item">
									<label htmlFor={"match-index" + index}>
										<input
											type="checkbox"
											checked={selectedImage.includes(process.env.REACT_APP_SET_URLS + Image.FilePath)}
											onChange={() => toggleImageSelection(process.env.REACT_APP_SET_URLS + Image.FilePath)}
										/>
										<img
											id={"match-index" + index}
											onClick={() => toggleImageSelection(process.env.REACT_APP_SET_URLS + Image.FilePath)}
											src={process.env.REACT_APP_SET_URLS + Image.FilePath}
											alt="images"
										/>
									</label>
								</div>
							))}
							{loadingImages && <p className="loadingImages">Loading...</p>}
						</div>
						<div className="options-control-images-selected">
							<button type="button" onClick={insertImagesToEditor} disabled={!selectedImage}>
								درج تصویر در ادیتور
							</button>
							<div>
								<p>انخاب شده: {selectedImage.length}</p>
							</div>
							<div>
								<p> تعداد کل: {Images.images.length}</p>
							</div>
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
