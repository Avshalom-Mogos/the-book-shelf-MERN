import React, { Component } from 'react';
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { Redirect ,Link} from "react-router-dom";
import axios from "axios";
import "./Login.css";


export default class Login extends Component {

    state = {
        redirectToHome: false,
        showError: false,
        showSpinner: false
    };

    userInfo = {
        email: "",
        password: "",
    };

    render() {

        if (this.state.redirectToHome) return < Redirect to="/" />;

        return (
            <div className="Login">
                <Container className="Login-from">
                    <Form onSubmit={(e) => this.login(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => this.userInfo.email = e.target.value} type="email" placeholder="Enter email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label >Password</Form.Label>
                            <Form.Control onChange={(e) => this.userInfo.password = e.target.value} type="password" placeholder="Password" required minLength={6} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <label>Don't have an account?</label>
                            <Link to="/signup"> Sign Up</Link>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">Login</Button>
                        </Form.Group>
                        <Form.Group className="Login-feedback">
                            {this.userFeedBack()}
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        )
    }

    userFeedBack = () => {
        if (this.state.showError) return <p style={{ color: "red" }}> Password or Email Is Invalid</p>
        if (this.state.showSpinner) return <Spinner animation="border" />
    }

    
    login = (e) => {
        e.preventDefault()
        this.setState({ showSpinner: true, showError: false })
        axios.post("/users/login", {
            email: this.userInfo.email,
            password: this.userInfo.password,

        }).then(res => {
            //res.data is user
            if (res.status === 200) {

                //wirte user info to session storage
                let userInfo = { ...res.data };
                sessionStorage.setItem("theBookShelf_user_login", JSON.stringify(userInfo));
                this.props.triggerLogin();


                this.setState({ redirectToHome: true })
            }

            else {
                this.setState({ showError: true })
                console.log(`error code : ${res.status}`);
            }

        }).catch(err => {
            this.setState({ showError: true })
        })
    }


}
