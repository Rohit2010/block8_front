import * as React from "react";
import { axiosRequest } from "../Api/api";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../components/Navbar";
import { validEmail, validPassword } from "../utils/regex";
export interface ISignUpProps {}
export default function SignUp(props: ISignUpProps) {
  const [state, setState] = React.useState({
    petName: "",
    ownerName: "",
    ownerEmail: "",
    petCategory: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmit = async () => {
    console.log(state);
    const isEmailValid = validEmail.test(state.ownerEmail);
    const isPasswordValid = validPassword.test(state.password);
    if (!state) {
      toast("All fields are required");
    } else {
      if (!isEmailValid) {
        toast("Email is Invalid");
      }
      if (!isPasswordValid) {
        toast(
          "Password must contains min 8 characters , 1 Uppercase , 1 special character and 1 number"
        );
      }
      if (!state.petCategory) {
        toast("Pet category is required");
      }
      if (!state.ownerName) {
        toast("Owner Name is required");
      }
      if (!state.petName) {
        toast("Pet Name is required");
      }
      if (isEmailValid && isPasswordValid && state) {
        try {
          const res = await axiosRequest.post("/signup", state);
          toast("Account created successfully");
          navigate("/login")
        } catch (err) {
          console.log(err);
          toast("something went wrong");
        }
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
  return (
    <React.Fragment>
      <PrimarySearchAppBar />
      <div className="container" style={{ marginTop: "5%" }}>
        <ToastContainer />

        <div className="login">
          {/* <img src={logo} alt="logo" style={{ height: "60px", width: "60px" }} /> */}
          <h3 className="loginText">Sign Up</h3>
          <input
            type="text"
            name="petName"
            className="textFeild"
            placeholder="Pet Name"
            onChange={onHandleChange}
          />
          <input
            type="text"
            name="ownerName"
            className="textFeild"
            placeholder="owner Name"
            onChange={onHandleChange}
          />
          <input
            type="email"
            name="ownerEmail"
            className="textFeild"
            placeholder="Owner Email"
            onChange={onHandleChange}
          />
          <select
            placeholder="Pet Category"
            name="petCategory"
            className="selecttextFeild"
            onChange={onHandleChange}
          >
            <option disabled defaultChecked>
              Select Pet Category
            </option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Rabbit</option>
            <option>Parrot</option>
            <option>Snake</option>
            <option>I dont have any pet</option>
          </select>
          <input
            type="password"
            name="password"
            className="textFeild"
            placeholder="Password"
            onChange={onHandleChange}
          />
          <button className="loginButton" onClick={() => onSubmit()}>
            Sign Up
          </button>
          <span
            style={{ marginTop: "3px", color: "black", fontWeight: "bold" }}
          >
            Already have an account?
            <a href="/login" style={{ color: "white" }}>
              {" "}
              Login
            </a>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}
