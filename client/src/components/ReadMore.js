import React, { Component } from 'react'
<<<<<<< HEAD
import "./CSS/ReadMore.css"
import { Container, Row,Card,Col, Toast, Button} from 'react-bootstrap';
=======
import { Container, Row, Card, Col, Toast } from 'react-bootstrap';
>>>>>>> 0eacdb676296f5bf8b3c40c7ec00b1b21825d4b2
import { Redirect } from 'react-router-dom';
import axios from "axios"
<<<<<<< HEAD


export default class ReadMore extends Component {
    
    state ={flag:false, showToast:false,rgisterBeforeAdd:false}

    rgisterBeforeAdd =()=>{
        this.setState({rgisterBeforeAdd:true})
    }
=======
import "./CSS/ReadMore.css"


export default class ReadMore extends Component {

    state = { flag: false, showToast: false }
>>>>>>> 0eacdb676296f5bf8b3c40c7ec00b1b21825d4b2

    render() {
        console.log(this.props);

<<<<<<< HEAD
        if(!this.props.book.id){
            return <Redirect to="/"/>
        }

        if(this.state.flag){
            return <Redirect to={`/search/${this.props.book.volumeInfo.title}`} />
        }

        if(this.state.rgisterBeforeAdd){
            return <Redirect to ="/login"/>
        }
       
=======
        if (!this.props.book.id) {
            return <Redirect to="/" />
        }
        if (this.state.flag) {
            return <Redirect to={`/search/${this.props.book.volumeInfo.title}`} />
        }

>>>>>>> 0eacdb676296f5bf8b3c40c7ec00b1b21825d4b2



        return (

            <div className="ReadMore">
<<<<<<< HEAD
                
                  {this.state.showToast ? this.Toast() : ""}
                  
                  <Card>  
              
                <Container> 

                    <Col className="d-flex">  
                    <div className="img">  
                   <Card.Img className="ReadMore-pic" src={this.props.book.volumeInfo.imageLinks.thumbnail} />
                   </div>
                <Card.Body className="cardBody">
              
                 <div>
                 <Card.Title className="title">{this.props.book.volumeInfo.title}</Card.Title>
               <Card.Text className="authors">By{this.props.book.volumeInfo.authors[0]} </Card.Text>
               <Card.Text> {`Price ${this.props.book.saleInfo.listPrice.amount }`}.99 ILS </Card.Text>
               <Card.Text className="rating">
                         {this.props.book.rating}
                         <i className="em em-star mx-2" aria-label="WHITE MEDIUM STAR"></i>

                       </Card.Text>
                 <Card.Text> {this.props.book.volumeInfo.publishedDate}</Card.Text>

                 <Card.Text>{this.props.book.volumeInfo.description}</Card.Text>
                 <Card.Text>   { `pageCount:${this.props.book.volumeInfo.pageCount?this.props.book.volumeInfo.pageCount:"300"}`} </Card.Text>
                <Card.Text> {`categories:${this.props.book.volumeInfo.categories?this.props.book.volumeInfo.categories:"Art"}`}</Card.Text>

                 
                    </div>
                  
                    
                   
                </Card.Body>
                </Col>
               
              
                
               
                </Container>
                <Col> 
                { JSON.parse(sessionStorage.getItem("theBookShelf_user_login"))? 
                       <Button className="Add" onClick={this.addToCart}>Add To Cart</Button>
                       :   <Button onClick={this.rgisterBeforeAdd} className="Add">Add To Cart</Button>} 


                <Button className="search" onClick={this.BackToSearch} >Back to search</Button>
                </Col>
=======
                {/* {this.state.showToast==="success"?<SuccessAlert/> :""} */}
                {this.state.showToast ? this.Toast() : ""}

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
                                    <Card.Text>   {`pageCount:${this.props.book.volumeInfo.pageCount ? this.props.book.volumeInfo.pageCount : "300"}`} </Card.Text>
                                    <Card.Text> {`categories:${this.props.book.volumeInfo.categories ? this.props.book.volumeInfo.categories : "Art"}`}</Card.Text>




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
                        {JSON.parse(sessionStorage.getItem("theBookShelf_user_login")) ?
                            <button className="Add" onClick={this.addToCart}>Add To Cart</button>
                            : <button className="Add">Add To Cart</button>}


                        <button className="search" onClick={this.BackToSearch} >Back to search</button>
                    </Col>
>>>>>>> 0eacdb676296f5bf8b3c40c7ec00b1b21825d4b2
                </Card>
            </div>
        )
    }








    Toast = () => {
        return (
            <div className="Search-toast-container">
                <Toast className="Search-toast" autohide
                    delay={3000} animation
                    onClose={() => this.setState({ showToast: false })}>
                    <Toast.Header>
                        <img src="" className="rounded mr-2" alt="brandImg" />
                        <strong className="mr-auto">The Book Shelf</strong>
                    </Toast.Header>
                    <Toast.Body>Book was added to the cart!</Toast.Body>
                </Toast>
            </div>

        )
    }


    BackToSearch = () => {
        this.setState({ flag: true })

    }


    addToCart = () => {

        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.post("/cart", { id: user._id, book: this.props.book })
            .then((res) => {
                ///____________________________________

                this.setState({ showToast: true })
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

