import React, { useEffect } from "react";
import Product from "../../components/Product/Product";
import "./Wishlist.css";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { asyncFavGet } from "../../store/productSlice";
import Loading from "../../components/Loading/Loading";

export default function Wishlist() {
  const dispatch = useDispatch()
  const [curPage, setCurPage] = React.useState(1);
  const isAuth = useSelector(state => state.auth.isAuth)
  const loading = useSelector(state => state.product.loading)
  const data = useSelector(state => state.product.allFavProduct)
  
  useEffect(() => {
    if(isAuth) {
      dispatch(asyncFavGet(localStorage.getItem('token')))
    }
  }, [dispatch, isAuth])

  const setCurrentPage = (num) => {
    setCurPage(num);
  };

  const first = (curPage - 1) * 5;
  const last = 5 * curPage;

  if(loading) return <Loading />

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
