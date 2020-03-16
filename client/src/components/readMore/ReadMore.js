import React, { Component } from 'react'
import { Container, Card, Col, Toast, Button, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import axios from "axios"
import "./ReadMore.css"


export default class ReadMore extends Component {

    state = { showToast: false, rgisterBeforeAdd: false }

    rgisterBeforeAdd = () => {
        this.setState({ rgisterBeforeAdd: true })
    }

    render() {

        let book = this.props.book;
        
        if (!book.id) return <Redirect to="/" />;
        if (this.state.rgisterBeforeAdd) return <Redirect to="/login" />;

        return (

            <div className="ReadMore">
                {this.state.showToast ? this.toast() : ""}
                <Card>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <Card.Img className="ReadMore-pic" src={book.volumeInfo.imageLinks.thumbnail} />
                            </Col>
                            <Col>
                                <Card.Body className="cardBody">
                                    <div>
                                        <Card.Title className="title">{book.volumeInfo.title}</Card.Title>
                                        <Card.Text className="authors"><strong>By:</strong> {book.volumeInfo.authors[0]} </Card.Text>
                                        <Card.Text><strong>Price:</strong> <span className="price">{book.saleInfo.listPrice.amount}.99 ILS</span> </Card.Text>
                                        <StarRatings
                                            rating={Number(book.rating)}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            starRatedColor="gold"
                                        />
                                        <Card.Text><strong>Publish Date:</strong> {book.volumeInfo.publishedDate}</Card.Text>

                                        <Card.Text><strong>Pages:</strong> {book.volumeInfo.pageCount ? book.volumeInfo.pageCount : "300"}</Card.Text>
                                        <Card.Text><strong>Categories:</strong> {book.volumeInfo.categories}</Card.Text>
                                        <Card.Text>{book.volumeInfo.description}</Card.Text>
                                    </div>
                                </Card.Body>
                            </Col>

                        </Row>
                        <Col >
                            {JSON.parse(sessionStorage.getItem("theBookShelf_user_login")) ?
                                <Button className="Add" onClick={this.addToCart}>Add To Cart</Button>
                                : <Button onClick={this.rgisterBeforeAdd} className="Add">Add To Cart</Button>}
                            <Button className="search" onClick={this.props.history.goBack} >Back to search</Button>
                        </Col>
                    </Container>
                </Card>
            </div>
        )
    }


    toast = () => {
        return (
            <div className="Search-toast-container">
                <Toast className="Search-toast" autohide
                    delay={3000} animation
                    onClose={() => this.setState({ showToast: false })}>
                    <Toast.Header>
                        <i className="fas fa-book"></i>
                        <strong style={{ margin: "10px" }} className="mr-auto">The Book Shelf</strong>
                    </Toast.Header>
                    <Toast.Body>"<strong>{this.props.book.volumeInfo.title}</strong>" was added to the cart!</Toast.Body>
                </Toast>
            </div>
        )
    }


    addToCart = () => {

        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.post("/cart", { id: user._id, book: this.props.book })
            .then((res) => {
                ///____________________________________

                this.setState({ showToast: true })
                console.log(res)
                let newBook = JSON.parse(res.config.data)

                //update my cart in session storage
                let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
                user.myCart.push(newBook.book)
                let updatedUser = JSON.stringify(user)
                sessionStorage.setItem("theBookShelf_user_login", updatedUser);

                //update user info on App.js
                this.props.triggerLogin()
            })

    }
}

