const initialErrorState = {
  errorMessage: null,
  successMessage: null,
};

const messageReducer = (state = initialErrorState, action) => {
  switch (action.type) {
    case "SET_ERROR_MESSAGE":
      return {
        successMessage: null,
        errorMessage: action.payload,
      };

    case "SET_SUCCESS_MESSAGE":
      return {
        errorMessage: null,
        successMessage: action.payload,
      };

    case "CLEAR_MESSAGE":
    default:
      return state;
  }
};

export default messageReducer;
