import React, { Component } from 'react'
import "./CSS/ReadMore.css"
import { Container, Row,Card,Col, Alert} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import "./CSS/ReadMore.css";
import axios from "axios"
import SuccessAlert from "./SuccessAlert"

export default class ReadMore extends Component {
    
    state ={flag:false, alert_Masage:""}

    render() {
        console.log(this.props);

        if(!this.props.book.id){
            return <Redirect to="/" />
        }
        if(this.state.flag){
            return <Redirect to={`/search/${this.props.book.volumeInfo.title}`} />
        }

       

        
        return (
            
            <div className="ReadMore">
                  {this.state.alert_Masage==="success"?<SuccessAlert/> :""}
                  
                  <Card>  
              
                <Container> 

                    <Row className="d-flex">  
                    <div className="img">  
                   <Card.Img className="ReadMore-pic" src={this.props.book.volumeInfo.imageLinks.thumbnail} />
                   </div>
                <Card.Body className="cardBody">
                <Card.Title className="title">{this.props.book.volumeInfo.title}</Card.Title>
                 <div>
               <Card.Text className="authors">By{this.props.book.volumeInfo.authors[0]} </Card.Text>
                <Card.Text>{this.props.book.volumeInfo.description}</Card.Text>
              <Card.Text>   { `pageCount:${this.props.book.volumeInfo.pageCount?this.props.book.volumeInfo.pageCount:"300"}`} </Card.Text>
             <Card.Text> {`categories:${this.props.book.volumeInfo.categories?this.props.book.volumeInfo.categories:"Art"}`}</Card.Text>

                 
                     

                      <Card.Text className="rating">
                         
                        {this.props.book.rating}
                        <i className="em em-star mx-2" aria-label="WHITE MEDIUM STAR"></i>
                       

                        <Card.Text>{this.props.book.saleInfo.listPrice.amount}.99 ILS</Card.Text>
                       
                        {this.props.book.volumeInfo.publishedDate}
                        
                    </Card.Text>
                   
                    </div>
                  
                    
                   
                </Card.Body>
                </Row>
               
              
                
               
                </Container>
                <Col> 
                { JSON.parse(sessionStorage.getItem("theBookShelf_user_login"))? 
                       <button className="Add" onClick={this.addToCart}>Add To Cart</button>
                       :   <button className="Add">Add To Cart</button>} 


                <button className="search" onClick={this.BackToSearch} >Back to search</button>
                </Col>
                </Card>
            </div>
        )
    }
    










    BackToSearch =()=>{
        this.setState({flag:true})
        
    }


    addToCart = () => {
        
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.post("/cart", { id: user._id, book: this.props.book })
            .then((res) => {
                ///____________________________________
                
                this.setState({alert_Masage:"success"})
                console.log(res)
                let newBook = JSON.parse(res.config.data)
               

                //update my cart in session storage
                let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
                user.myCart.push(newBook.book)
                let updatedUser = JSON.stringify(user)
                sessionStorage.setItem("theBookShelf_user_login", updatedUser);
                

                //update user info on App.js
                this.props.triggerLogin()
            })

           

    }



    
}

