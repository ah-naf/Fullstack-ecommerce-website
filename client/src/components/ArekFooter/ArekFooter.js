import React, { useEffect, useState } from "react";
import "./ArekFooter.css";
import { Collapse, Text, Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function ArekFooter() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const footer_desktop = () => {
    return (
      <div className="arekta-footer-row">
        <div className="footer-col">
          <h6>CATEGORIES</h6>
          <Link to={"/products"}>Shirts</Link>
          <Link to={"/products"}>Dresses</Link>
          <Link to={"/products"}>Jeans</Link>
          <Link to={"/products?cat=men"}>Men</Link>
        </div>
        <div className="footer-col">
          <h6>MY ACCOUNT</h6>
          <Link to={"/my-account"}>Account</Link>
          <Link to={"/cart"}>Cart</Link>
          <Link to={"/wishlist"}>Wishlist</Link>
        </div>
        <div className="footer-col">
          <h6>ABOUT US</h6>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus,
            consequuntur magnam atque, ratione maiores sit, praesentium ipsum
            molestiae aliquid omnis aperiam eligendi vitae fugiat mollitia.
          </p>
        </div>
        <div className="footer-col">
          <h6>CONTACT</h6>
          <p>
            Address:{" "}
            <span>
              2548 Broaddus Maple Court Avenue, Madisonville KY 4783, USA
            </span>
          </p>
          <p>
            Phone: <span>+777 2345 7885; +777 2345 7886</span>
          </p>
          <p>E-mail: info@mydomain.com</p>
        </div>
      </div>
    );
  };

  const footer_mobile = () => {
    return (
      <Collapse.Group>
        <Collapse style={{ display: "block" }} title={<Text>CATEGORIES</Text>}>
          <Text>
            <div className="footer-col">
              <Link to={"/products"}>Shirts</Link>
              <Link to={"/products"}>Dresses</Link>
              <Link to={"/products"}>Jeans</Link>
              <Link to={"/products?cat=men"}>Men</Link>
            </div>
          </Text>
        </Collapse>
        <Collapse style={{ display: "block" }} title={<Text>MY ACCOUNT</Text>}>
          <Text>
            <div className="footer-col">
              <Link to={"/my-account"}>Account</Link>
              <Link to={"/cart"}>Cart</Link>
              <Link to={"/wishlist"}>Wishlist</Link>
            </div>
          </Text>
        </Collapse>
        <Collapse style={{ display: "block" }} title={<Text>ABOUT US</Text>}>
          <Text>
            <div className="footer-col">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Text>
        </Collapse>
        <Collapse style={{ display: "block" }} title={<Text>CONTACT US</Text>}>
          <Text>
            <div className="footer-col">
              <p>
                Address:{" "}
                <span>
                  2548 Broaddus Maple Court Avenue, Madisonville KY 4783, USA
                </span>
              </p>
              <p>
                Phone: <span>+777 2345 7885; +777 2345 7886</span>
              </p>
              <p>E-mail: info@mydomain.com</p>
            </div>
          </Text>
        </Collapse>
        <Collapse
          style={{ display: "block" }}
          title={<Text>BE IN TOUCH WITH US</Text>}
        >
          <Text>
            <div className="footer-col">
              <Input
                shadow={false}
                style={{ outline: "none", borderRadius: "10px" }}
                labelLeft="Email"
                placeholder="Enter Your Email"
                color="primary"
              />
              <Button auto ghost color="primary">
                Join Us
              </Button>
            </div>
          </Text>
        </Collapse>
      </Collapse.Group>
    );
  };

  return (
    <div className="arekfooter-container">
      {windowWidth > 820 ? footer_desktop() : footer_mobile()}
    </div>
  );
}
