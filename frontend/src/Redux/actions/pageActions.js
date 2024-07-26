export const setCurrPage = (currPage) => ({
  type: "SET_CURR_PAGE",
  payload: currPage,
});

export const setShowComments = (showComments) => ({
  type: "SET_SHOW_COMMENTS",
  payload: showComments,
});

export const setCommentPostId = (commentPostId) => ({
  type: "SET_COMMENT_POST_ID",
  payload: commentPostId,
});
