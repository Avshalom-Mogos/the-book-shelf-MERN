import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"
import axios from "axios"
import "./CSS/BookCard.css"

import { Redirect } from "react-router-dom"
export default class BookCard extends Component {
    state = { flag: false }


    changeHendler =()=>{
        this.props.moreDetails(this.props.book)
        this.setState({flag:true})

    }


    render() {
         if(this.state.flag){
            return <Redirect to="/ReadMore"/>
            
         }
        
        

        this.addMissingDetails();
    
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
                       { JSON.parse(sessionStorage.getItem("theBookShelf_user_login"))? 
                       <Button onClick={this.addToCart} className="BookCard-addToCart-btn" variant="primary">Add to Cart</Button>
                       :  <Button  className="BookCard-addToCart-btn" variant="primary">Add to Cart</Button>} 
                        
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


    addMissingDetails = () => {


        if (!this.props.book.saleInfo.listPrice) {

            let randPrice = Math.floor(Math.random() * (70 - 20 + 1)) + 20
            this.props.book.saleInfo.listPrice = { amount: 0 };
            this.props.book.saleInfo.listPrice.amount = randPrice;
        }

        if (!this.props.book.volumeInfo.imageLinks) {

            let defaultSrc = "https://render.fineartamerica.com/images/rendered/default/print/5.875/8.000/break/images-medium-5/brown-closed-book-orensila.jpg"
            this.props.book.volumeInfo.imageLinks = { thumbnail: "" };
            this.props.book.volumeInfo.imageLinks.thumbnail = defaultSrc;
        }

        if (!this.props.book.volumeInfo.authors) {

            let defaultAuthors = "Ardato Belay";
            this.props.book.volumeInfo.authors = [defaultAuthors];
        }

        if (!this.props.book.rating) {

            let RandomRating = (Math.random() * 4 + 1).toFixed(1)
            this.props.book.rating = RandomRating;
        }

        if (!this.props.book.volumeInfo.description) {

            let defaultDescription = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
            this.props.book.volumeInfo.description = defaultDescription;
        }





    }



}
