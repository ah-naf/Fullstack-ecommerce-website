import React from "react";
import data from "../../junk.json";
import Product from "../../components/Product/Product";
import "./Wishlist.css";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import Pagination from "../../components/Pagination/Pagination";

export default function Wishlist() {
  const [curPage, setCurPage] = React.useState(1);

  const setCurrentPage = (num) => {
    setCurPage(num);
  };

  const first = (curPage - 1) * 5;
  const last = 5 * curPage;
  return (
    <>
      <div className="wishlist-container">
        <h3 style={{ textAlign: "center" }}>Wishlist</h3>
        <div className="products-wrapper">
          {data.map((item, index) => {
            if(index >= first && index < last) return <Product data={item} key={index} />;
            return null;
          })}
        </div>
        <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={curPage}
            total={Math.ceil(data.length / 5)}
          />
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
