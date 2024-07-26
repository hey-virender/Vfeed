import React from "react";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import socketService from "../socket/service";
import axios from "axios";
import Profile from "./Profile";
import { RxCross1 } from "react-icons/rx";

const SearchUser = () => {
  const prefix = "http://localhost:3000/";
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (searchText) => {
    socketService.emit("searchUser", searchText);
  };

  const handleProfileClick = async (username) => {
    const response = await axios.post("/api/search/searchedProfile", {
      username: username,
    });
    setSearchResult(response.data);
    setShowProfile(true);
  };

  socketService.on("searchResults", (results) => {
    setSearchResult(results);
  });
  console.log(searchResult);
  return (
    <div className="h-screen p-3  bg-slate-800 ">
      <div className="flex gap-3 items-center text-white relative px-10">
        <input
          className="w-4/5 bg-transparent  border-[0.1rem] border-white px-2 rounded-xl"
          type="text"
          value={searchText}
          placeholder="Enter username to search"
          onChange={(e) => {
            setSearchResult([]);
            setShowProfile(false);
            setSearchText(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleSearch(searchText);
            setSearchText("");
          }}
        >
          <FaMagnifyingGlass />
        </button>
        <RxCross1
          className={`absolute right-1 ${
            showProfile ? "translate-x-0" : "translate-x-24 none"
          }`}
          onClick={() => {
            setShowProfile(false);
            setSearchText("");
            setSearchResult([]);
          }}
        />
      </div>
      <div className="cursor-pointer px-4 pt-5 text-md">
        {!showProfile
          ? searchResult?.map((user) => (
              <div
                key={user._id}
                className="flex gap-3 items-center my-2"
                onClick={() => {
                  handleProfileClick(user.username);
                }}
              >
                <div className="h-8 w-8  rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={prefix + user.profilePicture}
                    alt=""
                  />
                </div>
                <div>{user.username}</div>
              </div>
            ))
          : null}
      </div>
      {showProfile && (
        <Profile
          user={searchResult.user}
          searchedProfile={true}
          userPosts={searchResult.posts}
        />
      )}
    </div>
  );
};

export default SearchUser;
