import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../Redux/actions/messageActions";
const ErrorBox = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.message.errorMessage);
  const successMessage = useSelector((state) => state.message.successMessage);
  useEffect(() => {
    if (errorMessage || successMessage) {
      setTimeout(() => {
        dispatch(setErrorMessage(null));
        dispatch(setSuccessMessage(null));
      }, 3000);
    }
  }, [errorMessage, successMessage, dispatch]);
  return (
    (errorMessage || successMessage) && (
      <div
        className={`absolute z-50 top-3 -translate-x-1/2 rounded-xl text-white left-1/2 w-40 h-8  text-center text-sm py-1 transition-all ease-in-out duration-300 ${
          errorMessage && "bg-red-600"
        }
        ${successMessage && "bg-emerald-700"} ${
          errorMessage || successMessage ? "translate-y-0" : "-translate-y-12"
        }`}
      >
        {errorMessage || successMessage}
      </div>
    )
  );
};

export default ErrorBox;
