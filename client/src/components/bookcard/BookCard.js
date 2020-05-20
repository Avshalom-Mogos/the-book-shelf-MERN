import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "axios";
import "./BookCard.css";

const BookCard = (props) => {
  const { book, triggerLogin, setReadMoreProp, Toast, history } = props;
  const [rgisterBeforeAdd, setRgisterBeforeAdd] = useState(false);

  if (rgisterBeforeAdd) return <Redirect to="/login" />;

  const changeHendler = () => {
    setReadMoreProp(book);
    history.push("/readMore");
  };

  const addToCart = () => {
    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    axios
      .post("/cart", { id: user._id, book: book })
      .then((res) => {
        let newBook = JSON.parse(res.config.data);
        Toast(newBook.book.volumeInfo.title);

        //update my cart in session storage
        let user = JSON.parse(
          sessionStorage.getItem("theBookShelf_user_login")
        );
        user.myCart.push(newBook.book);
        let updatedUser = JSON.stringify(user);
        sessionStorage.setItem("theBookShelf_user_login", updatedUser);

        //update user info on App.js
        triggerLogin();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Card className="BookCard">
        <Card.Img
          className="BookCard-img"
          src={book.volumeInfo.imageLinks.thumbnail}
        />
        <Card.Body className="BookCard-cardBody">
          <Card.Title className="BookCard-title">
            {book.volumeInfo.title}
          </Card.Title>
          <Card.Text className="Bookcard-authors text-muted">
            By {book.volumeInfo.authors[0]}
          </Card.Text>
          <StarRatings
            rating={Number(book.rating)}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gold"
          />
          <Card.Text className="BookCard-price">
            {book.saleInfo.listPrice.amount.toFixed(2)} ILS
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {JSON.parse(sessionStorage.getItem("theBookShelf_user_login")) ? (
            <Button
              onClick={addToCart}
              className="BookCard-addToCart-btn"
              variant="primary"
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              onClick={() => setRgisterBeforeAdd({ rgisterBeforeAdd: true })}
              className="BookCard-addToCart-btn"
              variant="primary"
            >
              Add to Cart
            </Button>
          )}
        </Card.Footer>
        <button className="BookCard-readMoreBtn" onClick={changeHendler}>
          Read more
        </button>
      </Card>
    </div>
  );
};

export default withRouter(BookCard);
