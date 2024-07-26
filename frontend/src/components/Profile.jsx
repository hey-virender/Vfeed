import React, { useState } from "react";
import FollowButton from "./FollowButton";
import PostGrid from "./PostGrid";
import { PropTypes } from "prop-types";
import { MdOutlineFlipCameraIos } from "react-icons/md";
import ChangeUserPic from "./ChangeUserPic";
import FollowersList from "./FollowersList";

const Profile = ({ user, userPosts, searchedProfile }) => {
  const prefix = "http://localhost:3000/";
  const [showPictureDialog, setShowPictureDialog] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const handleShowPictureDialog = () => {
    setShowFollowers(false);
    setShowPictureDialog(!showPictureDialog);
  };

  const handleShowFollowers = () => {
    setShowPictureDialog(false);
    setShowFollowers(!showFollowers);
  };

  return (
    <div className="w-full h-screen pt-4 select-none">
      <div className="flex px-3 py-2 items-center gap-5 text-md relative">
        <div className="relative h-20 w-20 bg-yellow-500 rounded-full outline-1 outline-white overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={prefix + user?.profilePicture}
            alt=""
          />
          {!searchedProfile && (
            <div
              onClick={handleShowPictureDialog}
              className="absolute top-0 h-20 w-20 border-4 border-blue-600 rounded-full"
            >
              <MdOutlineFlipCameraIos className="absolute bottom-1 right-1 bg-blue-600 p-[0.1rem] text-lg rounded-full " />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span>{user?.username}</span>
        </div>
        <div className="flex gap-3" onClick={handleShowFollowers}>
          <div className="flex flex-col items-center">
            <span>Followers</span>
            <span>{user?.followers?.length}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Following</span>
            <span>{user?.following?.length}</span>
          </div>
        </div>
      </div>
      {searchedProfile && <FollowButton searchedId={user?._id} />}
      {showPictureDialog && !showFollowers && (
        <ChangeUserPic
          setShowPictureDialog={setShowPictureDialog}
          currentPicture={user?.profilePicture}
        />
      )}

      <div className="w-full h-1 mt-3 bg-white"></div>
      {!showPictureDialog && !showFollowers && <PostGrid posts={userPosts} />}

      {showFollowers && !showPictureDialog && (
        <FollowersList searchedProfile={searchedProfile} userId={user?._id} />
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  userPosts: PropTypes.array.isRequired,
  searchedProfile: PropTypes.bool.isRequired,
};

export default Profile;
