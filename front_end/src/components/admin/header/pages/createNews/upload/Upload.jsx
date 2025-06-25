import React, { useState, useEffect } from "react";
import "./upload.css"; // Import the CSS file
import { AxiosInstance } from "../../../../../../axiosInstance";
import { useLocation } from "react-router-dom";

const Upload = ({ editorRef, setFilePickerOpen }) => {
	const [Images, setImages] = useState([]);
	const [Videos, setVideos] = useState([]);
	const [Other, setOther] = useState([]);

	const [LimitImages, setLimitImages] = useState(30);
	const [LimitVideo, setLimitVideo] = useState(10);
	const [LimitOther, setLimitOther] = useState(30);
	const [loadingImages, setLoadingImages] = useState(false);
	const [loadingVideo, setLoadingVideo] = useState(false);
	const [loadingOther, setLoadingOther] = useState(false);
	//
	const [openImages, setOpenImages] = useState(false);
	const [openVideo, setOpenVideo] = useState(false);
	const [openOther, setOpenOther] = useState(false);
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
				await AxiosInstance.post("/upload/file", formData)
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
		const fetchData = async () => {
			setLimitOther(true);
			try {
				await AxiosInstance({
					method: "get",
					url: `download/all-others?limit=${LimitOther}`,
					withCredentials: true,
				})
					.then((success) => {
						setOther(success.data.body);
					})
					.catch((e) => {
						console.log(e);
					});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
			setLimitOther(false);
		};
		fetchData();
	}, [LimitOther]);

	useEffect(() => {
		const ImagesScroll = document.getElementById("items-images-scroll-id");
		if (!ImagesScroll) return;
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = ImagesScroll;
			if (
				Images.images.length > LimitImages - 30 &&
				scrollTop + 0.6 + clientHeight >= scrollHeight
			) {
				setLimitImages((prev) => prev + 30);
			}
		};
		ImagesScroll.addEventListener("scroll", handleScroll);
		return () => {
			ImagesScroll.removeEventListener("scroll", handleScroll);
		};
	}, [loadingImages, LimitImages]);

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

	useEffect(() => {
		const OtherScroll = document.getElementById("items-other-scroll-id");

		const handleScroll = () => {
			if (
				OtherScroll &&
				OtherScroll.scrollTop + OtherScroll.clientHeight >= OtherScroll.scrollHeight
			) {
				setLimitOther(LimitOther + 10);
			}
		};
		OtherScroll && OtherScroll.addEventListener("scroll", handleScroll);
	}, [loadingOther, LimitOther]);

	const [selectedFile, setSelectedFile] = useState([]);

	const toggleImageSelection = (file) => {
		setSelectedFile((prev) => {
			if (prev.includes(file)) {
				return prev.filter((a) => a !== file);
			} else {
				return [...prev, file];
			}
		});
	};

	const insertImagesToEditor = async (a) => {
		if (a.target.id === "video") {
			if (NewsId === "upload-files") {
				try {
					await AxiosInstance.post("/delete/videos", selectedFile)
						.then((success) => {
							alert("فیلم ها با موفقیت حذف شدند .");
							// setImages(success.data.body);
							console.log(success.data.body);
							setSelectedFile([]);
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
					console.log(selectedFile);
					const imageTags = selectedFile
						.map(
							(video) =>
								`<video src="${video}" controls alt="Selected Video" style="width: 100%; height: 450px;"></video>`
						)
						.join("");
					editorRef.current.insertContent(imageTags);
					setSelectedFile([]); // Clear selection after inserting
					document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
				}
			}
		} else if (a.target.id === "image") {
			if (NewsId === "upload-files") {
				try {
					await AxiosInstance.post("/delete/images", selectedFile)
						.then((success) => {
							alert("تصاویر با موفقیت حذف شدند .");
							// setImages(success.data.body);
							console.log(success.data.body);
							setSelectedFile([]);
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
					console.log(selectedFile);
					const imageTags = selectedFile
						.map(
							(img) =>
								`<a href="${img}"><img src="${img}" alt="Selected Image" style="max-width: 100%; height: auto;" /></a>`
						)
						.join("");
					editorRef.current.insertContent(imageTags);
					setSelectedFile([]); // Clear selection after inserting
					document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
				}
			}
		} else if (a.target.id === "other") {
			if (NewsId === "upload-files") {
				try {
					await AxiosInstance.post("/delete/others", selectedFile)
						.then((success) => {
							alert("فایل با موفقیت حذف شدند .");
							// setImages(success.data.body);
							console.log(success.data.body);
							setSelectedFile([]);
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
					console.log(selectedFile);
					const imageTags = selectedFile
						.map(
							(img) =>
								`<a href="${img}"><img src="${img}" alt="Selected Image" style="max-width: 100%; height: auto;" /></a>`
						)
						.join("");
					editorRef.current.insertContent(imageTags);
					setSelectedFile([]); // Clear selection after inserting
					document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
				}
			}
		} else {
		}
	};
	return (
		<div className="container-gallery-files">
			<div className="content-option-button">
				<button
					type="button"
					onClick={() => {
						setOpenOther(true);
						setOpenVideo(false);
						setOpenImages(false);
						setLoadingOther(true);
					}}
				>
					دیگر فایل ها
				</button>
				<button
					type="button"
					onClick={() => {
						setOpenVideo(true);
						setOpenImages(false);
						setOpenOther(false);
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
						setOpenOther(false);
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
														checked={selectedFile.includes(
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
							{loadingImages && (
								<p className="loadingImages">
									{Images.images.length === 0 && "تصویری وجود ندارد !"}
								</p>
							)}
						</div>
						<div className="options-control-images-selected">
							<button
								id="image"
								type="button"
								onClick={insertImagesToEditor}
								disabled={!selectedFile}
							>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedFile.length}</p>
							</div>
							<div className="count-news-scrool">
								<p> {Images.total}</p> از
								<p> {Images.images.length}</p>
							</div>
						</div>
					</div>
				)}
				{openVideo && (
					<div className="content-video">
						<div id="items-video-scroll-id" className="items-video">
							{Videos.video?.map((Video, index) => (
								<div key={index} className="list-item">
									<label htmlFor={"match-index-video" + index}>
										<input
											type="checkbox"
											checked={selectedFile.includes(
												NewsId === "upload-files"
													? Video.id
													: process.env.REACT_APP_SET_VIDEO + Video.FilePath
											)}
											onChange={() =>
												toggleImageSelection(
													NewsId === "upload-files"
														? Video.id
														: process.env.REACT_APP_SET_VIDEO + Video.FilePath
												)
											}
										/>
										<video
											id={"match-index-video" + index}
											onClick={() =>
												toggleImageSelection(
													NewsId === "upload-files"
														? Video.id
														: process.env.REACT_APP_SET_VIDEO + Video.FilePath
												)
											}
											src={process.env.REACT_APP_SET_VIDEO + Video.FilePath}
										></video>
									</label>
								</div>
							))}
							{loadingVideo && (
								<p className="loadingVideo">
									{Videos.video.length === 0 && "ویدئویی وجود ندارد !"}
								</p>
							)}
						</div>
						<div className="options-control-video-selected">
							<button
								id="video"
								type="button"
								onClick={insertImagesToEditor}
								disabled={!selectedFile}
							>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedFile.length}</p>
							</div>
							<div className="count-video-scrool">
								<p> {Videos.total}</p> از
								<p> {Videos.video.length}</p>
							</div>
						</div>
					</div>
				)}
				{openOther && (
					<div className="content-other">
						<div id="items-other-scroll-id" className="items-other">
							{Other.other?.map((other, index) => (
								<div key={index} className="list-item">
									<input
										type="checkbox"
										checked={selectedFile.includes(
											NewsId === "upload-files"
												? other.id
												: process.env.REACT_APP_SET_URLS + other.FilePath
										)}
										onChange={() =>
											toggleImageSelection(
												NewsId === "upload-files"
													? other.id
													: process.env.REACT_APP_SET_URLS + other.FilePath
											)
										}
									/>
									<a
										onClick={() =>
											toggleImageSelection(
												NewsId === "upload-files"
													? other.id
													: process.env.REACT_APP_SET_URLS_OTHER + other.FilePath
											)
										}
										src={process.env.REACT_APP_SET_URLS_OTHER + other.FilePath}
									></a>
								</div>
							))}
							{loadingOther && (
								<p className="loadingOther">{Other.other.length === 0 && "فایلی وجود ندارد !"}</p>
							)}
						</div>
						<div className="options-control-other-selected">
							<button
								id="other"
								type="button"
								onClick={insertImagesToEditor}
								disabled={!selectedFile}
							>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedFile.length}</p>
							</div>
							<div className="count-other-scrool">
								<p>{Other.total}</p> از
								<p>{Other.other.length}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Upload;
