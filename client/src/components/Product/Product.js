import React, { useEffect, useState } from "react";
import { Bag, Heart } from "react-iconly";
import Atropos from "atropos/react/atropos-react.esm";
import "atropos/atropos.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Text, Row } from "@nextui-org/react";
import "./Product.css";
import { Link } from "react-router-dom";
import { asyncFav } from "../../store/productSlice.js";
import { resetAllState } from "../../store/authSlice";
import { asyncCartAdd, asyncCartGet } from "../../store/cartSlice";

toast.configure();

export default function Product({ data }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const isAuth = useSelector(state => state.auth.isAuth)

  useEffect(() => {
    const isFavHandler = async () => {
      const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/products/fav/${data.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      if(res.status === 403) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(resetAllState())
      }
      const json = await res.json()
      setIsFav(json.fav)
    }
    isFavHandler()
  }, [data.id, dispatch])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(asyncCartGet(localStorage.getItem('token')))
    }

  }, [dispatch])

  useEffect(() => {
    setImage(data.images.split(" ~ "));
  }, [data]);

  const handleAdd = () => {
    dispatch(
      asyncCartAdd({
        id: data.id,
        quantity: 1,
        size: 'M',
        total: 1 * data.price,
        token: localStorage.getItem('token')
      })
    );
  };

  const handleFav = (chk) => {
    if(!isAuth) {
      toast.warn("You have to log in", {
        position: "top-center",
      });
      return null
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
    setIsFav(!isFav)
    dispatch(asyncFav({ id: data.id, token: localStorage.getItem("token") }));
  };
  return (
    <Link to={`/product/${data.id}`} className="lol">
      <Atropos
        className="atropos-banner"
        shadow={true}
        rotateXMax={15}
        rotateYMax={15}
        shadowScale={1}
      >
        <Card hoverable clickable width="100%">
          <Card.Body noPadding>
            <Card.Image
              objectFit="cover"
              autoResize={true}
              src={image[0]}
              width="100%"
              height={380}
              alt={data.name}
            />
          </Card.Body>

          <Card.Footer justify="flex-start" color="primary">
            <Row width="100%">
              <Col justify="space-between" color="primary" width="100%">
                <Text color="white">
                  <p className="item-name">{data.name}</p>
                </Text>
                <Text weight={600} size={25} color="white">
                  ${(data.price / 80).toPrecision(3)}
                </Text>
                <Row justify="center">
                  <Button.Group justify="center">
                    <Button
                      icon={<Bag set="bold" primaryColor="white" />}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdd();
                      }}
                    ></Button>
                    <Button
                      icon={
                        <Heart
                          set={`${isFav ? "bold" : "light"}`}
                          primaryColor="white"
                        />
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleFav(isFav === true);
                      }}
                    ></Button>
                  </Button.Group>
                </Row>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Atropos>
      <div className="icon-hover-container"></div>
    </Link>
  );
}


