import { useDispatch, useSelector } from "react-redux";

import BoxUI from "../UI/BoxUI";
import Heading from "../UI/Heading";
import NoItem from "../UI/NoItem";
import MailCard from "../UI/MailCard";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { mailBoxActions } from "../store/mail-box-slice";

const RecycleBin = () => {
  const recycleBin = useSelector((state) => state.mailBox.recycle);
  const dispatch = useDispatch();

  const recycleBinArr = [];
  for (const key in recycleBin) {
    recycleBinArr.push(recycleBin[key]);
  }

  function emptyAllHandler() {
    if (window.confirm("Are you sure, you want to delete it?")) {
      dispatch(mailBoxActions.deleteForever());
    }
  }

  return (
    <BoxUI>
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Heading label="Recycle Bin" />
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ height: "2rem", mt: "0.2rem", maxWidth: "7rem" }}
          onClick={emptyAllHandler}
        >
          Empty Bin
        </Button>
      </Stack>
      {recycleBinArr.length === 0 && <NoItem label="Recycle Bin" />}
      {recycleBinArr.length !== 0 &&
        recycleBinArr.map((recycle) => {
          return (
            <MailCard
              key={recycle.id}
              id={recycle.id}
              toOrFrom={recycle.to ? "To" : "From"}
              mail={recycle.to || recycle.from}
              subject={recycle.subject}
              mailBody={recycle.mailBody}
              recycle={true}
            />
          );
        })}
    </BoxUI>
  );
};

export default RecycleBin;
