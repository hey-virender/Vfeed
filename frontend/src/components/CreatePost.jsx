import React, { useState, useRef } from "react";
import axios from "axios";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !caption) {
      console.error("Please select a file and enter a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure "image" matches the Multer config
    formData.append("caption", caption);

    try {
      await axios.post("/api/posts/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-lg h-full mx-auto mt-10 mb-5 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Upload Image/Video
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-950">
            <input
              id="file"
              name="image" // Ensure this matches the backend
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className="cursor-pointer">
              {file ? file.name : "Click to select a file"}
            </label>
          </div>
          {preview && (
            <div className="mt-4">
              {file && file.type.startsWith("image") && (
                <img
                  src={preview}
                  alt="Selected File"
                  className="max-w-full h-auto rounded-lg"
                />
              )}
              {file && file.type.startsWith("video") && (
                <video
                  src={preview}
                  controls
                  className="max-w-full h-auto rounded-lg"
                ></video>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="caption"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Caption
          </label>
          <textarea
            id="caption"
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
