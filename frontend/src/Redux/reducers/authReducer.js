import Cookie from "js-cookie";

const initialAuthState = {
  isLoggedIn: !!Cookie.get("access_token"),
  userId: null,
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
