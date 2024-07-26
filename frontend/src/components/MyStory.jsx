import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
const MyStory = ({ handleAddStory }) => {
  const prefix = "http://localhost:3000/";
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get("/api/auth/profile");
      setUser(response.data);
    };
    getProfile();
  }, []);

  return (
    <div
      className=" h-16 w-16 flex flex-col items-center gap-1"
      onClick={handleAddStory}
    >
      <div className="h-12 w-12 border-2 border-purple-600 rounded-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={prefix + user?.profilePicture}
          alt=""
        />
      </div>
      <span className="text-xs">My Story</span>
    </div>
  );
};

MyStory.propTypes = {
  handleAddStory: PropTypes.func.isRequired,
};

export default MyStory;
