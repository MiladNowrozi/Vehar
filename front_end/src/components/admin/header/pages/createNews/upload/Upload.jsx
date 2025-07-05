import React, { useState, useEffect } from "react";
import "./upload.css"; // Import the CSS file
import { AxiosInstance } from "../../../../../../axiosInstance";
import { useLocation } from "react-router-dom";

const Upload = ({ editorRef, setFilePickerOpen }) => {
	const [Images, setImages] = useState([]);
	const [ThumbnailVideos, setThumbnailVideos] = useState([]);
	const [Other, setOther] = useState([]);
	console.log(ThumbnailVideos);

	const [play, setPlay] = useState(false);

	const [LimitImages, setLimitImages] = useState(30);
	const [LimitThumbnailVideo, setLimitThumbnailVideo] = useState(10);
	const [LimitOther, setLimitOther] = useState(30);
	const [loadingImages, setLoadingImages] = useState(false);
	const [loadingVideo, setLoadingVideo] = useState(false);
	const [loadingOther, setLoadingOther] = useState(false);
	// PROCESS UPLOADING showing file, loading and messaging
	const [loadingUpload, setLoadingUpload] = useState(false);
	const [actionLoding, setActionLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [previews, setPreviews] = useState([]);
	//
	const [openImages, setOpenImages] = useState(false);
	const [openThumbnailVideo, setOpenThumbnailVideo] = useState(false);
	const [openOther, setOpenOther] = useState(false);
	const NewsId = useLocation().pathname.split("/")[2];

	const formatFileSize = (bytes) => {
		if (bytes < 1024) return bytes + " B";
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
		if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
		return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";
	};
	const handleFileChange = (event) => {
		const files = Array.from(event.target.files);
		setSelectedFiles(files);

		const previewList = files.map((file) => {
			const url = URL.createObjectURL(file);
			return {
				name: file.name,
				type: file.type,
				size: file.size,
				url,
			};
		});

		setPreviews(previewList);
	};

	const handleUpload = async () => {
		if (selectedFiles.length > 0) {
			const formData = new FormData();
			for (let i = 0; i < selectedFiles.length; i++) {
				formData.append("files", selectedFiles[i]);
			}

			try {
				setLoadingUpload(true);
				setActionLoading(true);
				await AxiosInstance.post("/upload/file", formData)
					.then((success) => {
						setMessage("فایل ها با موفقیت بارگزاری شدند ✅");
					})
					.catch((e) => {
						setMessage("بارگزاری با شکست موجه شد ❌");
						console.log(e);
					});
			} catch (error) {
				setMessage("خطا در هنگام بارگزاری ⚠️");
				console.error("Error uploading files:", error);
			} finally {
				setLoadingUpload(false);
			}
		} else {
			alert("لطفاً یک فایل را انتخاب کنید !");
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
					url: `download/all-video-thumbnail?limit=${LimitThumbnailVideo}`,
					withCredentials: true,
				})
					.then((success) => {
						setThumbnailVideos(success.data.body);
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
	}, [LimitThumbnailVideo]);

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
		if (!VideoScroll) return;
		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } = VideoScroll;
			if (
				ThumbnailVideos.video.length > LimitThumbnailVideo - 10 &&
				scrollTop + 1 + clientHeight >= scrollHeight
			) {
				setLimitThumbnailVideo((prev) => prev + 10);
			}
		};
		VideoScroll.addEventListener("scroll", handleScroll);
		return () => {
			VideoScroll.removeEventListener("scroll", handleScroll);
		};
	}, [loadingVideo, LimitThumbnailVideo]);

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

	const toggleImageSelection = (file) => {
		setSelectedFiles((prev) => {
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
					setActionLoading(true);
					await AxiosInstance.post("/delete/videos", selectedFiles)
						.then((success) => {
							document.location.reload();
							setMessage("فیلم ها با موفقیت حذف شدند ✅");
							console.log(success.data.body);
							setSelectedFiles([]);
						})
						.catch((e) => {
							setMessage("حذف با شکست موجه شد ❌");
							console.log(e);
						});
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			} else {
				setFilePickerOpen(false);
				if (editorRef.current) {
					const imageTags = selectedFiles
						.map(
							(video) =>
								`<video src="${video}" controls alt="Selected Video" style="width: 100%; height: 450px;"></video>`
						)
						.join("");
					editorRef.current.insertContent(imageTags);
					setSelectedFiles([]); // Clear selection after inserting
					document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
				}
			}
		} else if (a.target.id === "image") {
			if (NewsId === "upload-files") {
				try {
					setActionLoading(true);
					await AxiosInstance.post("/delete/images", selectedFiles)
						.then((success) => {
							setMessage("تصاویر با موفقیت حذف شدند ✅");
							console.log(success.data.body);
							setSelectedFiles([]);
						})
						.catch((e) => {
							setMessage("حذف با شکست موجه شد ❌");
							console.log(e);
						});
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			} else {
				setFilePickerOpen(false);
				if (editorRef.current) {
					console.log(selectedFiles);
					const imageTags = selectedFiles
						.map(
							(img) =>
								`<a href="${img}"><img src="${img}" alt="Selected Image" style="max-width: 100%; height: auto;" /></a>`
						)
						.join("");
					editorRef.current.insertContent(imageTags);
					setSelectedFiles([]); // Clear selection after inserting
					document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
				}
			}
		} else if (a.target.id === "other") {
			if (NewsId === "upload-files") {
				setActionLoading(true);
				try {
					await AxiosInstance.post("/delete/others", selectedFiles)
						.then((success) => {
							setMessage("فایل ها با موفقیت حذف شدند ✅");
							console.log(success.data.body);
							setSelectedFiles([]);
						})
						.catch((e) => {
							setMessage("حذف با شکست موجه شد ❌");
							console.log(e);
						});
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			} else {
				setFilePickerOpen(false);
				if (editorRef.current) {
					console.log(selectedFiles);
					const imageTags = selectedFiles
						.map(
							(img) =>
								`<a href="${img}"><img src="${img}" alt="Selected Image" style="max-width: 100%; height: auto;" /></a>`
						)
						.join("");
					editorRef.current.insertContent(imageTags);
					setSelectedFiles([]); // Clear selection after inserting
					document.querySelector(".tox.tox-silver-sink.tox-tinymce-aux").style.display = "block";
				}
			}
		} else {
		}
	};

	// preview files before uploaded them

	const renderPreview = (file) => {
		if (file.type.startsWith("image/")) {
			return <img src={file.url} alt={file.name} width="150" style={{ marginTop: 5 }} />;
		} else if (file.type.startsWith("video/")) {
			return (
				<video width="250" controls style={{ marginTop: 5 }}>
					<source src={file.url} type={file.type} />
				</video>
			);
		} else {
			return <span style={{ color: "#555" }}>📄</span>;
		}
	};

	return (
		<div className="container-gallery-files">
			<div className="content-option-button">
				<button
					type="button"
					onClick={() => {
						setOpenOther(true);
						setOpenThumbnailVideo(false);
						setOpenImages(false);
						setLoadingOther(true);
					}}
				>
					دیگر فایل ها
				</button>
				<button
					type="button"
					onClick={() => {
						setOpenThumbnailVideo(true);
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
						setOpenThumbnailVideo(false);
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
						<label
							htmlFor="upload_files_id"
							onClick={() => {
								setOpenThumbnailVideo(false);
								setOpenImages(false);
								setOpenOther(false);
								setLoadingVideo(false);
							}}
							className="fa fa-upload"
						></label>
						<button type="button" onClick={handleUpload}>
							ارسال
						</button>
					</div>
				)}
			</div>

			{previews.length > 0 && (
				<div className="ShowingFilesBeforeUploaded">
					<h4>Selected Files:</h4>
					<div className="content-items">
						{previews.map((file, index) => (
							<div key={index} className="items-upload">
								{renderPreview(file)}
								<strong>{file.name}</strong>
								<p>{formatFileSize(file.size)}</p>
							</div>
						))}
					</div>
				</div>
			)}
			{actionLoding && (
				<div className="action-showing-uploading">
					<div className="content-action">
						<div className="item-action">
							{loadingUpload && <p>در حال بارگزاری لطفاً صبر کنید ...</p>}
							{!loadingUpload && message && <p>{message}</p>}
						</div>
						{!loadingUpload && (
							<button
								onClick={() => {
									setActionLoading(false);
									document.location.reload();
								}}
							>
								بستن
							</button>
						)}
					</div>
				</div>
			)}
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
											<div key={index} className="list-item-images">
												<label htmlFor={"match-index" + index}>
													<input
														type="checkbox"
														checked={selectedFiles.includes(
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
								disabled={!selectedFiles}
							>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedFiles.length}</p>
							</div>
							<div className="count-news-scrool">
								<p> {Images.total}</p> از
								<p> {Images.images.length}</p>
							</div>
						</div>
					</div>
				)}
				{openThumbnailVideo && (
					<div className="content-video">
						<div id="items-video-scroll-id" className="items-video">
							{ThumbnailVideos.video?.map((Thumbnail, index) => (
								<div key={index} className="list-item-video">
									<label htmlFor={"match-index-video" + index}>
										<input
											type="checkbox"
											checked={selectedFiles.includes(
												NewsId === "upload-files"
													? Thumbnail.id
													: process.env.REACT_APP_SET_VIDEO + Thumbnail.FilePath
											)}
											onChange={() =>
												toggleImageSelection(
													NewsId === "upload-files"
														? Thumbnail.id
														: process.env.REACT_APP_SET_VIDEO + Thumbnail.FilePath
												)
											}
										/>
										{/* <video
											id={"match-index-video" + index}
											onClick={() =>
												toggleImageSelection(
													NewsId === "upload-files"
														? Thumbnail.id
														: process.env.REACT_APP_SET_VIDEO + Thumbnail.FilePath
												)
											}
											src={process.env.REACT_APP_SET_VIDEO + Thumbnail.FilePath}
										></video> */}
										{play ? (
											<video
												id={"match-index-video" + index}
												src={process.env.REACT_APP_SET_VIDEO + Thumbnail.FilePath}
												controls
												autoPlay
											/>
										) : (
											<img
												src={process.env.REACT_APP_SET_TAHUMBNAIL + Thumbnail.ThumbnailUrl}
												alt={Thumbnail.OriginalName}
												onClick={() => setPlay(true)}
											/>
										)}
									</label>
								</div>
							))}
							{loadingVideo && (
								<p className="loadingVideo">
									{ThumbnailVideos.video?.length === 0 && "ویدئویی وجود ندارد !"}
								</p>
							)}
						</div>
						<div className="options-control-video-selected">
							<button
								id="video"
								type="button"
								onClick={insertImagesToEditor}
								disabled={!selectedFiles}
							>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedFiles.length}</p>
							</div>
							<div className="count-video-scrool">
								<p> {ThumbnailVideos.total}</p> از
								<p> {ThumbnailVideos.video.length}</p>
							</div>
						</div>
					</div>
				)}
				{openOther && (
					<div className="content-other">
						<div id="items-other-scroll-id" className="items-other">
							{Other.other?.map((other, index) => (
								<div key={index} className="list-item-other">
									<input
										type="checkbox"
										checked={selectedFiles.includes(
											NewsId === "upload-files"
												? other.id
												: process.env.REACT_APP_SET_URLS_OTHER + other.FilePath
										)}
										onChange={() =>
											toggleImageSelection(
												NewsId === "upload-files"
													? other.id
													: process.env.REACT_APP_SET_URLS_OTHER + other.FilePath
											)
										}
									/>
									<span
										onClick={() =>
											toggleImageSelection(
												NewsId === "upload-files"
													? other.id
													: process.env.REACT_APP_SET_URLS_OTHER + other.FilePath
											)
										}
										src={process.env.REACT_APP_SET_URLS_OTHER + other.FilePath}
									>
										📄
									</span>
									<p>{other.OriginalName}</p>
								</div>
							))}
							{loadingOther && (
								<p className="loadingOther">{Other.other?.length === 0 && "فایلی وجود ندارد !"}</p>
							)}
						</div>
						<div className="options-control-other-selected">
							<button
								id="other"
								type="button"
								onClick={insertImagesToEditor}
								disabled={!selectedFiles}
							>
								{NewsId === "upload-files" ? "حذف" : "درج در ادیتور"}
							</button>
							<div>
								<p>انخاب شده: {selectedFiles.length}</p>
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
