import React, { Component } from 'react';
import axios from "axios";
import "./CSS/Cart.css";
import CartItem from './CartItem';
import OrderSummary from "./OrderSummary"
import { Container, Col, Row, Badge } from 'react-bootstrap';

export default class Cart extends Component {

    state = { items: [], showOrderSummary: false }

    render() {
     
        return (
            <div className="Cart">
                <h1 className="text-info text-center">My Cart</h1>
                    <Container>   
                    {this.state.showOrderSummary ? <OrderSummary items={this.state.items} close={this.closeOrder} getAllCartDataFromDB={this.getAllCartDataFromDB} /> : ""}
                    <Row className="d-flex">
                        <Col className="Cart-container flex-grow-1">
                            <Row>
                                <Col>
                                <h1 className="cart-text"> {this.state.items.length===0?"The cart is Empty":""} </h1>
                                    {
                                        this.state.items.map((book, index) => {
                                            return (
                                                <CartItem   key={index} book={book}   update={this.getAllCartDataFromDB}/> 
                                                
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <div className="Cart-checkOut">
                        <h5> <i className="fas fa-book"></i>  all Books: <Badge>{this.state.items.length}</Badge></h5>
                        <h5>Total: {this.state.items.reduce((total, book) => {
                            return total + book.saleInfo.listPrice.amount
                        }, 0)} ILS</h5>
                        {this.state.items.length===0? <button style={{ marginBottom: "10px",opacity: 0.5}} className="btn-lg ">CheckOut</button> : 
                        <button onClick={() => this.setState({ showOrderSummary: true })} style={{ marginBottom: "10px" }} className="btn  btn-lg ">CheckOut</button>}
                    </div>
                    </Row>

                    </Container>
              
            </div>

        )
    }


    componentDidMount() {

        this.getAllCartDataFromDB();
    }

    getAllCartDataFromDB = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/cart/${user._id}`)
            .then((res) => {
                // console.log(res.data);

                // update myCart in Session storage
                user.myCart = [...res.data]
                let updatedUser = JSON.stringify(user)
                sessionStorage.setItem("theBookShelf_user_login", updatedUser);

                this.setState({ items: res.data })


                //update user info on App.js
                this.props.triggerLogin()
            })
    }



    closeOrder = () => {
      
        this.setState({ showOrderSummary: false })
    }
    








}

