import React from "react";
import { axiosRequest } from "../Api/api";
import PrimarySearchAppBar from "../components/Navbar";
import { NavbarContext } from "../context/navbarContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../styles/searchResult.scss";
import { useNavigate } from "react-router-dom";
// interface ISearchResultProps {}

const SearchResults = (props) => {
  const [searchData, setSearchData] = React.useState();
  const { searchInput } = React.useContext(NavbarContext);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const SearchProfile = async () => {
    if (searchInput) {
      const searchData = await axiosRequest.get(
        `/search?searchQuery=${searchInput}`
      );
      setSearchData(searchData.data);
    }
  };
  // const checkFollowStatus = (following: Array<String>) => {
  //   const userId = localStorage.getItem("userId");
  //   if (userId && following.includes(userId)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  const followApi = () => {};
  React.useEffect(() => {
    SearchProfile();
    // console.log(searchInput);
  }, [searchInput]);
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <div
        className="search_result"
        style={{
          display: "flex",
          //   alignItems: "center",
          justifyContent: "center",
          marginTop: "60px",
          backgroundColor: "#3E3D53",
          height: "100vh",
        }}
      >
        <List sx={{ width: "100%", maxWidth: 660, bgcolor: "#3E3D53" }}>
          {searchData &&
            searchData?.filter((user) => user._id !== userId).length === 0 && (
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
          {searchData &&
            searchData
              ?.filter((user) => user._id !== userId)
              .map((pet) => {
                return (
                  <>
                    <ListItem
                      alignItems="flex-start"
                      style={{
                        backgroundColor: "black",
                        width: "100%",
                        borderRadius: "8px",
                      }}
                      secondaryAction={
                        <button
                          className="followButton"
                          onClick={() => navigate(`/profile/${pet?._id}`)}
                        >
                          View Profile
                        </button>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          sx={{
                            bgcolor: "#f9c904",
                            border: "1px",
                            borderColor: "black",
                            color: "black",
                            fontWeight: "700",
                          }}
                          aria-label="recipe"
                        >
                          {pet?.petName.toUpperCase().charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: "inline", color: "white" }}
                          >
                            {pet?.petName}@{pet?.petCategory}
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
                              {pet.ownerName}
                            </Typography>
                            {/* {" — I'll be in your neighborhood doing errands this…"} */}
                            {/* {pet?.ownerEmail} */}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" color="black" />
                  </>
                );
              })}
        </List>
      </div>
    </React.Fragment>
  );
};

export default SearchResults;
