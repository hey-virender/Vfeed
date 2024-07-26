import React from "react";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import socketService from "../socket/service";
const FollowButton = ({ searchedId }) => {
  const [isFollowing, setIsFollowing] = useState();

  const changeFollowStatus = (searchedId) => {
    socketService.emit("changeFollowStatus", searchedId);
  };

  useEffect(() => {
    socketService.emit("getFollowStatus", searchedId);
  }, [searchedId]);

  socketService.on("followStatus", (data) => {
    setIsFollowing(data);
  });

  return (
    <div className="w-full">
      <button
        onClick={() => {
          changeFollowStatus(searchedId);
        }}
        className={`${
          isFollowing ? "bg-white text-black" : "bg-blue-600"
        } text-md px-5 py-1 ml-16 rounded-lg`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

FollowButton.propTypes = {
  searchedId: propTypes.string.isRequired,
};

export default FollowButton;
