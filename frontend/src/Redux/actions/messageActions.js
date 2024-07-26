export const setErrorMessage = (errorMessage) => ({
  type: "SET_ERROR_MESSAGE",
  payload: errorMessage,
});

export const setSuccessMessage = (successMessage) => ({
  type: "SET_SUCCESS_MESSAGE",
  payload: successMessage,
});
