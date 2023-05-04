import axios from "axios";
import { authActions } from "./auth-slice";
import { popUpActions } from "./pop-up-slice";

const authenticateUser = (user) => {
  return async (dispatch) => {
    let url = "";
    let requestBody = {};

    if (user.isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg3fJgK9RIb10Lx78wGKxq9AvsmkA_ys8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg3fJgK9RIb10Lx78wGKxq9AvsmkA_ys8";
    }
    requestBody = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };

    try {
      const res = await axios.post(url, requestBody);
      dispatch(
        popUpActions.popUpAlertHandler({
          message: "Authentication Successful",
          severity: "success",
        })
      );
      dispatch(
        authActions.login({
          email: res.data.email,
          idToken: res.data.idToken,
        })
      );
      // get all data here
    } catch (error) {
      dispatch(
        popUpActions.popUpAlertHandler({
          message: "Authentication Failed!",
          severity: "error",
        })
      );
    }
  };
};

export const loginOnLoad = () => {
  return (dispatch) => {
    let email = localStorage.getItem("email");
    let idToken = localStorage.getItem("idToken");

    if (email && idToken) {
      dispatch(
        authActions.login({
          email,
          idToken,
        })
      );
    }
  };
};

export default authenticateUser;
