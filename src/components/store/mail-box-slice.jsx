import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: {},
  sent: {},
  recycle: {},
  allMailData: {},
  totalUnread: 0,
};

const mailBoxSlice = createSlice({
  name: "mailBoxSlice",
  initialState,
  reducers: {
    send(state, actions) {
      const data = actions.payload;
      let email = data.to;
      let emailKey = email.replace("@", "").replace(".", "");
      if (state.allMailData[emailKey]) {
        if (state.allMailData[emailKey].inbox) {
          state.allMailData[emailKey].inbox[data.id] = {
            from: localStorage.getItem("email"),
            subject: data.subject,
            mailBody: data.mailBody,
            id: data.id,
            read: data.read,
          };
        } else {
          state.allMailData[emailKey].inbox = {
            [data.id]: {
              from: localStorage.getItem("email"),
              subject: data.subject,
              mailBody: data.mailBody,
              id: data.id,
              read: data.read,
            },
          };
        }
        state.allMailData[emailKey].totalUnread++;
      }

      state.sent[data.id] = data;
      localStorage.setItem("gotData", 0);
    },
    moveToRecyleBin(state, actions) {
      if (actions.payload.to) {
        //means received from Sent-Mails
        delete state.sent[actions.payload.id];
      } else {
        //means received from Inbox
        delete state.inbox[actions.payload.id];
      }
      state.recycle[actions.payload.id] = actions.payload;
      localStorage.setItem("gotData", 0);
    },
    restoreMail(state, actions) {
      console.log(actions.payload.id);
      if (actions.payload.to) {
        state.sent[actions.payload.id] = actions.payload;
      } else {
        state.inbox[actions.payload.id] = actions.payload;
      }
      delete state.recycle[actions.payload.id];
      localStorage.setItem("gotData", 0);
    },
    deleteForever(state) {
      state.recycle = {};
      localStorage.setItem("gotData", 0);
    },
    replaceMailBox(state, actions) {
      state.allMailData = actions.payload.allMailData;
      if (actions.payload.current) {
        state.sent = actions.payload.current.sent || {};
        state.inbox = actions.payload.current.inbox || {};
        state.recycle = actions.payload.current.recycle || {};
        state.totalUnread = actions.payload.current.totalUnread || 0;
      }
      // console.log(actions.payload.current);
      localStorage.setItem("gotData", 1);
    },
    getTotalUnread(state) {
      let ctr = 0;
      for (const key in state.inbox) {
        if (!state.inbox[key].read) {
          ctr++;
        }
      }
      state.totalUnread = ctr;
    },
    changeReadToFalse(state, actions) {
      if (state.inbox[actions.payload]) {
        state.inbox[actions.payload].read = true;
      }
      localStorage.setItem("gotData", 0);
    },
  },
});

export default mailBoxSlice.reducer;
export const mailBoxActions = mailBoxSlice.actions;

// Blank Object for testing
// {
//     345345: {
//       from: "hello@gmail.com",
//       id: 345345,
//       subject: "Test 01 from inbox",
//       mailBody: {
//         blocks: [
//           {
//             key: "",
//             text: "Test mail 01",
//             type: "unstyled",
//             depth: 0,
//             inlineStyleRanges: [],
//             entityRanges: [],
//             data: {},
//           },
//         ],
//         entityMap: {},
//       },
//       read: false,
//     },
//     43645645: {
//       from: "inbox@gmail.com",
//       id: 43645645,
//       subject: "Test 02 from inbox",
//       mailBody: {
//         blocks: [
//           {
//             key: "",
//             text: "Test mail 02👌",
//             type: "unstyled",
//             depth: 0,
//             inlineStyleRanges: [],
//             entityRanges: [],
//             data: {},
//           },
//         ],
//         entityMap: {},
//       },
//       read: false,
//     },
//   }
