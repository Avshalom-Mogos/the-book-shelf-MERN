import React, { useState, useContext } from "react";
import { Container, Card, Col, Toast, Button, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "axios";
import "./ReadMore.css";
import { StateContext } from "../../Contexts/StateContext";

const ReadMore = (props) => {
  const { readMoreProp, login } = useContext(StateContext);
  const { history } = props;
  const [showToast, setShowToast] = useState(false);
  const [rgisterBeforeAdd, setRgisterBeforeAdd] = useState(false);

  if (!readMoreProp.id) return <Redirect to="/" />;
  if (rgisterBeforeAdd) return <Redirect to="/login" />;

  const toast = () => {
    return (
      <div className="Search-toast-container">
        <Toast
          className="Search-toast"
          autohide
          delay={3000}
          animation
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>
            <i className="fas fa-book"></i>
            <strong style={{ margin: "10px" }} className="mr-auto">
              The Book Shelf
            </strong>
          </Toast.Header>
          <Toast.Body>
            "<strong>{readMoreProp.volumeInfo.title}</strong>" was added to the cart!
          </Toast.Body>
        </Toast>
      </div>
    );
  };

  const addToCart = () => {
    const user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    axios.post("/cart", { id: user._id, book: readMoreProp }).then((res) => {
      ///____________________________________

      // this.setState({ showToast: true })
      setShowToast(true);
      // console.log(res)
      const newBook = JSON.parse(res.config.data).readMoreProp;

      //update my cart in session storage
      const user = JSON.parse(
        sessionStorage.getItem("theBookShelf_user_login")
      );
      user.myCart.push(newBook);
      const updatedUser = JSON.stringify(user);
      sessionStorage.setItem("theBookShelf_user_login", updatedUser);

      //update user info on App.js
      login();
    });
  };

  return (
    <div className="ReadMore">
      {showToast && toast()}
      <Card>
        <Container>
          <Row>
            <Col sm={4}>
              <Card.Img
                className="ReadMore-pic"
                src={readMoreProp.volumeInfo.imageLinks.thumbnail}
              />
            </Col>
            <Col>
              <Card.Body className="cardBody">
                <div>
                  <Card.Title className="title">
                    {readMoreProp.volumeInfo.title}
                  </Card.Title>
                  <Card.Text className="authors">
                    <strong>By:</strong> {readMoreProp.volumeInfo.authors[0]}{" "}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong>{" "}
                    <span className="price">
                      {readMoreProp.saleInfo.listPrice.amount}.99 ILS
                    </span>{" "}
                  </Card.Text>
                  <StarRatings
                    rating={Number(readMoreProp.rating)}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="gold"
                  />
                  <Card.Text>
                    <strong>Publish Date:</strong>{" "}
                    {readMoreProp.volumeInfo.publishedDate}
                  </Card.Text>

                  <Card.Text>
                    <strong>Pages:</strong>{" "}
                    {readMoreProp.volumeInfo.pageCount
                      ? readMoreProp.volumeInfo.pageCount
                      : "300"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Categories:</strong> {readMoreProp.volumeInfo.categories}
                  </Card.Text>
                  <Card.Text>{readMoreProp.volumeInfo.description}</Card.Text>
                </div>
              </Card.Body>
            </Col>
          </Row>
          <Col>
            {JSON.parse(sessionStorage.getItem("theBookShelf_user_login")) ? (
              <Button className="Add" onClick={addToCart}>
                Add To Cart
              </Button>
            ) : (
              <Button onClick={() => setRgisterBeforeAdd(true)} className="Add">
                Add To Cart
              </Button>
            )}
            <Button className="search" onClick={history.goBack}>
              Back to search
            </Button>
          </Col>
        </Container>
      </Card>
    </div>
  );
};
export default ReadMore;
