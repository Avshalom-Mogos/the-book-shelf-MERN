import React, { Component } from 'react'
// import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import BookCard from './BookCard';
import "./CSS/Search.css"
import { Container } from 'react-bootstrap';


export default class Search extends Component {

    state = { books: [] };
    searchParam = this.props.match.params.searchParam;

    render() {
        
        return (
            <Container style={{ marginTop: "20px" }}>
                <h3>{`${this.state.books.length} results for ${this.searchParam}:`}</h3>
                <div className="wrapper" style={{ marginTop: "20px" }}>
                    {
                        this.state.books.map((book, index) => {
                            return (
                                <BookCard key={index} book={book} />

                            )
                        })
                    }
                </div>
            </Container>
        )
    }



    componentDidMount() {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=:${this.searchParam}&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`)
            .then((res) => {
                this.setState({ books: res.data.items })

            })
    }


}







