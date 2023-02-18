import { createContext, useReducer } from "react";
import AuthReducer from './AuthReducer';
const INITIAL_STATE = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  // user: {
  //   _id: "6114cdfa354198409cb6a7b3",
  //   username: "ab",
  //   profilePicture: "",
  //   coverPicture: "",
  //   email: "",
  //   followings: ""
  // },
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
