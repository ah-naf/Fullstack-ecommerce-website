import React from "react";
import "./NewsLetter.css";
import { Button, Input } from "@nextui-org/react";

export default function NewsLetter() {
  return (
    <div className="newsletter-container">
      <div className="newsletter-input">
        <label htmlFor="">BE IN TOUCH WITH US</label>
        <div className="newsletter">
          <Input
            style={{ outline: "none", borderRadius: "10px" }}
            labelLeft="Email"
            placeholder="Enter Your Email"
          />
          <Button auto color="primary">
            Join Us
          </Button>
        </div>
      </div>
    </div>
  );
}
