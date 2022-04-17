import React from "react";
import "../styles/profile.scss";
import { Avatar } from "@mui/material";
import { axiosRequest } from "../Api/api";
import { ChatContext } from "../context/chatContext";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  // ListSubheader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// interface IProfileProps {
//   loggedUser: Array<any>;
//   loggedUserPost: Array<any>;
// }

const ProfileComponent = (props) => {
  const [followStatus, setFollowStatus] = React.useState();
  const userId = localStorage.getItem("userId");
  const { setCurrentChat } = React.useContext(ChatContext);
  const navigate = useNavigate();
  const checkFollowStatus = () => {
    const check =
      userId && props?.loggedUser?.followers?.some((id) => id === userId);
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const followApi = async (followId) => {
    const follow = await axiosRequest.put(`/user/follow/${userId}/${followId}`);

    window.location.reload();
  };
  // React.useEffect(() => {
  //   setFollowStatus(() => {
  //     checkFollowStatus()
  //   })
  // })
  const createConversation = async () => {
    const createConvo = await axiosRequest.post("/chat/conversation/create", {
      members: [userId, props?.loggedUser?._id],
    });
    console.log(createConvo);
    setCurrentChat(createConvo.data);
    navigate("/chat")
  };
  return (
    <div className="profile">
      <div className="profile_header">
        <Avatar className="avatar_profile" aria-label="recipe">
          {/* {loggedUser?.petName.charAt(0).toUpperCase()} */}
        </Avatar>
        {props.loggedUser && (
          <h3 className="petName">
            {props.loggedUser?.petName?.toUpperCase()}
          </h3>
        )}
        <span className="ownerName">{props.loggedUser?.ownerName}</span>
        <div className="follow_container">
          <div className="follow_info">
            <span className="follow_head">Posts</span>
            <span>{props.loggedUserPost?.length}</span>
          </div>
          <div className="follow_info">
            <span className="follow_head">Followers</span>
            <span>{props.loggedUser?.followers?.length}</span>
          </div>
          <div className="follow_info">
            <span className="follow_head">Following</span>
            <span>{props.loggedUser?.following?.length}</span>
          </div>
        </div>
        {props.showProfileButton && (
          <div style={{ display: "flex" }}>
            <button
              className="followButton"
              onClick={() => followApi(props?.loggedUser?._id)}
            >
              {checkFollowStatus() ? "Unfollow" : "Follow"}
            </button>
            <button className="followButton" onClick={() => createConversation()}>Message</button>
          </div>
        )}
      </div>
      <ImageList sx={{ width: 900, height: "auto" }} cols={3} gap={8}>
        {props &&
          props?.loggedUserPost?.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item?.imageUrl}`}
                srcSet={`${item?.imageUrl}`}
                alt={item?.caption}
                loading="lazy"
              />
              <ImageListItemBar
                title={item?.caption}
                subtitle={<span>{item?.likedBy?.length} Likes</span>}
                // actionIcon={
                //   <IconButton
                //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                //     aria-label={`info about ${item.title}`}
                //   >
                //     <InfoIcon />
                //   </IconButton>
                // }
              />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
};

export default ProfileComponent;
