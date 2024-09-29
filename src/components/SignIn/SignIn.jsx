import React, { useContext, useState } from "react";
import "../SignIn/SignIn.css";
import lionImage from "../images/ar7.jpeg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { myContext } from "../context/context";
import {apiUrl} from '../../utils/api'


export default function SignIn() {
  const nav = useNavigate();

  const {setCart} = useContext(myContext)

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function inpEmails(a) {
    setNewEmail(a.target.value);
  }
  function InpPasswords(b) {
    setNewPassword(b.target.value);
  }

  const userSubmit = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/signin`,
        {
          username: newEmail,
          password: newPassword,
        }
      );
      const data = response.data;
      if (response.status === 200) {
        console.log("response", response.data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId)
        toast.success("user login succesfull");
        nav("/");
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="mainbs">
      <div className="signIn-logo">
        <Link to={"/"}>
          <img src={lionImage} height={100} width={100} alt="" />
        </Link>
      </div>
      <div className="signIn-centerbs" style={{marginTop:'0px',paddingTop:'50px'}}>
        <div className="form-mainb">
          <div className="form-groupsb">
            <h2 className="form-headerb">USER LOGIN</h2>
            <div>
              <label className="signIn-emailbc">Username</label>
            </div>
            <div>
              <input className="inpsS"
                type="text"
                value={newEmail}
                onChange={inpEmails}
                placeholder="Enter username..."
              />
              <br />
              <br />
            </div>
            <div>
              <label className="signIn-passwordbc">Password</label>
            </div>
            <div>
              <input className="inpsS"
                value={newPassword}
                type="password"
                onChange={InpPasswords}
                placeholder="Enter password..."
              />
              <br />
              <br />
            </div>
            <p className="form-parab">
              By continuing, I agree to <a href=""> Terms of Use</a> &{" "}
              <a href="#">Privacy Policy</a>
            </p>
            <div>
              <button onClick={userSubmit} style={{fontWeight:'bolder',letterSpacing:'2px'}}>LOGIN</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Link to={"/SignUp"}>
                <p style={{ color: "white", fontSize: "13px" }}>
                  New User? Create an account
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
