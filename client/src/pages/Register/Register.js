import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import "./Register.css";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncRegistration } from "../../store/authSlice";

toast.configure();

export default function Register() {
  const dispatch = useDispatch();
  const [regDetails, setRegDetails] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleRegistration = async () => {
    dispatch(asyncRegistration(regDetails))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      regDetails.first_name === "" ||
      regDetails.last_name === "" ||
      regDetails.username === "" ||
      regDetails.email === "" ||
      regDetails.password === "" ||
      regDetails.phone === ""
    ) {
      toast.error("Some informations are missing", {
        position: "top-center",
      });
      return null;
    }
    handleRegistration();
  };

  return (
    <>
      <div className="login-container">
        <h2 style={{ textAlign: "center" }}>CREATE AN ACCOUNT</h2>
        <div className="register-form-container">
          <h6>PERSONAL INFORMATION</h6>
          <form className="register-form">
            <label htmlFor="">FIRST NAME</label>
            <input
              required
              type="text"
              placeholder="Enter First Name"
              value={regDetails.first_name}
              onChange={(e) =>
                setRegDetails({ ...regDetails, first_name: e.target.value })
              }
            />
            <label htmlFor="">LAST NAME</label>
            <input
              required
              type="text"
              placeholder="Enter Last Name"
              value={regDetails.last_name}
              onChange={(e) =>
                setRegDetails({ ...regDetails, last_name: e.target.value })
              }
            />
            <label htmlFor="">PHONE NUMBER</label>
            <input
              required
              type="tel"
              placeholder="Enter Phone Number"
              value={regDetails.phone}
              onChange={(e) =>
                setRegDetails({ ...regDetails, phone: e.target.value })
              }
            />
            <label htmlFor="">USERNAME</label>
            <input
              required
              type="text"
              placeholder="Enter Username"
              value={regDetails.username}
              onChange={(e) =>
                setRegDetails({ ...regDetails, username: e.target.value })
              }
            />
            <label htmlFor="">E-MAIL</label>
            <input
              required
              type="email"
              placeholder="Enter E-mail"
              value={regDetails.email}
              onChange={(e) =>
                setRegDetails({ ...regDetails, email: e.target.value })
              }
            />
            <label htmlFor="">PASSWORD</label>
            <input
              required
              type="password"
              placeholder="Enter Password"
              value={regDetails.password}
              onChange={(e) =>
                setRegDetails({ ...regDetails, password: e.target.value })
              }
            />
            <Button
              style={{ marginTop: "20px" }}
              color="primary"
              auto
              onClick={handleSubmit}
              ghost
            >
              Register
            </Button>
            <Link to={"/login"}>Or already have an account</Link>
          </form>
        </div>
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
