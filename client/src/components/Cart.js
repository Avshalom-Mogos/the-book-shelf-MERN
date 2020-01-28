import React, { Component } from 'react';
import axios from "axios";
import "./CSS/Cart.css";
import CartItem from './CartItem';
import { Container, Col, Row,Badge} from 'react-bootstrap';

export default class Cart extends Component {

    state = { items: []}

    prices= [];

    render() {

      
        return (
            <div className="bg">   
               <h1>My Cart</h1>
              
                <div className="d-flex"> 
            <Container  className="Cart flex-grow-1">
             
                <Row>

              
               <Col> 


                {
                    this.state.items.map((book, index) => {
                        return (
                            <div key={index}>
                                <CartItem  book={book} update={this.getAllCartDataFromDB}/>
                               
                            </div>
                        )
                    })
                }
               
                 
                 </Col >
                 </Row> 
                
            </Container>

            <div className="ChekOut"> 

                <h5> <i class="fas fa-book"></i>  all Books: <Badge>{this.state.items.length}</Badge></h5>
               <h5>Total: {this.state.items.reduce((total,book)=>{
               return total+book.saleInfo.listPrice.amount
                },0)} ILS</h5>
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
