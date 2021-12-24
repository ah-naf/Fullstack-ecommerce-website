import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ProductSlider.css";

export default function ProductSlider({ images }) {
  return (
    <div className="product-slider-container">
      <Carousel style={{ height: "100%" }} fade variant="dark">
        {images.map((item, index) => {
          return (
            <Carousel.Item style={{ height: "100%" }} key={index}>
              <img
                className="d-block w-100 h-100"
                src={item}
                alt="First slide"
                style={{ height: "100%" }}
              />
            </Carousel.Item>
          );
        })}
        
      </Carousel>
    </div>
  );
}
