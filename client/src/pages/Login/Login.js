import React, { useState } from "react";
import { Button, Input, Text } from "@nextui-org/react";
import "./Login.css";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../../store/authSlice";

export default function Login() {
  const dispatch = useDispatch()
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncLogin(loginDetails))
  };
  
  return (
    <>
      <div className="login-container">
        <h2 style={{ textAlign: "center" }}>ALREADY REGISTERED?</h2>
        <div className="login-form-container">
          <div className="login-col">
            <h5>NEW CUSTOMER</h5>
            <p>
              By creating an account with our store, you will be able to move
              through the checkout process faster, store multiple shipping
              addresses, view and track your orders in your account and more.
            </p>
            <Link to={"/register"}>
              <Button color="primary" auto ghost>
                CREATE AN ACCOUNT
              </Button>
            </Link>
          </div>
          <div className="login-col">
            <h5>Login</h5>
            <p>If you have an account with us, please log in.</p>
            <form className="login-form">
              <Input
                clearable
                shadow={false}
                bordered
                label={
                  <Text color={"black"} weight="500">
                    EMAIL
                  </Text>
                }
                placeholder="Enter your email"
                value={loginDetails.email}
                onChange={e => setLoginDetails({...loginDetails, email:e.target.value})}
                color="primary"
                style={{ outline: "none" }}
              />
              <Input.Password
                clearable
                shadow={false}
                bordered
                label={
                  <Text color={"black"} weight="500">
                    PASSWORD
                  </Text>
                }
                placeholder="Enter your password"
                color="primary"
                value={loginDetails.password}
                onChange={e => setLoginDetails({...loginDetails, password:e.target.value})}
                style={{ outline: "none" }}
              />
              <Button color="primary" auto ghost onClick={handleSubmit}>
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
