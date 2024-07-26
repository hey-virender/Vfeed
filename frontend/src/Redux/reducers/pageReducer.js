const initialPageState = {
  currPage: "home",
  showComments: false,
  commentPostId: null,
};

const pageReducer = (state = initialPageState, action) => {
  switch (action.type) {
    case "SET_CURR_PAGE":
      return {
        ...state,
        currPage: action.payload,
      };

    case "SET_SHOW_COMMENTS":
      return {
        ...state,
        showComments: action.payload,
      };
    case "SET_COMMENT_POST_ID":
      return {
        ...state,
        commentPostId: action.payload,
      };

    default:
      return state;
  }
};

export default pageReducer;
