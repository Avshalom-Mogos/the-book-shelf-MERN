import React, { Component } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios"

export default class Login extends Component {
    state ={
        email:"",
        password:"",

    }

    login =()=>{
        axios.post("/users/login",{
         email:this.state.email,
         password:this.state.password

        }).then(res=>{
            
            console.log(res);

            
        }).catch(err=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <Container>
                    <div>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label onChange={e=>this.setState({email:e.target.value})}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label onChange={e=>this.setState({password:e.target.value})}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <label>Dont have an account? </label>
                            <a href="/signup"> sign up</a>

                        </Form.Group>
                        <Button onClick={this.login} variant="primary" type="submit">Submit</Button>
                    </div>
                </Container>

            </div>
        )
    }
   
}
