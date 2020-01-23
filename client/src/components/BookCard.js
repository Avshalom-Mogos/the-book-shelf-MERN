import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"
import "./CSS/BookCard.css"

export default class BookCard extends Component {
    render() {

        this.addMissingDetails();
        //console.log(this.props.book.volumeInfo.categories); USE THIS TO FILTER LATER

        return (


            <Card className="BookCard">
                <Card.Img className="imgCard" src={this.props.book.volumeInfo.imageLinks.thumbnail} />
                <Card.Body>
                    <Card.Title>{this.props.book.volumeInfo.title}</Card.Title>
                    <Card.Text className="text-muted">By {this.props.book.volumeInfo.authors[0]}</Card.Text>

                    <Card.Text className="description">
                        {this.props.book.volumeInfo.description}
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between">
                        <Button className="d.inline" variant="primary">Add to Cart</Button>
                        <p>{this.props.book.saleInfo.listPrice.amount}.99 ILS</p>
                    </div>
                </Card.Footer>


            </Card>


        )
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

        if (!this.props.book.volumeInfo.description) {

            let defaultDescription = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
            this.props.book.volumeInfo.description = defaultDescription;
        }



    }



}
