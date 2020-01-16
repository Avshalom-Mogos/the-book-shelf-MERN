import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom";
import "./CSS/MyNavbar.css"



export default class MyNavbar extends React.Component {

    searchParams = "";

    render() {


        return (
            <div>
                <Navbar  expand="" sticky="top"> 
                {/* expand="lg" */}
                
                    <Navbar.Brand>
                        <NavLink className="NavLink" to="/home">The Book Shelf</NavLink>
                    </Navbar.Brand>
                    <Form inline onSubmit={(e) => this.redirectToSearch(e)}>
                        <FormControl onChange={(e) => this.storeInputVal(e)} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button>
                        <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />
                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <NavLink to="/login">Login</NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/login">Login</NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/about">About</NavLink>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>



            </div>
        )

    }

    storeInputVal = (e) => {

        this.searchParams = e.target.value;

    }



    redirectToSearch = (e) => {
        e.preventDefault();
        window.location.href = `/search/${this.searchParams}`
    }

}
