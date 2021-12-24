import React, { useState, useEffect } from "react";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Pagination from "../../components/Pagination/Pagination";
import Products from "../../components/Products/Products";
import { getProduct } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./AllProduct.css";
import Loading from "../../components/Loading/Loading";

export default function AllProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector((state) => state.product.product);
  const productPerPage = useSelector(
    (state) => state.pagination.productPerPage
  );
  const loading = useSelector(state => state.product.loading)

  useEffect(() => {
    const search = new URLSearchParams(location.search.split("?")[1]);
    const queryParams = {
      cat: search.get("cat"),
      price: { priceL: search.get("pricel"), priceH: search.get("priceh") },
    };
    dispatch(getProduct(queryParams));
  }, [dispatch, location]);

  const [curPage, setCurPage] = useState(1);

  const setCurrentPage = (num) => {
    setCurPage(num);
  };

  const first = (curPage - 1) * productPerPage;
  const last = productPerPage * curPage;

  if (loading)
    return <Loading />

  return (
    <>
      <div className="allproduct-container">
        <Products first={first} last={last} />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={curPage}
          total={Math.ceil(data.length / productPerPage)}
        />
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
