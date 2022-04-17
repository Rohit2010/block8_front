import React from "react";
import List from "@mui/material/List";

import "../../styles/Chat/chatList.scss";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/chatContext";
import { axiosRequest } from "../../Api/api";
import { StyledBadge } from "../Ui-kit/onlineBadge";
import ListComponent from "./listComponent";
interface IChatListProps {
  conversations: Array<Object>;
}

const ChatList = (props: IChatListProps) => {
  const [searchData, setSearchData] = React.useState([]);
  const { arrivalMessage, setArrivalMessage, currentChat, setCurrentChat } =
    React.useContext(ChatContext);

  const navigate = useNavigate();
  const { conversations } = props;
  const userId = localStorage.getItem("userId");
  return (
    <div className="chat_list">
      {/* <div>
        <input
          placeholder="Search friends"
          className="textFeild"
          onChange={(e: any) => setSearchFrndInput(e.target.value)}
        />
      </div> */}
      <div>
        <List sx={{ width: "100%", bgcolor: "#3E3D53" }}>
          {conversations && conversations?.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              <h3>No results</h3>
            </div>
          )}
          {conversations &&
            conversations
              // ?.filter((pet: any) => pet.userId !== userId)
              ?.map((eachConversations: any) => {
                return (
                  <ListComponent
                    eachConversation={eachConversations}
                    cId={eachConversations._id}
                    key={eachConversations._id}
                  />
                );
              })}
        </List>
      </div>
    </div>
  );
};

export default ChatList;
