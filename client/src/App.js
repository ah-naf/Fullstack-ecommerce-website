import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Nabvar/Navbar";
import About from "./pages/About/About";
import AllProduct from "./pages/AllProduct/AllProduct";
import CartPage from "./pages/CartPage/CartPage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import Wishlist from "./pages/Wishlist/Wishlist";
import { resetAllState, setAuth } from "./store/authSlice";
import { asyncCartGet, resetCart } from "./store/cartSlice";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const loginVerify = async () => {
      const res = await fetch('/api/auth/loginVerify', {
        headers: {
          'token' : token
        }
      })
      if(!res.ok) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        // console.log('ih')
        dispatch(resetAllState())
        
      } else {
        dispatch(asyncCartGet(localStorage.getItem('token')))
        
      }
    }

    if (token) {
      dispatch(setAuth({ token: localStorage.getItem("token"), username: localStorage.getItem('username') }));
      loginVerify()
    } 
  }, [dispatch, token]);
 

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={isAuth ? <Navigate to={'/'} /> : <Register />} />
        <Route path="/login" element={isAuth ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
