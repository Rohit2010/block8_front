import * as React from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../Api/api";
import logoWithName from "../assets/logowithText.png";
import "../styles/login.scss";
// import "../styles/newPost.scss";
import { ToastContainer, toast } from "react-toastify";
import PrimarySearchAppBar from "../components/Navbar";
import { CLOUD_SECRET_KEY, CLOUD_URI } from "../apiUrl";
import { Input } from "@mui/material";
export interface INewPostProps {}

export default function NewPost(props: INewPostProps) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    file: "",
    caption: "",
    petName: "",
    ownerName: "",
  });
  const [imageUrl, setImageUrl] = React.useState("");
  //upload funtion
  const uploadImage = async (file: any) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "BlogProject");
      data.append("cloud_name", CLOUD_SECRET_KEY);
      const image = await fetch(CLOUD_URI, {
        method: "post",
        body: data,
      });
      const result = await image.json();
      setImageUrl(result.url);
    } else {
      toast("Select Image first");
    }
  };
  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const petName = localStorage.getItem("petName");
    const ownerName = localStorage.getItem("ownerName");
    await uploadImage(state.file);
    console.log(state);
    if (!state.caption) {
      toast("Caption is required");
    }
    if (imageUrl) {
      try {
        await axiosRequest.post(
          "/post/create",
          {
            imageUrl: imageUrl,
            caption: state.caption,
            userId,
            petName,
            ownerName,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onHandleChange = (evt: any) => {
    const value = evt.target.value;

    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const onFileChange = (e: any) => {
    const image = e.target.files[0];
    setState({ ...state, file: image });
  };
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <ToastContainer />
      <div className="container">
        <div className="login">
          <h3
            className="loginText"
            style={{
              marginBottom: "20px",
              color: "black",
              fontFamily: "sans-serif",
            }}
          >
            Create New Post
          </h3>
          {/* <Input type="file"/> */}
          <input
            type="file"
            className="textFeild"
            style={{ borderWidth: "1px" }}
            onChange={onFileChange}
          />
          {/* <label style={{color:"black"}}>Select picture</label> */}
          <input
            type="text"
            className="textFeild"
            name="caption"
            placeholder="caption"
            onChange={onHandleChange}
          />

          <button className="loginButton" onClick={() => onSubmit()}>
            Share Post
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
