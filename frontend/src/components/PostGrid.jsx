import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { RiArrowGoBackFill } from "react-icons/ri";

const PostGrid = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const proxyBaseUrl = "http://localhost:3000/";
  const popupRef = useRef(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    if (selectedPost) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPost]);

  return (
    <div className="relative  w-full h-3/5 mt-4">
      <div className="grid grid-cols-3 gap-x-1 gap-y-1 px-2  h-full place-content-center">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="col-span-1 h-40 cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <img
              className="h-full w-full object-cover"
              src={proxyBaseUrl + post.imageUrl}
              alt=""
            />
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="absolute top-9 left-0 w-full h-full bg-black bg-opacity-85 flex items-center justify-center">
          <div
            ref={popupRef}
            className="relative w-full bg-slate-800 p-4 rounded overflow-y-scroll hide-scrollbar"
          >
            <div className="absolute w-full top-full right-6 text-black text-xl z-50">
              <div>
                <RiArrowGoBackFill
                  className="text-2xl text-white"
                  onClick={closePopup}
                />
              </div>
            </div>
            <Post post={selectedPost} />
          </div>
        </div>
      )}
    </div>
  );
};

PostGrid.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostGrid;
