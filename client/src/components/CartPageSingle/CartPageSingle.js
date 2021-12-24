import React, { useEffect, useState } from "react";
import "./CartPageSingle.css";
import { Button, Text } from "@nextui-org/react";
import { Delete } from "react-iconly";
import { useDispatch } from "react-redux";
import { asyncCartEdit, asyncCartGet } from "../../store/cartSlice";

export default function CartPageSingle({ data, handleDelete }) {
  const dispatch = useDispatch()
  const image = data.images.split(" ~ ")[0];
  const [prodQuantity, setProdQuantity] = useState(data.quantity);


  const handleAdd = (type) => {
    if (!type && prodQuantity <= 1) {
      setProdQuantity(1);
      return null;
    }
    type
      ? setProdQuantity(prodQuantity + 1)
      : setProdQuantity(prodQuantity - 1);
    
  };

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(asyncCartGet(localStorage.getItem('token')))
    }

  }, [dispatch])

  useEffect(() => {
    dispatch(asyncCartEdit({id : data.cart_id, token : localStorage.getItem('token'), quantity : prodQuantity}))
  }, [prodQuantity, dispatch, data.cart_id])
  
  

  return (
    <div className="cartpage-item">
      <div className="cartpage-item-left">
        <img src={image} alt="" />
        <div className="cartpage-item-detail">
          <h2>{data.name}</h2>
          <p>
            Size: <span>{data.size}</span>
          </p>
          <p>Price: <span>{(data.price / 80).toFixed(2)}</span></p>
        </div>
      </div>
      <div className="cartpage-item-right">
        <Button light color="primary" auto>
          <Text b size={25} onClick={() => handleAdd(0)}>
            <span>-</span>
          </Text>
          <Text size={22} color="black">
            {prodQuantity}
          </Text>
          <Text b size={25} onClick={() => handleAdd(1)}>
            <span>+</span>
          </Text>
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleDelete(data.cart_id);
          }}
          auto
          color="error"
          style={{ width: "50px", padding: 0 }}
          icon={<Delete set="bold" primaryColor="white" />}
        />
      </div>
    </div>
  );
}
