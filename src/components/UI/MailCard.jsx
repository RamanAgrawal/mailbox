import { useDispatch } from "react-redux";
import { mailBoxActions } from "../store/mail-box-slice";
import { popUpActions } from "../store/pop-up-slice";
import "./MailCards.css";

const MailCard = (props) => {
  const dispatch = useDispatch();
  const mailBody =
    typeof props.mailBody === "string" ? JSON.parse(props.mailBody) : props.mailBody;
  console.log(mailBody);

  function getMailObject() {
    let mailData;

    const obj = {
      id: props.id,
      subject: props.subject,
      mailBody: mailBody,
    };

    if (props.toOrFrom === "To") {
      mailData = {
        ...obj,
        to: props.mail,
      };
    } else {
      mailData = {
        ...obj,
        from: props.mail,
      };
    }

    return mailData;
  }

  function deleteHandler() {
    if (window.confirm("Are you sure, you want to delete it")) {
      let mailData = getMailObject();
      dispatch(mailBoxActions.moveToRecyleBin(mailData));
    }
  }

  function restoreHandler() {
    let mailData = getMailObject();
    dispatch(mailBoxActions.restoreMail(mailData));
  }

  function modalHandler() {
    let mailData = getMailObject();
    dispatch(popUpActions.mailBoxModalHandler(mailData));
    dispatch(mailBoxActions.changeReadToFalse(props.id));
    dispatch(mailBoxActions.getTotalUnread());
  }

  return (
    <div>
      <button className="main-button" style={{ width: "100%" }} onClick={modalHandler}>
        <b>{props.toOrFrom} :</b> {props.mail} <br />
        <b>Subject :</b> {props.subject}
      </button>
      {props.recycle && (
        <button className="side-button" onClick={restoreHandler}>
          Restore
        </button>
      )}
      {!props.recycle && (
        <button className="side-button" onClick={deleteHandler}>
          Delete
        </button>
      )}
    </div>
  );
};

export default MailCard;
