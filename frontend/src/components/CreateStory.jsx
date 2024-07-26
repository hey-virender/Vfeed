import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import propTypes from "prop-types";

const CreateStory = ({ setShowAddStory }) => {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    try {
      if (!file) {
        console.error("Please select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file); // Ensure "image" matches the Multer config

      const response = await axios.post("/api/stories/uploadStory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setFile(null);
        fileInputRef.current.value = "";
        setShowAddStory(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="w-full top-full left h-screen bg-opacity-95 bg-zinc-700 flex  z-30 absolute ">
      <div className="w-full mt-28 mx-3 rounded-lg border-2  left h-96 bg-gray-700  px-3 py-4">
        <label htmlFor="story">Upload story</label>
        <div className="border-dashed border-2 text-center py-3 mt-2 rounded-xl">
          <input
            id="story"
            className="hidden"
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
          />
          <label htmlFor="story">
            {" "}
            {file ? file.name : "Click to select image"}
          </label>
        </div>
        {preview && (
          <div className="mt-4 h-24 mx-auto">
            <img
              src={preview}
              alt="Selected File"
              className="max-w-full h-full mx-auto rounded-lg"
            />
          </div>
        )}
        {preview && (
          <button
            className="my-5 block bg-emerald-600 px-4 mx-auto rounded-lg"
            onClick={handleSubmit}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

CreateStory.propTypes = {
  setShowAddStory: propTypes.func.isRequired,
};

export default CreateStory;
