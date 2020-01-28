import React, { Component } from 'react';
import axios from "axios";
import "./CSS/Cart.css";
import CartItem from './CartItem';
import { Redirect } from "react-router-dom"
import { Container, Col, Row } from 'react-bootstrap';

export default class Cart extends Component {

    state = { items: [] }


    render() {
        if (this.state.redirectToPurchaseHistory) {
            return <Redirect to="Settings" />
        }
        return (
            <div>
                <h1>My Cart</h1>
                <p >all items: {this.state.items.length}</p>
                <div className="d-flex">
                    <Container className="Cart flex-grow-1">

                        <Row>


                            <Col>


                                {
                                    this.state.items.map((book, index) => {
                                        return (
                                            <div key={index}>
                                                <CartItem book={book} update={this.getAllCartDataFromDB} />

                                            </div>
                                        )
                                    })
                                }


                            </Col >
                        </Row>

                    </Container>

                    <div>
                        <button className="btn  btn-lg  mr-5">CheckOut</button>
                    </div>
                </div>
            </div>

        )
    }

    componentDidMount() {
        this.getAllCartDataFromDB()
    }

    getAllCartDataFromDB = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/cart/${user._id}`)
            .then((res) => {
                console.log(res.data);

                // update myCart in Session storage
                user.myCart = [...res.data]
                let updatedUser = JSON.stringify(user)
                sessionStorage.setItem("theBookShelf_user_login", updatedUser);

                this.setState({ items: res.data })


                //update user info on App.js
                this.props.triggerLogin()
            })
    }

}
