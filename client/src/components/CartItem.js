import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import axios from "axios"


export default class cartItem extends Component {

    deleteBook = () => {

        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.delete(`cart/delete/${user._id}/${this.props.book.id}`)
            .then(res => this.props.update())
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        
        const book = this.props.book;
        return (
            <div> 
            <Container   className="container text-center"> 
             <Row className="row"> 
            <Col   sm={3} >
                <img  style={{marginBottom:"10px"}} src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
               
             </Col>
             <Col  sm={3} > 
             <p>{book.volumeInfo.title}</p>
             </Col>
           
            <Col  sm={3}> 
                { <button onClick={this.deleteBook}    className="btn btn-primary">Remove from cart</button> }
             </Col>
            
            </Row>
           

            </Container>
            
          
            </div>
        )

       
    }
    
}