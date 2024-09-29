import React, { useState } from "react";
import "../SignUp/SignUp.css";
import lionImage from "../images/ar7.jpeg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {apiUrl} from '../../utils/api'

export default function SignUp() {
  const nav = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  function inpUserName(a) {
    setUserName(a.target.value);
  }
  function inpEmail(b) {
    setEmail(b.target.value);
  }
  function inpPassw(c) {
    setPassword(c.target.value);
  }
  function inpConfPassw(d) {
    setConfPassword(d.target.value);
  }

  const signUpBtn = async () => {
    try {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      // if (userName === null || userName === "") {
      //   toast.error("Name can't be blank");
      // }
      // if (email === "") {
      //   toast.error("Email can't be blank");
      // } else {
      //   if (email.match(validRegex)) {
      //   } else {
      //     toast.error("Ivalid email address");
      //   }
      // }

      // if (password === "") {
      //   toast.error("Password can't be blank");
      // }
       if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
      }
      // At least one uppercase letter
      else if (!/[A-Z]/.test(password)) {
        toast.error("At least one uppercase letter");
      }

      // At least one lowercase letter
      else if (!/[a-z]/.test(password)) {
        toast.error("At least one lowercase letter");
      }

      // At least one digit
      else if (!/\d/.test(password)) {
        toast.error("At least one digit");
      }

      // At least one special character
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        toast.error("At least special character");
      } else {
        if (confPassword === "") {
          toast.error("confirm Password can't be null");
        } else {
          if (password !== confPassword) {
            toast.error("Password must be same");
          } else {
            const response = await axios.post(
              `${apiUrl}/api/auth/signup`,
              {
                username: userName,
                email: email,
                password: password,
                confirmPassword: confPassword,
              }
            );
            console.log("response", response.data);
            if (response.status === 201) {
              toast.success("user registration success");
            }
            nav("/SignIn");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainb">
      <div className="signIn-logo">
        <Link to={"/"}>
          <img src={lionImage} height={100} width={100} alt="" />
        </Link>
      </div>

      <div className="signIn-centerb">
        <div className="form-mainb">
          <div action="#" className="form-groupb">
            <h2 className="form-headerb">USER REGISTRATION</h2>

            <div>
              <label className="signIn-nameb">User name</label>
            </div>
            <div>
              <input className="inpsS"
                type="text"
                onChange={inpUserName}
                placeholder="First and last name"
              />
            </div>
            <br />

            <div>
              <label className="signIn-emailb">Email</label>
            </div>
            <div>
              <input className="inpsS"
                type="email"
                onChange={inpEmail}
                placeholder="Enter email"
              />
            </div>
            <br />
            <div>
              <label className="signIn-passwordb">Password</label>
            </div>
            <div>
              <input className="inpsS"
                type="password"
                onChange={inpPassw}
                placeholder="Atleast 6 characters"
              />
            </div>
            <br />
            <div>
              <label className="signIn-passwordb1">Confirm password</label>
            </div>
            <div>
              <input className="inpsS"
                type="password"
                onChange={inpConfPassw}
                placeholder="Atleast 6 characters"
              />
            </div>
            <br />
            <p className="form-parab">
              By continuing, I agree to <a href=""> Terms of Use</a> &{" "}
              <a href="#">Privacy Policy</a>
            </p>
            <div>
              <button onClick={signUpBtn} style={{fontWeight:'bolder',letterSpacing:'1px'}}>REGISTER</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              {" "}
              <Link to={"/SignIn"}>
                <p style={{ color: "white", fontSize: "13px" }}>
                  Already have an account? Sign In
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
