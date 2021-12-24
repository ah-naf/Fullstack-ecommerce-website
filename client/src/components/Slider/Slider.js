import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "./Slider.css";

export default function Slider() {
  return (
    <div className="slider">
      <Carousel style={{ height: "100%" }}>
        <Carousel.Item style={{ height: "100%" }}>
          <img
            className="d-block w-100 h-100"
            src="https://wokiee.reactdemo.hasthemes.com/assets/images/slides/10/slide-01.jpg"
            alt="First slide"
            style={{ height: "100%" }}
          />
          <Carousel.Caption>
            <h1>
              <span>Ready to</span> <br /> Use Unique Demos
            </h1>
            <p>Optimized for speed, website that sells</p>
            <Link to="/products"><button className="btn btn-primary shop-now-btn" style={{marginTop: '20px'}}>Shop Now</button></Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "100%" }}>
          <img
            className="d-block w-100"
            src="https://wokiee.reactdemo.hasthemes.com/assets/images/slides/10/slide-02.jpg"
            alt="Second slide"
            style={{ height: "100%" }}
          />

          <Carousel.Caption>
            <h1>
              <span>Ready to</span> <br /> Use Unique Demos
            </h1>
            <p>Optimized for speed, website that sells</p>
            <Link to="/products"><button className="btn btn-primary shop-now-btn" style={{marginTop: '20px'}}>Shop Now</button></Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "100%" }}>
          <img
            className="d-block w-100"
            src="https://wokiee.reactdemo.hasthemes.com/assets/images/slides/10/slide-03.jpg"
            alt="Third slide"
            style={{ height: "100%" }}
          />

          <Carousel.Caption>
            <h1>
              <span>Ready to</span> <br /> Use Unique Demos
            </h1>
            <p>Optimized for speed, website that sells</p>
            <Link to="/products"><button className="btn btn-primary shop-now-btn" style={{marginTop: '20px'}}>Shop Now</button></Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
