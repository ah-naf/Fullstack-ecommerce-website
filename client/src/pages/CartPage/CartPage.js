import React from "react";
import "./CartPage.css";
import { Button } from "@nextui-org/react";
import CartPageSingle from "../../components/CartPageSingle/CartPageSingle";
import { Wallet } from "react-iconly";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncCartDelete, deleteCartItem } from "../../store/cartSlice";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

toast.configure()

export default function CartPage() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.cart.allCartData)
  let total = 0;
  let tax = 0;

  const [stripeToken, setStripeToken] = React.useState(null)


  if(data) {
    data.map((item) => {
      total += ((parseFloat(item.price) / 80).toFixed(3) * parseInt(item.quantity))
      return null
    })
    total = parseFloat(total).toFixed(2)
    tax = Math.floor((total * 10) / 100)
    total = parseFloat(total)
    total += tax;
  }

  React.useEffect(() => {
    const makeRequest = async () => {
      const res = await fetch('https://ahnaf-ecommerce-website.herokuapp.com/api/checkout/payment', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({tokenId : stripeToken.id, amount : total*100})
      })

      const data = await res.json()
      if(res.ok) {
        toast.success('Thanks For Purchasing', {
          position: 'top-center'
        })
      }
    }

    stripeToken && makeRequest()
  }, [stripeToken,total, tax])

  const onToken = e => setStripeToken(e)

  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
    dispatch(asyncCartDelete({ token: localStorage.getItem("token"), id }));
  };

  if(data) {
    if(data.length === 0) {
      return <>
      <div className="cartpage-container" style={{minHeight : '60vh'}}>
        <h3 style={{textAlign : 'center' }}>Cart is empty</h3>
      </div>
      <NewsLetter />
      <ArekFooter />
      </>
    }
  }

  return (
    <>
      <div className="cartpage-container">
        <div className="cartpage-row">
          <div className="cartpage-col-left">
            <h1>Shopping Cart</h1>
            <div className="cartpage-item-container">
              {data && data.map((item, index) => {
                return <CartPageSingle data={item} key={index} handleDelete={handleDelete} />;
              })}
            </div>
          </div>
          <div className="cartpage-col-right">
            <p>
              Subtotal <span>{total-tax}</span>
            </p>
            <p>
              Estimated Shipping <span>{tax}</span>
            </p>
            <h3>
              Total <span>{total}</span>
            </h3>
            <StripeCheckout
                alipay={true}
                bitcoin={true}
                name="Wookie."
                image="https://wokiee.reactdemo.hasthemes.com/assets/images/no-placeholder/logo.png"
                currency="USD"
                billingAddress
                shippingAddress
                amount={total * 100}
                token={onToken}
                stripeKey={
                  'pk_test_51K0KFMGIOFJuO9tJGZUsZARyKWybzpQAL6zcWrZe8awQjyWo75a82Xz7hcg49tVZlxZEMfkQAy47YprQELLDvhWh000YyIa4dO'
                }
              >
                <Button iconRight={<Wallet fill="white" />}>
                  Proceed to Checkout
                </Button>
              </StripeCheckout>
            <Link to={"/products"}>
              <Button color="primary" auto ghost style={{ marginTop: "20px" }}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
