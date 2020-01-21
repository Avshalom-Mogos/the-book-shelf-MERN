import React from 'react'
import { Nav, Navbar, Form, FormControl, Button,Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./CSS/MyNavbar.css"




export default class MyNavbar extends React.Component {

    state = {
        userInfo: {}
       
    }
   

    searchParams = "";

    render() {


        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="" sticky="top">
                    <Navbar.Brand as={Link} to="/home">
                        The Book Shelf
                    </Navbar.Brand>

                    <Form inline>
                        <Navbar.Text>
                        <Dropdown> 
                        <Dropdown.Toggle variant="Success" id="dropdown-basic">
                         My Shelf
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                        {`Hello ${this.state.userInfo.userName}`} 
                       
                         {
                                this.state.userInfo._id ?  
                                    <div>
                                           
                                    <Dropdown.Item as ={Link} to ="/Cart" style={{color:"black"}} >Cart</Dropdown.Item>
                                    <Dropdown.Item as ={Link} to = "/Settings" style={{color:"black"}}>Settings</Dropdown.Item></div> : 
                                      <Nav.Link  style={{color:"black"}}  as={Link} to="/login">Login</Nav.Link> 
                                    
                            }
                          
                            
                            <Nav.Link>  {
                                this.state.userInfo._id ?
                                    <Nav.Link style={{color:"black"}} onClick={this.props.triggerLogout}>Logout</Nav.Link> :
                                   " "
                                
                            }</Nav.Link>
                        </Dropdown.Menu>
                        </Dropdown>
                        
                           </Navbar.Text>
                        <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />

                       
                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Form inline onSubmit={(e) => this.redirectToSearch(e)}>
                                <FormControl onChange={(e) => this.searchParams = e.target.value} type="text" placeholder="Search" className="mr-sm-2" />
                                <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button>
                            </Form>
                       
                      
                            {
                                this.state.userInfo._id ? " " : 
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link> 
                                    
                            }
                           
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                    
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )

    }

    redirectToSearch = (e) => {
        e.preventDefault();
        window.location.href = `/search/${this.searchParams}`
    }

    componentDidMount() {
        console.log("mount");
        this.checkUserLogin()

    }

    componentDidUpdate(prev) {
        console.log("update");

        console.log(this.state.userInfo.userName, prev.user.userName);
        console.log(prev.user.userName);
        console.log(this.props.user.userName)


        if (this.props.user.userName !== prev.user.userName) {

            this.checkUserLogin()
        }

    }

    checkUserLogin = () => {

        // let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        // console.log("user in storage:",user);
        // if (user) {
        this.setState({ userInfo: this.props.user });
        // } else {
        //     this.setState({ userInfo: { userName: "Guest" } });
        // }

    }



}
