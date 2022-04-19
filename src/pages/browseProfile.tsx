import * as React from "react";
import { useParams } from "react-router-dom";
import { axiosRequest } from "../Api/api";
import PrimarySearchAppBar from "../components/Navbar";
import ProfileComponent from "../components/profileComponent";
import { ProfileProvider } from "../context/profileContext";
export interface IProfileProps {}

export default function BrowseProfile(props:IProfileProps) {
  const [loggedUser, setLoggedUser] = React.useState([]);
  const [loggedUserPost, setLoggedUserPost] = React.useState([]);
  const [showFollowButton, setShowFollowButton] = React.useState(true);
  // const {followStatus} = React.useContext(ProfileProvider)
  const { userId } = useParams();
  const getProfileData = React.useCallback(async () => {
    const userData = await axiosRequest.get(`profile/${userId}`);
    setLoggedUser(userData.data.user);
    setLoggedUserPost(userData.data.posts);
    // console.log({ loggedUser });
  }, []);

  React.useEffect(() => {
    getProfileData();
  }, []);
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <ProfileComponent
        loggedUser={loggedUser}
        loggedUserPost={loggedUserPost}
        showProfileButton={showFollowButton}
      />
    </React.Fragment>
  );
}
