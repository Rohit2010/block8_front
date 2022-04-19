import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { StyledBadge } from "../Ui-kit/onlineBadge";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../../Api/api";
import { ChatContext } from "../../context/chatContext";
interface IListComponentProps {
  eachConversation: any;
  cId: string;
}

function ListComponent(props: IListComponentProps) {
  const [data, setData] = React.useState<any>();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { currentChat, setCurrentChat, onlineUsers } =
    React.useContext(ChatContext);
  const [isOnline, setIsOnline] = React.useState<boolean>();
  const recieversId = props?.eachConversation?.members?.filter(
    (id: string) => id !== userId
  );
  //its an array recieversId[0] is exact recievers id
  const getUserData = async () => {
    try {
      const userData = await axiosRequest.get(`profile/${recieversId[0]}`);
      console.log(userData);
      setData(userData.data);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getUserData();
  }, []);
  const checkSelected = () => {
    if (currentChat?._id === props.cId) {
      return true;
    } else {
      return false;
    }
  };
  const checkOnline = () => {
    const check = onlineUsers?.some(
      (user: any) => user?.userId === recieversId[0]
    );
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        onClick={() => setCurrentChat(props?.eachConversation)}
        style={{
          backgroundColor: checkSelected() ? "black" : "white",
          color: "black",
          width: "100%",
          cursor: "pointer",
        }}
        // onClick={() => {
        // setArrivalMessage([])
        // setCurrentChat(user.userId);
        // }}
        key={data?.user?._id}
      >
        <ListItemAvatar>
          {checkOnline() && (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              {" "}
              <Avatar
                alt="Remy Sharp"
                onClick={() => navigate(`/profile/${data?.user?._id}`)}
                sx={{
                  bgcolor: "#f9c904",
                  border: "1px",
                  borderColor: "black",
                  color: "black",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                aria-label="recipe"
              >
                {data?.user?.petName.toUpperCase().charAt(0)}
              </Avatar>
            </StyledBadge>
          )}
          {!checkOnline() && (
            <Avatar
              alt="Remy Sharp"
              onClick={() => navigate(`/profile/${data?.user?._id}`)}
              sx={{
                bgcolor: "#f9c904",
                border: "1px",
                borderColor: "black",
                color: "black",
                fontWeight: "700",
                cursor: "pointer",
              }}
              aria-label="recipe"
            >
              {data?.user?.petName.toUpperCase().charAt(0)}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              sx={{
                display: "inline",
                color: checkSelected() ? "white" : "black",
              }}
            >
              {/* {pet?.petName} */}
              {data?.user?.petName}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline", color: "#c5c6D0" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {/* {pet.ownerName} */}
                {data?.user?.ownerName}
              </Typography>
              {/* {" — I'll be in your neighborhood doing errands this…"} */}
              {/* {pet?.ownerEmail} */}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider
        variant="inset"
        component="li"
        style={{ background: "#f9c904" }}
      />
    </>
  );
}

export default ListComponent;
