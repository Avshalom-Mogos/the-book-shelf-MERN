import React, { Component } from 'react'
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios"
import {Redirect} from "react-router-dom"
export default class Signup extends Component {
    state = {
        username:"",
        email: "",
        password: "",
        ConfirmPassword:"",
        redirectToHome:false,
        error:false,

    }

    register = () => {
        
        axios.post("/users/register", {
            username:this.state.username,
            email: this.state.email,
            password: this.state.password

        }).then(res => {
            //res.data is user
            if(res.status===201){
                this.setState({redirectToHome:true})
            }

            else{
                this.setState({error:true})
                console.log(`error code : ${res.status}`);
            }

        }).catch(err => {
            this.setState({error:true})
            console.log(err);
        })
    }
    render() {

        const disabled = !this.state.email || !this.state.password;

        if(this.state.redirectToHome){
            return < Redirect to="/"/>
           
        }
        return (
            <div style={{ margin: "70px 0" }}>
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label >Username</Form.Label>
                            <Form.Control onChange={e => this.setState({ username: e.target.value })} type="text" placeholder="Enter User Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={e => this.setState({ConfirmPassword: e.target.value })} type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Accept Terms & Conditions" />
                        </Form.Group>
                        {this.state.error ? <p style={{color:"red"}}> Register Error</p> : ""}
                        <Button disabled= {disabled} onClick={this.register} variant="primary" type="submit">
                         Sign up</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}
