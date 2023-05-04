import { Stack, TextField } from "@mui/material";
import BoxUI from "../UI/BoxUI";
import EditorBox from "../UI/EditorBox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { popUpActions } from "../store/pop-up-slice";
import { EditorState } from "draft-js";
import { mailBoxActions } from "../store/mail-box-slice";

const emptyEditor = EditorState.createEmpty();

const SendMail = () => {
  const initialState = useMemo(
    () => ({
      to: "",
      subject: "",
      body: emptyEditor,
      mailBody: {},
    }),
    []
  );

  const [mail, setMail] = useState(initialState);
  const dispatch = useDispatch();

  const setToEmpty = useCallback(() => {
    setMail(initialState);
  }, [initialState]);

  const changeHandlerTextField = useCallback(
    (e) => {
      setMail({
        ...mail,
        [e.target.name]: e.target.value,
      });
    },
    [mail]
  );

  const changeHandlerEditor = useCallback(
    (textPointer, textStyleObject) => {
      setMail({
        ...mail,
        body: textPointer,
        mailBody: JSON.stringify(textStyleObject),
      });
      // console.log(textStyleObject);
    },
    [mail]
  );

  const submitHandler = useCallback(() => {
    if (mail.to && mail.subject && mail.mailBody) {
      const id = Math.random().toString().slice(2);
      const mailToSend = {
        to: mail.to,
        subject: mail.subject,
        mailBody: mail.mailBody,
        read: false,
        id: id,
      };
      dispatch(mailBoxActions.send(mailToSend));
      setMail(initialState);
      dispatch(
        popUpActions.popUpAlertHandler({
          message: "Sending Mail!",
          severity: "info",
        })
      );
    } else {
      dispatch(
        popUpActions.popUpAlertHandler({
          message: "Something went wrong!",
          severity: "error",
        })
      );
    }
  }, [mail, initialState, dispatch]);

  return (
    <>
      <BoxUI sx={{mt:'20'}}>
        <TextField
          label="To"
          name="to"
          variant="standard"
          fullWidth
          sx={{ mt: "3rem" }}
          value={mail.to}
          onChange={changeHandlerTextField}
        />
        <TextField
          label="Subject"
          name="subject"
          variant="standard"
          fullWidth
          // sx={{ marginBlock: "1rem" }}
          value={mail.subject}
          onChange={changeHandlerTextField}
        />

        <div style={{ position: "relative" }}>
          <EditorBox state={mail.body} onChangeHandler={changeHandlerEditor} />
        </div>
      </BoxUI>
      <BoxUI>
        <Stack direction="row" display="flex" spacing={1} justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            size="small"
            endIcon={<DeleteIcon />}
            onClick={setToEmpty}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            endIcon={<SendIcon />}
            onClick={submitHandler}
          >
            Send
          </Button>
        </Stack>
      </BoxUI>
    </>
  );
};

export default SendMail;
