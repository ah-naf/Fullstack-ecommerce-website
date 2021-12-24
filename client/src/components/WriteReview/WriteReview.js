import React, { useEffect, useState } from "react";
import { Button, Modal, Text } from "@nextui-org/react";
import { EditSquare, Star } from "react-iconly";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./WriteReview.css";
import { asyncReviewAdd, asynctGetReview } from "../../store/reviewSlice";

toast.configure();

export default function WriteReview() {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    dispatch(asynctGetReview(id))
  },[dispatch,id])

  const closeHandler = (e) => {
    setVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      asyncReviewAdd({
        token: localStorage.getItem("token"),
        id,
        rating,
        title: review.title,
        desc: review.desc,
      })
    );
    window.location.href = `/product/${id}`
    setVisible(false)

  };

  const handler = (e) => {
    e.preventDefault();
    if (isAuth) {
      setVisible(true);
    } else {
      toast.error("Please Log In", {
        position: "top-center",
      });
    }
  };

  const handleClick = (e, val) => {
    e.preventDefault();
    setRating(val);
  };

  const handleKeyUp = (e, val) => {
    e.preventDefault()
    if(e.keyCode === 32) {
      if(val === 'title') {
        setReview({...review, title : review.title+' '})
      } else {
        setReview({...review, desc : review.desc+' '})
      }
    }
  }

  return (
    <div className="write-a-review-container">
      <Button
        auto
        rounded
        icon={<EditSquare set="bold" primaryColor="white" />}
        color="secondary"
        onClick={handler}
      >
        Write a review
      </Button>
      {isAuth && (
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          width={"600px"}
        >
          <Modal.Header>
            <Text id="modal-title" size={22}>
              Write a{" "}
              <Text b color="secondary" size={25}>
                Review
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <form className="review-form">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                placeholder="Review Title"
                onChange={(e) =>
                  setReview({ ...review, title: e.target.value })
                }
                value={review.title}
                onKeyUp={e => handleKeyUp(e, 'title')}
              />
              <label htmlFor="desc">Description: </label>
              <textarea
                name=""
                id="desc"
                cols="10"
                rows="3"
                placeholder="Review Description"
                onChange={(e) => setReview({ ...review, desc: e.target.value })}
                value={review.desc}
                onKeyUp={e => handleKeyUp(e, 'desc')}
              ></textarea>
              <div className="product-color-container">
                <div className="color-button-container">
                  <h6 style={{ margin: 0 }}>Rating: </h6>
                  <button
                    className={`color-button ${
                      rating === 1 && "color-button-active"
                    }`}
                    style={{ background: "white" }}
                    onClick={(e) => handleClick(e, 1)}
                  >
                    <Star set="bold" primaryColor="royalblue" />
                  </button>
                  <button
                    className={`color-button ${
                      rating === 2 && "color-button-active"
                    }`}
                    style={{ background: "white" }}
                    onClick={(e) => handleClick(e, 2)}
                  >
                    <Star set="bold" primaryColor="royalblue" />
                  </button>
                  <button
                    className={`color-button ${
                      rating === 3 && "color-button-active"
                    }`}
                    style={{ background: "white" }}
                    onClick={(e) => handleClick(e, 3)}
                  >
                    <Star set="bold" primaryColor="royalblue" />
                  </button>
                  <button
                    className={`color-button ${
                      rating === 4 && "color-button-active"
                    }`}
                    style={{ background: "white" }}
                    onClick={(e) => handleClick(e, 4)}
                  >
                    <Star set="bold" primaryColor="royalblue" />
                  </button>
                  <button
                    className={`color-button ${
                      rating === 5 && "color-button-active"
                    }`}
                    style={{ background: "white" }}
                    onClick={(e) => handleClick(e, 5)}
                  >
                    <Star set="bold" primaryColor="royalblue" />
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Close
            </Button>
            <Button auto onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
