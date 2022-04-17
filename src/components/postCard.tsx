import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import paw from "../assets/paw.png";
import unlikePaw from "../assets/unlikePaw.png";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { axiosRequest } from "../Api/api";
import { useNavigate } from "react-router-dom";
export interface IPostCardProps {
  petName: string;
  imageUrl: string;
  ownerName: string;
  caption: string;
  likes: Array<String>;
  postId: string;
  userId: string;
}
export default function PostCard(props: IPostCardProps) {
  const { caption, imageUrl, ownerName, petName, likes, postId, userId } =
    props;
  const checkLike = () => {
    const userId = localStorage.getItem("userId");
    const check = likes.some((id) => id === userId);
    if (check) {
      return true;
    } else {
      return false;
    }
  };
  const likePost = async (postId: string) => {
    const userId = localStorage.getItem("userId");
    const like = await axiosRequest.put(`post/like/${userId}/${postId}`);
    console.log(like);
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "40%",
        height: "min-content",
        margin: 2,
        backgroundColor: "black",
        borderRadius: "20px",
        boxShadow: "10px 13px 11px -3px rgba(0, 0, 0, 0.75)",
      }}
    >
      <CardHeader
        
        avatar={
          <Avatar
          onClick={() => navigate(`/profile/${userId}`)}
            sx={{
              bgcolor: "#f9c904",
              border: "1px",
              borderColor: "black",
              color: "black",
              fontWeight: "700",
              cursor:"pointer"
            }}
            aria-label="recipe"
          >
            {petName.toUpperCase().charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "#777B7E" }} />
          </IconButton>
        }
        title={
          <Typography sx={{ color: "white" ,cursor:"pointer"}} onClick={() => navigate(`/profile/${userId}`)}>
            {petName.charAt(0).toUpperCase() + petName.slice(1)}
          </Typography>
        }
        subheader={
          <Typography
            sx={{ color: "#c5c6D0", fontSize: "12px", fontWeight: 500 }}
          >
            {ownerName.charAt(0).toUpperCase() + ownerName.slice(1)}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="auto"
        image={imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="white">
          {caption}
        </Typography>
        <Typography variant="body2" color="#c5c6D0" sx={{ marginTop: "5px" }}>
          {likes.length} Likes
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => likePost(postId)}
        >
          <PetsIcon sx={{ color: checkLike() ? "#f9c904" : "#777B7E" }} />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon sx={{ color: "#777B7E" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
