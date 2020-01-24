import React, { Component } from 'react'

export default class cartItem extends Component {
    render() {
        const book = this.props.book;
        return (
            <div style={this.style}>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                <p>{book.volumeInfo.title}</p>
                <button>Remove from cart</button>
            </div>
        )
    }
    //temp style
    style = {
        border: "1px solid red"
    }
}
