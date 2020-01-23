import React, { Component } from 'react'
import "./CSS/Cart.css"
export default class Cart extends Component {
    state = {
        book: {}
    }
    render() {
           
        

        return (
            <div className="Cart" style={{height:"100%"}}>
                <h1>My Cart</h1>
            </div>
        )
    }
      
    
}
