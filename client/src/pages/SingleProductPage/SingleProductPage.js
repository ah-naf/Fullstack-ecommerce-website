import React, { useEffect, useState } from "react";
import { Heart, Star } from "react-iconly";
import "./SingleProductPage.css";
import Reviews from "../../components/Reviews/Reviews";
import Product from "../../components/Product/Product";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { asyncSingleProduct, getProduct } from "../../store/productSlice";
import Loading from "../../components/Loading/Loading";
import { asyncFav } from "../../store/productSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { asyncCartAdd, asyncCartGet } from "../../store/cartSlice";
import { asynctGetReview } from "../../store/reviewSlice";

toast.configure();

export default function SingleProductPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) => state.product.product);
  const singleProduct = useSelector((state) => state.product.singleProduct);
  const loading = useSelector((state) => state.product.loading);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const images = useSelector((state) => state.product.singleProduct.images);
  const cat = useSelector((state) => state.product.singleProduct.gender);
  let desc = singleProduct.description;
  const [imageArr, setImageArr] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [prodQuantity, setProdQuantity] = useState(1);
  const [curSize, setCurSize] = useState("M");

  useEffect(() => {
    const search = location.pathname.split("/")[2];
    dispatch(asyncSingleProduct(search));
    if (cat) {
      dispatch(getProduct({ cat }));
      setImageArr(images.split(" ~ "));
    }

    const isFavHandler = async () => {
      const res = await fetch(
        `/api/products/fav/${search}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      setIsFav(json.fav);
      console.log(json);
    };
    isFavHandler();
  }, [cat, dispatch, location, images]);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(asyncCartGet(localStorage.getItem('token')))
    }

  }, [dispatch])

  const handleProductFav = async (chk) => {
    if (!isAuth) {
      toast.warn("You have to log in", {
        position: "top-center",
      });
      return null;
    }
    if (!chk) {
      toast.success("Added to favourite", {
        position: "top-center",
      });
    } else {
      toast.warn("Removed From favourite", {
        position: "top-center",
      });
    }
    setIsFav(!isFav);
    dispatch(
      asyncFav({
        id: location.pathname.split("/")[2],
        token: localStorage.getItem("token"),
      })
    );
  };

  const handleAdd = (type) => {
    if (!type && prodQuantity <= 1) {
      setProdQuantity(1);
      return null;
    }
    type
      ? setProdQuantity(prodQuantity + 1)
      : setProdQuantity(prodQuantity - 1);
  };

  const handleCartAdd = () => {
    dispatch(
      asyncCartAdd({
        id: location.pathname.split("/")[2],
        quantity: prodQuantity,
        size: curSize,
        total: prodQuantity * singleProduct.price,
        token: localStorage.getItem('token')
      })
    );

  };

  if (loading || !singleProduct) return <Loading />;

  return (
    <>
      <div className="single-product-page-container">
        <div className="single-product-page-row">
          <div className="single-product-page-col-left">
            {/* PRODUCT DETAIL */}
            <div className="product-detail-container">
              <div className="detail-img-container">
                <ProductSlider images={imageArr} />
              </div>

              <div className="detail-content-container">
                
                <h1>
                  {singleProduct.name}{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleProductFav(isFav === true);
                    }}
                  >
                    <Heart
                      set={`${isFav ? "bold" : "light"}`}
                      primaryColor="black"
                    />
                  </span>{" "}
                </h1>
                <p className="detail-price">
                  ${(singleProduct.price / 80).toPrecision(3)}
                </p>
                <p className="detail-desc">{desc}</p>
                {/* PRODUCT SIZE */}
                {singleProduct.gender !== "Unisex" && (
                  <div className="product-size-container">
                    <div className="size-button-container">
                      <button
                        className={`size-button-${curSize === "M" && "active"}`}
                        onClick={() => setCurSize("M")}
                      >
                        M
                      </button>
                      <button
                        className={`size-button-${curSize === "L" && "active"}`}
                        onClick={() => setCurSize("L")}
                      >
                        L
                      </button>
                      <button
                        className={`size-button-${curSize === "X" && "active"}`}
                        onClick={() => setCurSize("X")}
                      >
                        X
                      </button>
                      <button
                        className={`size-button-${curSize === "S" && "active"}`}
                        onClick={() => setCurSize("S")}
                      >
                        S
                      </button>
                    </div>
                  </div>
                )}
                {/* ADD TO CART BUTTON */}
                <div className="cart-button-container">
                  <button onClick={handleCartAdd}>Add to cart</button>
                  <button>
                    <span onClick={() => handleAdd(0)}>-</span> {prodQuantity}
                    <span onClick={() => handleAdd(1)}>+</span>
                  </button>
                </div>
                {/* DESCRIPTION AND REVIEWS */}
                <Reviews />
              </div>
            </div>
          </div>
        </div>
        <div className="you-may-also-like-container">
          <h3>Product You May Like</h3>
          <div className="products-wrapper">
            {product.map((item, index) => {
              if (index > 7) return null;
              return <Product key={index} data={item} />;
            })}
          </div>
        </div>
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
