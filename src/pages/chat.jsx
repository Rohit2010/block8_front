import * as React from "react";
import { axiosRequest } from "../Api/api";
import ChatList from "../components/chat/chatList";
import Message from "../components/chat/message";
import PrimarySearchAppBar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import "../styles/chat.scss";
import { io } from "socket.io-client";
import { Divider } from "@mui/material";
import { ChatContext } from "../context/chatContext";
import { playAudio } from "../utils/messageNotification";
import { SOCKET_URI } from "../apiUrl";
// export interface IChatProps {}

export default function Chat() {
  const [onlineUsers, setOnlineUsers] = React.useState();
  const [messages, setMessages] = React.useState();
  const [conversations, setConversations] = React.useState();
  const [newMessage, setNewMessage] = React.useState();
  // const socket = io(SOCKET_URI);
  const user = JSON.parse(localStorage.getItem("user"));
  const messageBox = React.useRef(null);
  const divRef = React.useRef(null);

  const { currentChat, setCurrentChat, arrivalMessage, setArrivalMessage } =
    React.useContext(ChatContext);

  //get all message by convoId
  React.useEffect(() => {
    const getAllMessage = async () => {
      if (currentChat) {
        const messages = await axiosRequest.get(
          `/chat/messages/${currentChat?._id}`
        );
        setMessages(messages.data);
      }
      divRef?.current?.scrollIntoView({ behavior: "smooth" });
    };
    getAllMessage();
  }, [currentChat]);

  //get all conversations
  React.useEffect(async () => {
    try {
      const convo = await axiosRequest.get(`/chat/users/${user._id}`);
      setConversations(convo.data);
    } catch (err) {
      console.log(err);
    }
  }, [currentChat]);

  // get all online users from socket.io
  // React.useEffect(() => {
  //   socket.emit("addUser", user._id, user.petName, user.ownerName);

  //   socket.on("getUsers", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [currentChat]);

  // get new message from socket.io real time
  // React.useEffect(() => {
  //   socket.on("getMessage", (data) => {
  //     playAudio();

  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  //send message
  const sendMessage = async () => {
    // send message to db

    try {
      const msg = await axiosRequest.post("/chat/message/create", {
        conversationId: currentChat?._id,
        senderId: user._id,
        text: newMessage,
      });
      setMessages([...messages, msg.data]);
      divRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
    const receiverId = currentChat?.members?.filter((id) => user?._id !== id);
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId[0],
      text: newMessage,
    });

    console.log(currentChat);

    setNewMessage("");
  };
  // React.useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members?.includes(arrivalMessage.senderId) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  //     console.log(arrivalMessage)
  // }, [arrivalMessage, currentChat]);
  // React.useEffect(() => {
  //   divRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <div className="chat">
        <div className="left_list">
          <ChatList conversations={conversations} />
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat && (
              <div className="chatBoxTop">
                {messages?.map((m) => {
                  return (
                    <Message
                      message={m.text}
                      own={m.senderId === user._id}
                      time={m.createdAt}
                      key={m._id}
                    />
                  );
                })}
              </div>
            )}
            {currentChat && (
              <div className="chatBoxBottom">
                <input
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button className="chatSubmitButton" onClick={sendMessage}>
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
