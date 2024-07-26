import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import socketService from "../socket/service";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setShowComments } from "../Redux/actions/pageActions";

const Comments = () => {
  const dispatch = useDispatch();
  const prefix = "http://localhost:3000/";
  const postId = useSelector((state) => state.page.commentPostId);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    const token = Cookie.get("access_token");
    if (commentText === "" || !commentText.trim()) {
      return;
    }
    socketService.emit("addComment", { token, commentText, postId });
    setCommentText("");
  };

  const getComments = (data) => {
    setComments(data.comments);
  };

  socketService.on("commentsUpdated", getComments);

  useEffect(() => {
    socketService.emit("getComments", postId);
  }, [postId]);

  const handleCloseComments = () => {
    dispatch(setShowComments(false));
  };

  const handleInnerDivClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute flex top-20 w-full h-full items-end bg-slate-900 bg-opacity-65 overflow-hidden"
      onClick={handleCloseComments}
    >
      <div
        className="h-4/5 p-4 w-full border-[0.1vw] bg-gray-700"
        onClick={handleInnerDivClick}
      >
        <div className="flex gap-12 items-center w-full">
          <input
            type="text"
            className="text-sm rounded-md bg-transparent outline-neutral-700 placeholder:text-xs w-4/5 h-12 border-white border-2 p-2"
            placeholder="type something"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <FaLocationArrow
            className="text-gray-100 text-3xl"
            onClick={handleAddComment}
          />
        </div>
        <div className="h-full overflow-y-scroll hide-scrollbar px-3 py-2">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={prefix + comment.user.profilePicture} alt="" />
              </div>
              <div>
                <span className="text-md block">{comment.user.username}</span>
                <span className="text-sm block">{comment.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  postComments: PropTypes.array,
  postId: PropTypes.string,
};

export default Comments;
