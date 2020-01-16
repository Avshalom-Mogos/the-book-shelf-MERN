import React, { Component } from 'react'
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";

export default class Search extends Component {

    state = { books: [] }

    searchParam = this.props.match.params.searchParam;

    render() {

        const bookCard = this.state.books.map((book, index) => {
            console.log("book");
            console.log(book);


            return (
                <div>
                    <p>{book.volumeInfo.title}</p>
                    <p>{book.volumeInfo.authors}</p>
                    {/* <p>{book.volumeInfo.description}</p> */}
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={`${book.volumeInfo.title} - thumbnail`}></img>
                    <hr />
                </div>
            )
            console.log(index);


          });
        console.log("this.props.bookToSearch");
        console.log(this.props.match.params);

        return (
            <div>
                <h3>{`Search results for: ${this.searchParam}`}</h3>
              
                <div className="container">
                 



                    <Container>
            
                    </Container>
                 

                </div>
            </div>
        )
    }

    componentDidMount() {

        // console.log("search mount".toLocaleUpperCase());
        // console.log(this.searchParam);
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q=:${this.searchParam}&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`)
        //     .then((res) => this.setState({ books: res.data.items }))
    }






}



