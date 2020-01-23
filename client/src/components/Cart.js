import React, { Component } from 'react'

export default class Cart extends Component {
    state = {
        book: {}
    }
    render() {
           
            

        


        return (
            <div style={{ height: "100%" }}>
                <h1 >My Cart</h1>
                {
                    this.state.book.volumeInfo ? 
                    <div>
                        <p>{this.state.book.volumeInfo.title}</p>
                        <img src={this.state.book.volumeInfo.imageLinks.thumbnail}/>

                    </div>
                        : ""
                }

            </div>
        )
    }
    componentDidMount() {
        console.log("cart mount");


        let bookObj = sessionStorage.getItem("theBookShelf_user_cart")
     
        
        bookObj = JSON.parse(bookObj)
      


        this.setState({ book: bookObj })

    }
}
