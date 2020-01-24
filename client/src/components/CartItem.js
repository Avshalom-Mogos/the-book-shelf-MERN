import React, { Component } from 'react'
import axios from "axios"
export default class cartItem extends Component {
    
    deleteBook = ()=>{
    
   axios.delete("cart/delete/5e2aba53a84743056879d3a8/"+ this.props.book.id)
   .then(res=>{
       console.log(res);
       
   }).catch(err=>{
       console.log(err);
       
   })
        
    
     
       
}
    render() {
        const book = this.props.book;
        return (
            <div style={this.style}>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                <p>{book.volumeInfo.title}</p>
                <button onClick={this.deleteBook}>Remove from cart</button>
            </div>
        )
    }
    //temp style
    style = {
        border: "1px solid red"
    }
}
