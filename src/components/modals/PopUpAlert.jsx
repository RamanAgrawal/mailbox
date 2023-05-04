import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { popUpActions } from "../store/pop-up-slice";

const PopUpAlert = () => {
  const showPopUpAlert = useSelector((state) => state.modals.showPopUpAlert);
  const popUpDetails = useSelector((state) => state.modals.popUpDetails);
  const dispatch = useDispatch();

  function onCloseHandler() {
    const obj = {
      message: "",
      severity: "success",
    };
    dispatch(popUpActions.popUpAlertHandler(obj));
  }

  return (
    <>
      <Snackbar
        open={showPopUpAlert}
        autoHideDuration={2000}
        onClose={onCloseHandler}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={onCloseHandler}
          severity={popUpDetails.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {popUpDetails.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PopUpAlert;
