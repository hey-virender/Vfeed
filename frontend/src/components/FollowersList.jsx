import React from "react";
import { useState } from "react";
import socketService from "../socket/service";
import { useEffect } from "react";
import { PropTypes } from "prop-types";

const FollowersList = ({ searchedProfile, userId }) => {
  const prefix = "http://localhost:3000/";
  const [currentTab, setCurrentTab] = useState("followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    if (searchedProfile) {
      socketService.emit("getFollowers", userId);
      socketService.emit("getFollowing", userId);
    } else {
      socketService.emit("getFollowers");
      socketService.emit("getFollowing");
    }
  }, [searchedProfile, userId]);
  socketService.on("followers", (data) => {
    setFollowers(data);
  });
  socketService.on("following", (data) => {
    setFollowing(data);
  });
  return (
    <div className="h-full mt-3">
      <div className="flex justify-around mx-4">
        <div
          onClick={() => {
            handleTabChange("followers");
          }}
        >
          Followers
        </div>
        <div
          onClick={() => {
            handleTabChange("following");
          }}
        >
          Following
        </div>
      </div>
      <div className="px-12 mt-3 flex ">
        <div
          className={`${
            currentTab == "following" ? " -translate-x-full" : "translate-x-0"
          } transition-all duration-500 ease-in-out min-w-full `}
        >
          {followers.map((follower) => (
            <div key={follower._id} className="flex gap-3 items-center">
              <div className="h-10 w-10  rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={prefix + follower.profilePicture}
                  alt=""
                />
              </div>
              <div>{follower.username}</div>
            </div>
          ))}
        </div>
        <div
          className={`${
            currentTab == "followers"
              ? " translate-x-full"
              : " -translate-x-full"
          } transition-all duration-500 ease-in-out min-w-full `}
        >
          {following.map((user) => (
            <div key={user._id} className="flex gap-3 items-center">
              <div className="h-10 w-10  rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={prefix + user.profilePicture}
                  alt=""
                />
              </div>
              <div>{user.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FollowersList.propTypes = {
  searchedProfile: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

export default FollowersList;
