import { useSelector } from "react-redux";

import BoxUI from "../UI/BoxUI";
import Heading from "../UI/Heading";
import NoItem from "../UI/NoItem";
import MailCard from "../UI/MailCard";
import { Badge, Box } from "@mui/material";

const Inbox = () => {
  const inbox = useSelector((state) => state.mailBox.inbox);
  const inboxArr = [];
  for (const key in inbox) {
    inboxArr.push(inbox[key]);
  }

  return (
    <BoxUI>
      <Heading label="Inbox" />
      {inboxArr.length === 0 && <NoItem label="Inbox" />}
      {inboxArr.length !== 0 &&
        inboxArr.map((inbox) => {
          return (
            <div key={inbox.id}>
              {!inbox.read && (
                <Box
                  sx={{ position: "relative", top: "1rem", left: "0.5rem", zIndex: "10" }}
                >
                  <Badge badgeContent={""} color="primary" />
                </Box>
              )}
              <MailCard
                id={inbox.id}
                toOrFrom="From"
                mail={inbox.from}
                subject={inbox.subject}
                mailBody={inbox.mailBody}
              />
            </div>
          );
        })}
    </BoxUI>
  );
};

export default Inbox;
