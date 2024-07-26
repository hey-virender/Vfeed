import React from "react";
import { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
const ChangeUserPic = ({ setShowPictureDialog, currentPicture }) => {
  const prefix = "http://localhost:3000/";

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(prefix + currentPicture);

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

      const response = await axios.post(
        "/api/auth/changeProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setFile(null);
        setShowPictureDialog(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div className="w-4/5 mt-5 mx-auto rounded-lg border-2 h-70 bg-gray-700  px-3 py-4">
      <label htmlFor="story">Change Profile Picture</label>
      {preview && (
        <div className="mt-4 h-24 w-24 rounded-full overflow-hidden mx-auto">
          <img
            src={preview}
            alt="Selected File"
            className="max-w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      <div className="border-dashed border-2 text-center py-3 mt-2 rounded-xl">
        <input
          id="story"
          className="hidden"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="story">
          {file ? file.name : "Click to select image"}
        </label>
      </div>

      {preview && (
        <button
          onClick={handleSubmit}
          className="my-5 block bg-emerald-600 px-4 mx-auto rounded-lg"
        >
          Upload
        </button>
      )}
    </div>
  );
};

ChangeUserPic.propTypes = {
  setShowPictureDialog: propTypes.func.isRequired,
  currentPicture: propTypes.string,
};

export default ChangeUserPic;
