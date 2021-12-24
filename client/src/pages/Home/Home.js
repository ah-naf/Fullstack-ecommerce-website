import React from "react";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider/Slider";
import "./Home.css";

export default function Home() {

  return (
    <div className="home-container">
      <div className="slider-container">
        <Slider />
      </div>
      <div className="cat-preview">
            <div className="cat-col-1">
                <Link to={'/products?cat=women'}>WOMEN</Link>
            </div>
            <div className="cat-col-2">
            <Link to={'/products?cat=men'}>MEN</Link>
            </div>
            <div className="cat-col-3">
            <Link to={'/products?cat=boys'}>BOYS</Link>
            </div>
            <div className="cat-col-4">
            <Link to={'/products?cat=girls'}>GIRLS</Link>
            </div>
        </div>
    </div>
  );
}
