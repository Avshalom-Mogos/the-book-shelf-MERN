import React, { Component } from 'react'
// import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import BookCard from './BookCard';
import "./CSS/Search.css"
import { Container, Col, Row } from 'react-bootstrap';


export default class Search extends Component {

    state = { books: [] };
    searchParam = this.props.match.params.searchParam;

    render() {

        return (
            <Container style={{ marginTop: "20px" }}>
                <h3>{`${this.state.books.length} results for ${this.searchParam}:`}</h3>
                <Row style={{ marginTop: "20px" }}>
                    
                    {
                        this.state.books.map((book, index) => {
                            return (
                                <Col key={index} md="4" sm="6" lg="4" xl="3">
                                    <BookCard book={book}/>
                                   
                                </Col>
                            )
                        })
                    }

                </Row>

            </Container>
        )
    }




    componentDidMount() {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=:${this.searchParam}&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`)
            .then((res) => {
                this.setState({ books: res.data.items })
                console.log( res.data.items);
                
                

            })
    }


}







