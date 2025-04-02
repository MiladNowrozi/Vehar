import React, { useState, useEffect } from "react";
import "./upload.css"; // Import the CSS file
import { AxiosInstance } from "../../../../../../axiosInstance";
import { useLocation } from "react-router-dom";

const Upload = ({ editorRef, setFilePickerOpen }) => {
	const [Images, setImages] = useState([]);
	const [Videos, setVideos] = useState([]);
	const [LimitImages, setLimitImages] = useState(10);
	const [LimitVideo, setLimitVideo] = useState(10);
	const [loadingImages, setLoadingImages] = useState(false);
	const [loadingVideo, setLoadingVideo] = useState(false);
	//
	const [openImages, setOpenImages] = useState(false);
	const [openVideo, setOpenVideo] = useState(false);
	const [openSound, setOpenSound] = useState(false);
	const NewsId = useLocation().pathname.split("/")[2];

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
		ImagesScroll &&
			ImagesScroll.addEventListener("scroll", () => {
				if (
					ImagesScroll.scrollTop + ImagesScroll.clientHeight >= ImagesScroll.scrollHeight &&
					Images.total > LimitImages
				) {
					setLimitImages(LimitImages + 10);
				}
			});
	}, [loadingImages, LimitImages, Images]);

	useEffect(() => {
		const VideoScroll = document.getElementById("items-video-scroll-id");
		const handleScroll = () => {
			if (
				VideoScroll &&
				VideoScroll.scrollTop + VideoScroll.clientHeight >= VideoScroll.scrollHeight
			) {
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

	const insertImagesToEditor = async () => {
		if (NewsId === "upload-files") {
			try {
				await AxiosInstance.post("/delete/images", selectedImage)
					.then((success) => {
						alert("تصاویر با موفقیت حذف شدند .");
						// setImages(success.data.body);
						console.log(success.data.body);

						setSelectedImage([]);
					})
					.catch((e) => {
						alert("پوزش! ما نتونستیم فرایند حذف را انجام دهیم .");
						console.log(e);
					});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		} else {
			setFilePickerOpen(false);
			if (editorRef.current) {
				const imageTags = selectedImage
					.map(
						(img) =>
							`<a href="${img}"><img src="${img}" alt="Selected Image" style="max-width: 100%; height: auto;" /></a>`
					)
					.join("");
				editorRef.current.insertContent(imageTags);
				setSelectedImage([]); // Clear selection after inserting
				document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
			}
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
				<input
					id="upload_files_id"
					style={{ display: "none" }}
					type="file"
					multiple
					onChange={handleFileChange}
				/>
				{NewsId !== "create-news" && (
					<div className="option-upload">
						<label htmlFor="upload_files_id" className="fa fa-upload"></label>
						<button type="button" onClick={handleUpload}>
							ارسال
						</button>
					</div>
				)}
			</div>
			<div className="content-gallery-files">
				{openImages && (
					<div className="content-images">
						<div
							id="items-images-scroll-id"
							style={{ height: window.innerHeight - 145 }}
							className="items-images"
						>
							{Images.images?.length > 0 &&
								Images.images.map(
									(Image, index) =>
										(
											<div key={index} className="list-item">
												<label htmlFor={"match-index" + index}>
													<input
														type="checkbox"
														checked={selectedImage.includes(
															NewsId === "upload-files"
																? Image.id
																: process.env.REACT_APP_SET_URLS + Image.FilePath
														)}
														onChange={() =>
															toggleImageSelection(
																NewsId === "upload-files"
																	? Image.id
																	: process.env.REACT_APP_SET_URLS + Image.FilePath
															)
														}
													/>
													<img
														id={"match-index" + index}
														onClick={() =>
															toggleImageSelection(
																NewsId === "upload-files"
																	? Image.id
																	: process.env.REACT_APP_SET_URLS + Image.FilePath
															)
														}
														src={process.env.REACT_APP_SET_URLS + Image.FilePath}
														alt="images"
													/>
												</label>
											</div>
										) || "not find"
								)}
							{loadingImages && <p className="loadingImages">Loading...</p>}
						</div>
						<div className="options-control-images-selected">
							<button type="button" onClick={insertImagesToEditor} disabled={!selectedImage}>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedImage.length}</p>
							</div>
							<div>
								<p> تعداد کل: {Images.total}</p>
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
