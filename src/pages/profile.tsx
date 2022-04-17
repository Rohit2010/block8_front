import * as React from "react";
import { axiosRequest } from "../Api/api";
import PrimarySearchAppBar from "../components/Navbar";
import ProfileComponent from "../components/profileComponent";
export interface IProfileProps {}

export default function Profile(props: IProfileProps) {
  const [loggedUser, setLoggedUser] = React.useState<any>([]);
  const [loggedUserPost, setLoggedUserPost] = React.useState<any>([]);
  const [showFollowButton, setShowFollowButton] =
    React.useState<Boolean>(false);

  const getProfileData = React.useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const userData = await axiosRequest.get(`profile/${userId}`);
    setLoggedUser(userData.data.user);
    setLoggedUserPost(userData.data.posts);
    console.log({ loggedUser });
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
        showFollowButton={showFollowButton}
      />
    </React.Fragment>
  );
}
