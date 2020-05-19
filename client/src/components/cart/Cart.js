import React, { useState, useEffect } from "react";
import { Container, Col, Row, Badge } from "react-bootstrap";
import CartItem from "../cartItem/CartItem";
import OrderSummary from "../orderSummary/OrderSummary";
import BookLoader from "../bookLoader/BookLoader";
import axios from "axios";
import "./Cart.css";

const Cart = (props) => {
  const [items, setItems] = useState([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  /////clearMycart
  const clearMycart = () => {
    return (
      <div>
        {items.length === 0 ? (
          <button disabled className="btn-lg">
            Clear Cart
          </button>
        ) : (
          <button className="btn" onClick={deleteAlldataFromCart}>
            Clear Cart
          </button>
        )}
      </div>
    );
  };

  ///checkOutDisplay
  const checkOutDisplay = () => {
    if (!showSpinner) {
      return (
        <div className="Cart-checkOut">
          <h5>
            {" "}
            <i className="fas fa-book"></i> All Books:{" "}
            <Badge pill variant="info">
              {items.length}
            </Badge>
          </h5>
          <h5>
            Total:
            {items
              .reduce((total, book) => {
                return total + book.saleInfo.listPrice.amount;
              }, 0)
              .toFixed(2)}{" "}
            ILS
          </h5>
          {items.length === 0 ? (
            <button disabled className="btn-lg">
              CHECKOUT
            </button>
          ) : (
            <button
              onClick={() => setShowOrderSummary(true)}
              style={{ marginBottom: "10px" }}
              className="btn btn-lg"
            >
              CHECKOUT
            </button>
          )}
        </div>
      );
    }
  };

  //////deleteAlldataFromCart
  const deleteAlldataFromCart = () => {
    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    axios
      .delete(`cart/${user._id}`)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });

    getAllCartDataFromDB();
  };

  
  //////getAllCartDataFromDB
  const getAllCartDataFromDB = () => {
    setShowSpinner(true);
    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    axios.get(`/cart/${user._id}`).then((res) => {
      setShowSpinner(false);

      //show cart is empty msg
      if (res.data.length === 0) {
        setShowEmptyMessage(true);
      }

      // update myCart in Session storage
      user.myCart = [...res.data];
      let updatedUser = JSON.stringify(user);
      sessionStorage.setItem("theBookShelf_user_login", updatedUser);

      setItems([...res.data]);

      //update user info on App.js
      props.triggerLogin();
    });
  };

  useEffect(getAllCartDataFromDB,[]);


  /////closeOrder
  const closeOrder = () => {
    setShowOrderSummary(false);
  };

  return (
    <div>
      <div className="Cart">
        {showOrderSummary ? <div className="Cart-dimBackground"></div> : ""}
        {showOrderSummary ? (
          <OrderSummary
            items={items}
            close={closeOrder}
            getAllCartDataFromDB={getAllCartDataFromDB}
          />
        ) : (
          ""
        )}
        <h1 className="text-info text-center">My Cart</h1>
        <Container>
          {showEmptyMessage ? (
            <h2 className="Cart-emptyMessage">The cart is empty</h2>
          ) : (
            ""
          )}
          {showSpinner ? <BookLoader /> : ""}
          <Row className="d-flex">
            <Col className="Cart-container flex-grow-1">
              <Row>
                <Col>
                  {items.map((book, index) => {
                    return (
                      <CartItem
                        key={index}
                        book={book}
                        update={getAllCartDataFromDB}
                      />
                    );
                  })}
                </Col>
              </Row>
            </Col>
            {checkOutDisplay()}
            {clearMycart()}
          </Row>
        </Container>
      </div>
      )
    </div>
  );
};

export default Cart;
