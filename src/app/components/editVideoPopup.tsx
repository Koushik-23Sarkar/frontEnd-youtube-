"use client";
import { useState } from "react";
import "../globals.css";

export default function EditVideoPopup({
  onActiveTabChange,
  handleVideoUpdate
}: {
  onActiveTabChange: any;
  handleVideoUpdate: any
}) {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file)
      setPreview(URL.createObjectURL(file)); 
    } ;
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    handleVideoUpdate(formData);
    onActiveTabChange(null);
  };
  return (
    <div className="fixed inset-0 top-[calc(66px)] z-10 flex flex-col bg-black/50 px-4 pb-[86px] pt-4 sm:top-[calc(82px)] sm:px-14 sm:py-8">
      <div className="mx-auto w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">
            Edit Video
            <span className="block text-sm text-gray-300">
              Share where you&#x27;ve worked on your profile.
            </span>
          </h2>
          <button onClick={() => onActiveTabChange(null)} className="h-6 w-6">
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <label htmlFor="thumbnail" className="mb-1 inline-block">
          Thumbnail
          <sup>*</sup>
        </label>
        <label
          className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
          htmlFor="thumbnail"
        >
          <input
            type="file"
            className="sr-only"
            id="thumbnail"
            onChange={handleThumbnailChange}
          />
          <img
            // src="https://images.pexels.com/photos/7775641/pexels-photo-7775641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            src={preview || "https://images.pexels.com/photos/7775641/pexels-photo-7775641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt="State Management with Redux"
          />
        </label>
        <div className="mb-6 flex flex-col gap-y-4">
          <div className="w-full">
            <label htmlFor="title" className="mb-1 inline-block">
              Title
              <sup>*</sup>
            </label>
            <input
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border bg-transparent px-2 py-1 outline-none"
              value={title}
            />
          </div>
          <div className="w-full">
            <label htmlFor="desc" className="mb-1 inline-block">
              Description
              <sup>*</sup>
            </label>
            <textarea
              id="desc"
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
            >
              {description}
            </textarea>
          </div>
        </div>

        {/** button */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onActiveTabChange(null)}
            className="border px-4 py-3"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdate()}
            disabled={loading}
            className="bg-[#ae7aff] px-4 py-3 text-black disabled:bg-[#E4D3FF]"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
