import { useSelector } from "react-redux";

import BoxUI from "../UI/BoxUI";
import Heading from "../UI/Heading";
import NoItem from "../UI/NoItem";
import MailCard from "../UI/MailCard";

const SentMails = () => {
  const sentMails = useSelector((state) => state.mailBox.sent);
  const sentMailsArr = [];
  for (const key in sentMails) {
    sentMailsArr.push(sentMails[key]);
  }

  return (
    <BoxUI>
      <Heading label="Sent Mails" />
      {sentMailsArr.length === 0 && <NoItem label="Sent Box" />}
      {sentMailsArr.length !== 0 &&
        sentMailsArr.map((sentMail) => {
          return (
            <MailCard
              key={sentMail.id}
              id={sentMail.id}
              toOrFrom="To"
              mail={sentMail.to}
              subject={sentMail.subject}
              mailBody={sentMail.mailBody}
            />
          );
        })}
    </BoxUI>
  );
};

export default SentMails;
