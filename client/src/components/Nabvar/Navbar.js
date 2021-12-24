import React, { useEffect, useRef, useState } from "react";
import { BsSearch, BsHandbag } from "react-icons/bs";
import { AiOutlineUser, AiOutlineCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";
import { User, Bag, Heart, Unlock, AddUser, Logout } from "react-iconly";
import Carts from "../Carts/Carts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAllState } from "../../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch()
  const [navShow, setNavShow] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [profileShow, setProfilShow] = useState(false);
  const navbar = useRef();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector(state => state.auth.username)
  const cartData = useSelector(state => state.cart.allCartData)

  const handleLogout = () => {
    setProfilShow(false)
    localStorage.removeItem('token')
    dispatch(resetAllState())
    window.location.href = '/'
  }

  const handleClick = () => {
    setProfilShow(false)
  }

  const handleCartHide = () => {
    setCartShow(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      navbar.current.classList.toggle("sticky", window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <div className="navbar-container" ref={navbar}>
        <div className={`hamburger ${navShow && "menu-show"}`}>
          <GiHamburgerMenu onClick={() => setNavShow(!navShow)} />
        </div>
        <div className="logo-container">
          <Link to={"/"}>
            <img
              src="https://wokiee.reactdemo.hasthemes.com/assets/images/no-placeholder/logo.png"
              alt=""
            />
          </Link>
        </div>
        <ul>
          <span className="close" onClick={() => setNavShow(false)}>
            <AiOutlineCloseCircle />
          </span>
          <div className="logo">
            <img
              src="https://wokiee.reactdemo.hasthemes.com/assets/images/no-placeholder/logo.png"
              alt=""
            />
          </div>
          <li className="nav-item">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="nav-item">
            <Link to={"/products"}>SHOP</Link>
          </li>
          <li className="nav-item">
            <Link to={"/about-us"}>ABOUT US</Link>
          </li>
          <li className="nav-item">
            <Link to={"/"}>BLOG</Link>
          </li>
          {!isAuth && (
            <li className="nav-item">
              <Link to={"/register"}>REGISTER</Link>
            </li>
          )}
        </ul>
        <div className="icon-container">
          <BsSearch className="nav-icon" />
          <span className="cart-icon" onClick={() => setCartShow(true)}>
            <BsHandbag className="nav-icon" />
            <span className="cart-item">{cartData ? cartData.length : ''}</span>
          </span>

          <AiOutlineUser
            className="nav-icon"
            onClick={() => setProfilShow(!profileShow)}
          />
        </div>
        <div
          className={`profile-popup-container ${
            profileShow && "profile-popup-show"
          }`}
        >
          <Link to={"/"} onClick={handleClick}>
            <span className="icon">
              <User set="curved" primaryColor="black" />
            </span>
            {isAuth ? username : 'Account'}
          </Link>
          <Link to={"/cart"} onClick={handleClick}>
            <span className="icon">
              <Bag set="curved" primaryColor="black" />
            </span>
            Cart
          </Link>
          <Link to={"/wishlist"} onClick={handleClick}>
            <span className="icon">
              <Heart set="curved" primaryColor="black" />
            </span>
            Wishlist
          </Link>
          {!isAuth && (
            <>
              <Link to={"/login"} onClick={handleClick}>
                <span className="icon">
                  <Unlock set="curved" primaryColor="black" />
                </span>
                Login
              </Link>
              <Link to={"/register"} onClick={handleClick}>
                <span className="icon">
                  <AddUser set="curved" primaryColor="black" />
                </span>
                Register
              </Link>
            </>
          )}
          {isAuth && (
            <Link to={"/"} style={{color: '#dc3545'}} onClick={handleLogout}>
              <span className="icon" >
                <Logout set="curved" primaryColor="#dc3545" />
              </span>
              Logout
            </Link>
          )}
        </div>
      </div>
      <Carts cartShow={cartShow} handleCartHide={handleCartHide} />
    </>
  );
}
