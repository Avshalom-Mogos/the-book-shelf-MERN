import React, { Component } from 'react'
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios"
import { Redirect } from "react-router-dom"

export default class Signup extends Component {

    state = {

        redirectToHome: false,
        error: false
    }

    userInfo = {

        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreedEULA: false

    }

    render() {

        if (this.state.redirectToHome) {
            return < Redirect to="/" />

        }
        return (
            <div style={{ height: "100%",padding:"80px" }}>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.userName = e.target.value} type="text" placeholder="Enter User Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.email = e.target.value} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.password = e.target.value} type="password" minLength="6" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.confirmPassword = e.target.value} type="password" minLength="6" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check onChange={(e) => this.userInfo.agreedEULA = e.target.checked} type="checkbox" label="Accept Terms & Conditions" required />
                        </Form.Group>
                        {this.state.error ? <p style={{ color: "red" }}>passwords dosnt match</p> : ""}
                        <Button variant="primary" type="submit">Sign up</Button>
                    </Form>
                </Container>
            </div>
        )

    }

    register = () => {

        axios.post("/users/register", {

            email: this.userInfo.email,
            password: this.userInfo.password,
            userName: this.userInfo.userName,
            agreedEULA: this.userInfo.agreedEULA


        }).then(res => {
            //res.data is user
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
            }

            else {
                this.setState({ error: true })
                console.log(`error code : ${res.status}`);
            }

        }).catch(err => {
            this.setState({ error: true })
            console.log(err);
        })
    }

    validate = () => {
        //if password not match to confirm password
        if (this.userInfo.password !== this.userInfo.confirmPassword) {

            return false;
        }
        return true;
    }

    handleSubmit = (e) => {

        if (!this.validate()) {

            console.log("validation error");
            console.log(this.userInfo)
            this.setState({error:true});
            e.preventDefault();
        } else {

            this.register();
            this.setState({ redirectToHome: true })
        }

    }
}
