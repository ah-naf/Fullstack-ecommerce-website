import React from "react";
import Cart from "../Cart/Cart";
import { Button } from "@nextui-org/react";
import { Show, CloseSquare } from "react-iconly";
import "./Carts.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncCartDelete, deleteCartItem } from "../../store/cartSlice";


export default function Carts({ cartShow, handleCartHide }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.allCartData);
  let total = 0;
  
  if (data) {
    data.map((item) => {
      total += (item.price / 80).toFixed(3) * item.quantity;
      return null;
    });
    total = parseFloat(total)
  }
  
  

  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
    dispatch(asyncCartDelete({ token: localStorage.getItem("token"), id }));
  };


  return (
    <div className={`carts-container ${cartShow && "show-cart"}`}>
      <h1>
        SHOPPING CART{" "}
        <span onClick={handleCartHide}>
          <CloseSquare set="light" primaryColor="black" />
        </span>
      </h1>
      <div className="carts-item-container">
        <div className="carts-item">
          {data &&
            data.map((item, index) => {
              return (
                <Cart data={item} key={index} handleDelete={handleDelete} />
              );
            })}
        </div>
        {data && data.length && (
          <>
            <p className="total-price">
              <span>TOTAL: </span> <span>${total}</span>
            </p>
            <div className="carts-button-container">
              
              <Link to={"/cart"}>
                <Button
                  icon={<Show set="bold" primaryColor="royalblue" />}
                  bordered
                  color="primary"
                  auto
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
