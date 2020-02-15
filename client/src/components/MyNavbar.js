import React from 'react'
import { Navbar, Form, FormControl, Dropdown, Badge, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./CSS/MyNavbar.css"


export default class MyNavbar extends React.Component {


    searchParams = "";

    render() {

        return (
            <div >
                <Navbar bg="dark" variant="dark" expand={false} className="MyNavbar">
                    <Navbar.Brand as={Link} to="/home">
                        The Book Shelf
                    </Navbar.Brand>
                    <Form inline>
                        <Navbar.Text  >
                            <DropdownButton id="dropdown-basic-button" title="My Shelf" >
                                <Dropdown.Header style={{ color: "black" }}>
                                    <strong>{`Welcome ${this.props.userInfo.userName}`}</strong>
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                {
                                    this.props.userInfo._id ?
                                        <div>
                                            <Dropdown.Item as={Link} to="/Cart" style={{ color: "black" }} >
                                                <span className="mr-3">Shopping Cart</span>
                                                <Badge pill variant="danger">{this.props.userInfo.myCart.length}</Badge>
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/PurchaseHistory" style={{ color: "black" }}>Purchase History</Dropdown.Item>
                                            <Dropdown.Item style={{ color: "black" }} onClick={this.props.triggerLogout}>Logout</Dropdown.Item>
                                            <Dropdown.Item style={{ color: "black" }} as={Link} to="/about">about</Dropdown.Item>
                                        </div> : <div>  
                                        <Dropdown.Item style={{ color: "black" }} as={Link} to="/login">Login</Dropdown.Item>
                                         <Dropdown.Item style={{ color: "black" }} as={Link} to="/about">about</Dropdown.Item>
                                        </div>

                                }
                            </DropdownButton>
                        </Navbar.Text>
                    </Form>
                </Navbar>

                <Navbar className="MyNavbar-search-navbar">
                    <Form  className="MyNavbar-form" onSubmit={(e) => this.redirectToSearch(e)}>
                        
                        <FormControl  onChange={(e) => this.searchParams = e.target.value} type="text" placeholder="Search" className="MyNavbar-search-input" />
                        <i onClick={this.redirectToSearch} className="fas fa-search btn"></i>
                    </Form>
                </Navbar>
            </div>
        )
    }

    redirectToSearch = (e) => {
        e.preventDefault();
        
        if(this.searchParams.length>0){
            window.location.href = `/search/${this.searchParams}`
        }
       

    }

}
