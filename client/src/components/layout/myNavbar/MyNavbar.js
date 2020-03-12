import React from 'react'
import { Navbar, Form, FormControl, Dropdown, Badge, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./MyNavbar.css";



export default class MyNavbar extends React.Component {

    searchParams = "";

    render() {
        return (
            <div className="MyNavbar">
                <Navbar bg="dark" variant="dark" expand={false} className="MyNavbar-topnav">
                    <Navbar.Brand className="MyNavbar-title" as={Link} to="/home">
                        The Book Shelf
                    </Navbar.Brand>
                    <Form inline>
                        <Navbar.Text  >
                            <DropdownButton id="dropdown-basic-button" title="My Shelf" >
                                <Dropdown.Header>
                                    <strong>{`Welcome ${this.props.userInfo.userName}`}</strong>
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                {
                                    this.props.userInfo._id ?
                                        <div>
                                            <Dropdown.Item as={Link} to="/Cart">
                                                <span className="mr-3">Shopping Cart</span>
                                                <Badge pill variant="danger">{this.props.userInfo.myCart.length}</Badge>
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/purchaseHistory">Purchase History</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/about">About</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.triggerLogout}>Logout</Dropdown.Item>
                                        </div>
                                        : <div>
                                            <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/about">About</Dropdown.Item>
                                        </div>
                                }
                            </DropdownButton>
                        </Navbar.Text>
                    </Form>
                </Navbar>
                <Navbar className="MyNavbar-search-navbar">

                    <Form className="MyNavbar-form" onSubmit={(e) => this.redirectToSearch(e)}>

                        <FormControl onChange={(e) => this.searchParams = e.target.value} type="text"
                            placeholder="Search for books by title / author" className="MyNavbar-search-input" required maxLength="40" />
                        <button className="fas fa-search btn"></button>
                    </Form>
                </Navbar>

            </div>
        )

    }



    redirectToSearch = (e) => {
        e.preventDefault();

        let encodedParam = encodeURIComponent(this.searchParams);
        window.location.href = "/search/" + encodedParam;
    }

}
