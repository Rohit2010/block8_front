import * as React from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../Api/api";
import PrimarySearchAppBar from "../components/Navbar";
import PostCard from "../components/postCard";
import { NavbarContext } from "../context/navbarContext";
import "../styles/home.scss";
// export interface IHomeProps {}

export default function Home() {
  const [feedPost, setFeedPost] = React.useState([]);
  const { searchInput } = React.useContext(NavbarContext);

  const getAllPost = async () => {
    const userId = localStorage.getItem("userId");
    const feed = await axiosRequest.get(`user/feed/${userId}`);
    console.log(feed);
    setFeedPost(feed.data);
    return feed;
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    // io("http://localhost:4000")
    getAllPost();
    console.log(searchInput);
   
  }, []);
  
  return (
    <React.Fragment>
      <PrimarySearchAppBar />

      <div className="home_container">
        {feedPost.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color:"white"
            }}
          >
            <h3>Follow new Pets profile to see some post</h3>
          </div>
        )}
        {feedPost.map((post, index) => {
          return (
            <PostCard
              key={index}
              petName={post?.petName}
              ownerName={post.ownerName}
              caption={post?.caption}
              imageUrl={post.imageUrl}
              likes={post.likedBy}
              postId={post._id}
              userId={post.userId}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}
