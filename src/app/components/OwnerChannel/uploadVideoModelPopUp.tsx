"use client"
import { useState } from "react";
import Button from "../button";

export default function UploadVideoModelPopUp({
  handleVideoPopUp,
  handleUploadVideo
}: {
  handleVideoPopUp: any,
  handleUploadVideo: any
}) {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file)); // creates a preview URL
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };
  return (
     <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
      <div className="h-full overflow-auto border bg-[#121212]">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Upload Videos</h2>
          <div className="mb-8 mt-auto flex flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
            <button
              onClick={() => handleVideoPopUp("noVideoPopUp")}
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#383737] px-3 py-2 text-center font-bold text-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Cancel
            </button>
            <button
              onClick={() =>{
                console.log(video)
                console.log(thumbnail)
                console.log(title)
                console.log(description)
                handleUploadVideo({
                  title:title,
                  description:description,
                  videoFile: video,
                  thumbnail: thumbnail
                })
                handleVideoPopUp("uploadingVideoPop")
              }}
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Save
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
          {/* Video upload */}
          <div className="w-full border-2 border-dashed px-4 py-12 text-center">
            {!videoPreview ? (
              <>
                <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    ></path>
                  </svg>
                </span>
                <h6 className="mb-2 font-semibold">
                  Drag and drop video files to upload
                </h6>
                <p className="text-gray-400">
                  Your videos will be private until you publish them.
                </p>
                <label
                  htmlFor="upload-video"
                  className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                >
                  <input
                    type="file"
                    id="upload-video"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="sr-only"
                  />
                  Select Video
                </label>
              </>
            ) : (
              <div className="relative">
                <video
                  src={videoPreview}
                  controls
                  className="mx-auto h-60 rounded w-full"
                />
                <button
                  onClick={() => {
                    setVideo(null);
                    setVideoPreview(null);
                  }}
                  className="mt-4 rounded bg-red-500 px-3 py-1 text-white"
                >
                  Remove Video
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail upload */}
          <div className="w-full">
            <label htmlFor="thumbnail" className="mb-1 inline-block">
              Thumbnail <sup>*</sup>
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-3 h-40 w-auto rounded border object-cover"
              />
            )}
          </div>

          {/* Title */}
          <div className="w-full">
            <label htmlFor="title" className="mb-1 inline-block">
              Title <sup>*</sup>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border bg-transparent px-2 py-1 outline-none"
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <label htmlFor="desc" className="mb-1 inline-block">
              Description <sup>*</sup>
            </label>
            <textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
