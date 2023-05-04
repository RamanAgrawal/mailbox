import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPopUpAlert: false,
  popUpDetails: {
    message: "",
    severity: "info",
  },
  showMailBoxModal: false,
  mailBoxModalDetails: "",
};

const popUpSlice = createSlice({
  name: "popUpSlice",
  initialState,
  reducers: {
    popUpAlertHandler(state, actions) {
      state.showPopUpAlert = !state.showPopUpAlert;
      state.popUpDetails = {
        message: actions.payload.message,
        severity: actions.payload.severity,
      };
    },
    mailBoxModalHandler(state, actions) {
      state.showMailBoxModal = !state.showMailBoxModal;
      if (state.mailBoxModalDetails) {
        state.mailBoxModalDetails = "";
      } else {
        state.mailBoxModalDetails = actions.payload;
      }
    },
  },
});

export default popUpSlice.reducer;
export const popUpActions = popUpSlice.actions;
