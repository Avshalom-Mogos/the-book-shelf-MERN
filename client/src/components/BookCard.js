import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"
import axios from "axios"
import "./CSS/BookCard.css"

import { Redirect } from "react-router-dom"
export default class BookCard extends Component {
    state = { flag: false }


    changeHendler = () => {
        this.props.moreDetails(this.props.book)
        this.setState({ flag: true })

    }


    render() {
        if (this.state.flag) {
            return <Redirect to="/ReadMore" />

        }



       

        return (
            <Card className="BookCard">
                <Card.Img className="BookCard-img" src={this.props.book.volumeInfo.imageLinks.thumbnail} />
                <Card.Body className="BookCard-cardBody">
                    <Card.Title className="BookCard-title">{this.props.book.volumeInfo.title}</Card.Title>
                    <Card.Text className="Bookcard-authors">By {this.props.book.volumeInfo.authors[0]}</Card.Text>
                    <Card.Text className="BookCard-rating">
                        {this.props.book.rating}
                        <i className="em em-star mx-2" aria-label="WHITE MEDIUM STAR"></i>
                    </Card.Text>
                    <Card.Text>{this.props.book.saleInfo.listPrice.amount}.99 ILS</Card.Text>
                </Card.Body>
                <Card.Footer>
                    {JSON.parse(sessionStorage.getItem("theBookShelf_user_login")) ?
                        <Button onClick={this.addToCart} className="BookCard-addToCart-btn" variant="primary">Add to Cart</Button>
                        : <Button className="BookCard-addToCart-btn" variant="primary">Add to Cart</Button>}

                </Card.Footer>
                <button onClick={this.changeHendler} >Read more</button>
            </Card>
        )
    }



    addToCart = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.post("/cart", { id: user._id, book: this.props.book })
            .then((res) => {
                console.log(res)
                let newBook = JSON.parse(res.config.data)
                this.props.Toast(newBook.book.volumeInfo.title)


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
