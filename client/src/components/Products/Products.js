import React from "react";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import Product from "../Product/Product";
import "./Products.css";

export default function Products({ first,last }) {
  const data = useSelector(state => state.product.product)
  return (
    <div className="products-container">
      <h4 className="text-center">Products</h4>
      <Filter />
      <div className="products-wrapper">
        {data.map((item, index) => {
          if(index >= first && index < last) {
            return <Product key={index} data={item} />;
          }
          return null
        })}
      </div>
    </div>
  );
}
