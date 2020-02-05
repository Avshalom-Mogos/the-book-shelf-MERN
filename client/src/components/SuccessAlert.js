import React, { Component } from 'react'

export default class SuccessAlert extends Component {
    render() {
       
        return ( 
            
          <div className="alert alert-success text-center" role="alert"> 
               {/* <a href="cart" class="close" data-dismiss="alert" aria-label="close">&times;</a> */}
               The book was added to the cart
            </div>
        )
    }
}
