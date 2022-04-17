import React from "react";
import { format } from "timeago.js";
import "../../styles/Chat/message.scss";

interface messageIprops {
  message: string;
  own: boolean;
  time: any;
}

function Message(props: messageIprops) {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
        <p className="messageText">{props.message}</p>
      </div>
      <div className="messageBottom">{format(props.time)}</div>
    </div>
  );
}

export default Message;
