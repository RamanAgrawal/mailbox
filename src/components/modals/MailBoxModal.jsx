import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { popUpActions } from "../store/pop-up-slice";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EditorBox from "../UI/EditorBox";
import { EditorState, convertFromRaw } from "draft-js";

const MailBoxModal = () => {
  const modal = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const { showMailBoxModal, mailBoxModalDetails: mailData } = modal;

  function modalHandler() {
    dispatch(popUpActions.mailBoxModalHandler());
  }

  let toOrFrom = "To :";
  if (mailData.from) {
    toOrFrom = "From :";
  }

  let editorState = "";
  if (mailData.mailBody) {
    editorState = EditorState.createWithContent(convertFromRaw(mailData.mailBody));
  }

  return (
    <Dialog open={showMailBoxModal} onClose={modalHandler} maxWidth="md" fullWidth>
      <Box sx={{ p: "1.5rem 2rem 0" }}>
        <Grid container rowSpacing={2} mb="1.5rem">
          <Grid item xs={2.5}>
            <Typography variant="body1" color="error" fontWeight="bold">
              {toOrFrom}
            </Typography>
          </Grid>
          <Grid item xs={9.5}>
            <Typography>{mailData.to || mailData.from}</Typography>
          </Grid>
          <Grid item xs={2.5}>
            <Typography variant="body1" color="error" fontWeight="bold">
              Subject :
            </Typography>
          </Grid>
          <Grid item xs={9.5}>
            <Typography>{mailData.subject}</Typography>
          </Grid>
        </Grid>
        <EditorBox hideToolBar={true} state={editorState} />
        <DialogActions sx={{ mt: "-1.5rem" }}>
          <Button onClick={modalHandler} color="primary">
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MailBoxModal;
