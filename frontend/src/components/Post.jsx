import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegHeart, FaHeart, FaRegCommentDots } from "react-icons/fa";
import socketService from "../socket/service";
import { useDispatch } from "react-redux";
import {
  setShowComments,
  setCommentPostId,
} from "../Redux/actions/pageActions";
import Cookie from "js-cookie";

const Post = ({ post }) => {
  const currentUser = Cookie.get("user_id");
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const dispatch = useDispatch();
  const proxyBaseUrl = "http://localhost:3000/";
  const token = Cookie.get("access_token");

  socketService.emit("getLikeStatus", { token, postId: post._id });

  useEffect(() => {
    const handleLikeDetails = (data) => {
      if (data.postId === post._id) {
        setLikes(data.likes);
      }
    };

    const handleLikeStatus = (data) => {
      console.log(data);
      if (data.postId === post._id) {
        setIsLiked(data.isLiked);
      }
    };

    socketService.on("likeDetails", handleLikeDetails);
    socketService.on("likeStatus", handleLikeStatus);

    return () => {
      socketService.off("likeDetails", handleLikeDetails);
      socketService.off("likeStatus", handleLikeStatus);
    };
  }, [post._id, currentUser]);

  const handleLike = () => {
    socketService.emit("likePost", {
      token: Cookie.get("access_token"),
      postId: post._id,
    });
  };

  const handleShowComments = () => {
    dispatch(setCommentPostId(post._id));
    dispatch(setShowComments(true));
  };

  return (
    <div className="w-full h-full px-2 py-3 relative select-none bg-gray-800">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img
            src={proxyBaseUrl + post.author.profilePicture}
            alt={post.author.username}
            className="w-full h-full aspect-square"
          />
        </div>
        {post.author.username}
      </div>
      <div className="h-96  rounded-md overflow-hidden border-[0.1rem] bg-white border-black">
        <img
          className="w-full h-full object-cover"
          src={proxyBaseUrl + post.imageUrl}
          alt=""
        />
      </div>
      <div className="flex gap-8 px-2 py-2 items-center text-xl">
        <div
          onClick={handleLike}
          className="cursor-pointer flex items-center gap-3 select-none"
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          {likes}
        </div>
        <div className="text-gray-300" onClick={handleShowComments}>
          <FaRegCommentDots />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
