import * as React from "react";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../Api/api";
import logoWithName from "../assets/logowithText.png";
import "../styles/login.scss";
import { ToastContainer, toast } from "react-toastify";
import PrimarySearchAppBar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthContext);
  const [state, setState] = React.useState({
    ownerEmail: "",
    password: "Rohit2010@",
  });
  const onSubmit = async () => {
    await axiosRequest
      .post("/login", state)
      .then(async (res) => {
        // toast();
        setUser(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("petName", res.data.user.petName);
        localStorage.setItem("ownerName", res.data.user.ownerName);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => toast(err));
  };
  const onHandleChange = (evt: any) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <div className="container">
        <div className="login">
          <ToastContainer />
          <img src={logoWithName} alt="logo" />
          <h3 className="loginText">Login</h3>
          <input
            type="email"
            className="textFeild"
            name="ownerEmail"
            placeholder="Email"
            onChange={onHandleChange}
            value={state.ownerEmail}
          />
          <input
            type="password"
            className="textFeild"
            name="password"
            placeholder="Password"
            onChange={onHandleChange}
            value={state.password}
          />
          <button className="loginButton" onClick={() => onSubmit()}>
            Login
          </button>
          <span style={{ marginTop: "5px", color: "black" , fontWeight:"bold"}}>
            Don't have an Account ?{" "}
            <a href="/signup" style={{ color: "white" }}>
              SignUp
            </a>
          </span>
          {/* <button className="emergencyButton">Emergency</button> */}
        </div>
      </div>
    </React.Fragment>
  );
}
