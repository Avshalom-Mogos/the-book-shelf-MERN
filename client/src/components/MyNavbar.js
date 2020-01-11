import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap"



export default class MyNavbar extends React.Component {

    searchParams = "";

    render() {


        return (
            <div>
                <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="/home">My Book Store</Navbar.Brand>
                    <Form inline>
                        <FormControl onChange={(e) => this.storeInputVal(e)} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button>
                        <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />
                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Login</Nav.Link>
                            <Nav.Link href="/link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        )

    }

    storeInputVal = (e) => {
        this.searchParams = e.target.value;
        console.log(`/search/${this.searchParams}`);

    }

    redirectToSearch = () => {
        console.log("click");
        // alert(`/search/${this.searchParams}`)
        
        window.location.href = `/search/${this.searchParams}`
    }

}
