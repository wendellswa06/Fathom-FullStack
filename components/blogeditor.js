import React, { useRef, useEffect, useState, useCallback } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Loader from "./loader";
import moment from "moment";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const BlogEditor = ({
  title,
  blogId,
  content,
  description,
  coverImage,
  saveBlogData,
  publishBlogData,
  isSaving,
  isPublishing,
  created_at,
  read_time,
}) => {
  const [blogData, setBlogData] = useState({
    title,
    content,
    description,
    coverImage,
    created_at,
    read_time,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 376 / 262,
  });

  const [coverImgSrc, setCoverImgSrc] = useState(null);
  const [blob, setBlob] = useState(null);

  const handleChange = useCallback((content) => {
    setBlogData((prev) => {
      return { ...prev, content };
    });
  }, []);

  const handleTitleChange = (title) => {
    setBlogData((prev) => {
      return { ...prev, title };
    });
  };

  const handleDescriptionChange = (description) => {
    setBlogData((prev) => {
      return { ...prev, description };
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      console.log("acceptedFiles :>> ", acceptedFiles);
      if (acceptedFiles[0].type != "image/gif") {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          console.log("here");
          setCoverImgSrc(reader.result);
        });
        reader.readAsDataURL(acceptedFiles[0]);
      } else {
        setIsLoading(true);
        let form = new FormData();
        form.append("cover", acceptedFiles[0]);

        const response = await axios.post("/api/upload", form);
        setBlogData((prev) => {
          return { ...prev, coverImage: response.data.result[0].url };
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // If you setState the crop in here you should return false.
  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const blob = await getCroppedImg(imageRef, crop, "newFile.jpeg");
      console.log("croppedImageUrl :>> ", blob.fileUrl);
      setBlogData((prev) => {
        return { ...prev, coverImage: blob.fileUrl };
      });
      setBlob(blob);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        let fileUrl = null;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        blob.fileUrl = fileUrl;
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const onSetCoverImage = async () => {
    setIsLoading(true);
    let form = new FormData();
    const filename = "blog_cover_" + String(moment().unix());
    form.append("cover", blob, "blog_cover" + filename);

    const response = await axios.post("/api/upload", form);
    console.log("cover image upload result :>> ", response.data.result);

    setBlogData((prev) => {
      return { ...prev, coverImage: response.data.result[0].url };
    });
    setCoverImgSrc(null);
    setIsLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onChangeTime = (e) => {
    const created_time = moment(e.target.value).unix();
    console.log("created_time :>> ", created_time);

    setBlogData({
      ...blogData,
      created_at: created_time,
    });
  };

  return (
    <div>
      <div className="flex justify-between font-avenir-light">
        <div className="flex justify-start">
          <button
            onClick={() => publishBlogData(blogData)}
            className={
              isPublishing
                ? "focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed px-8 py-1.5 border border-black bg-white"
                : "focus:outline-none hover:bg-black hover:text-white transition duration-300 px-8 py-1.5 border border-black bg-white"
            }
            disabled={isPublishing}
          >
            {isPublishing ? <span>Publishing...</span> : <span>Publish</span>}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => saveBlogData(blogData)}
            className={
              isSaving
                ? "focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed px-8 py-1.5 border border-black bg-white"
                : "focus:outline-none hover:bg-black hover:text-white transition duration-300 px-8 py-1.5 border border-black bg-white"
            }
            disabled={isSaving}
          >
            {isSaving ? <span>Saving...</span> : <span>Save</span>}
          </button>
          <button
            onClick={() => window.open(`/posts/${blogId}`, "_blank")}
            className="focus:outline-none ml-4 hover:bg-black hover:text-white transition duration-300 px-8 py-1.5 border border-black bg-white"
          >
            Preview
          </button>
        </div>
      </div>
      <div className="mt-8 mb-8">
        <input
          onChange={(e) => handleTitleChange(e.target.value)}
          type="text"
          placeholder="Title"
          defaultValue={title}
          className="w-full p-1 text-xl font-bold border-2 font-avenir-light"
        />
      </div>
      <textarea
        onChange={(e) => handleDescriptionChange(e.target.value)}
        placeholder="Description"
        defaultValue={blogData.description}
        className="w-full h-20 p-1 text-base font-semibold text-gray-700 border-2 font-avenir-light"
      />
      <div className="flex flex-row w-full mt-1 mb-5">
        <div className="flex w-1/2">
          <p className="mr-5 font-bold">Date </p>
          <input
            type="date"
            value={moment.unix(blogData.created_at).format("YYYY-MM-DD")}
            className="border-2"
            onChange={onChangeTime}
          />
        </div>
        <div className="flex w-1/2 ml-5">
          <p className="w-auto mr-5 font-bold">Read Time</p>
          <input
            type="number"
            className="w-1/6 border-2"
            value={blogData.read_time}
            onChange={(e) =>
              setBlogData({ ...blogData, read_time: e.target.value })
            }
          />
          <p className="ml-5 font-bold">min</p>
        </div>
      </div>
      <div
        className="flex items-center justify-center w-full h-56 mb-5 mr-5 bg-no-repeat bg-cover border border-gray-600 border-dashed cursor-pointer"
        style={{
          backgroundImage: `url("${blogData.coverImage}")`,
          width: "376px",
          height: "262px",
        }}
      >
        <div
          {...getRootProps()}
          className="relative flex items-center justify-center w-full h-full"
        >
          <Loader isLoading={isLoading} />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="font-bold">Drop the files here ...</p>
          ) : (
            <p className="p-10 text-center">
              Drag and drop cover image here, or click to select
            </p>
          )}
        </div>
      </div>
      <div className="py-2 mt-6 bg-white">
        <div className="relative">
          <SunEditor
            setOptions={{
              height: "auto",
              minHeight: "30vh",
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                ["paragraphStyle", "blockquote"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor", "textStyle"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["link", "image", "video"],
                ["fullScreen", "codeView"],
                ["preview", "print"],
              ],
              imageRotation: true,
              imageUploadUrl: "/api/upload",
              defaultStyle: "font-family: Avenir-Light; font-size: 18px;",
            }}
            onChange={handleChange}
            defaultValue={content !== "undefined" && content}
          />
        </div>
      </div>
      <Modal
        isOpen={Boolean(coverImgSrc)}
        onRequestClose={() => setCoverImgSrc(null)}
        contentLabel="My dialog"
        className="crop-modal"
        overlayClassName="my-overlay"
        style={customStyles}
      >
        <ReactCrop
          src={coverImgSrc}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
        <div className="flex flex-row">
          <button
            onClick={() => setCoverImgSrc(null)}
            className="focus:outline-none hover:bg-black mr-5 hover:text-white transition duration-300 px-8 py-1.5 border border-black bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onSetCoverImage}
            className={
              isLoading
                ? "focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed px-8 py-1.5 border border-black bg-white"
                : "focus:outline-none hover:bg-black hover:text-white transition duration-300 px-8 py-1.5 border border-black bg-white"
            }
            disabled={isLoading}
          >
            {isLoading ? <span>Submiting...</span> : <span>Submit</span>}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BlogEditor;
