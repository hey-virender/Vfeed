import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { MdLogout } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../Redux/actions/authActions";
import { setSuccessMessage } from "../Redux/actions/messageActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get("/api/auth/profile");
      setUser(response.data);
    };
    getProfile();
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await axios.get("/api/posts/myposts");
      setUserPosts(response.data);
    };
    getUserPosts();
  }, []);

  const handleLogout = async () => {
    const confirmation = confirm(`Are you sure you want to log out ?`);
    if (confirmation) {
      try {
        const response = await axios.post("/api/auth/logout");
        Cookie.remove("username");
        Cookie.remove("user_id");
        Cookie.remove("access_token");
        dispatch(setSuccessMessage(response.data.msg));
        dispatch(setIsLoggedIn(false));
        window.location.href = "/";
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="relative">
      {editMode && (
        <div
          className="absolute flex gap-7 text-3xl top-7 right-16 text-center z-40 select-none"
          onClick={() => setEditMode(false)}
        >
          <RxCross1 />
        </div>
      )}
      {!editMode && (
        <div className="absolute flex gap-7 text-xl top-10 right-8 text-center z-40 select-none">
          <div onClick={() => setEditMode(true)}>
            <FaEdit className="text-2xl" />
            <span className="text-[0.8rem]">Edit Profile</span>
          </div>
          <div onClick={handleLogout}>
            <MdLogout className="text-2xl" />
            <span className="text-[0.8rem]">Logout</span>
          </div>
        </div>
      )}
      <div>
        {editMode ? (
          <EditProfile
            user={user}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          <Profile user={user} searchedProfile={false} userPosts={userPosts} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
