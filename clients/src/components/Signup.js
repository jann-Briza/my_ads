import React, { Component } from "react";
import * as SignupActions from "../actions/Signup";
import { connect } from "react-redux";
import {Button, Form, Container} from "react-bootstrap";
import '../App.scss';

class Signup extends Component {
    render() {
        return (
            <Container className="newpostingcontainer">
                <Container className="form-container">
                <h1 className="page-title">Sign Up</h1>
                    <Form onSubmit={this.props.signup.bind(this)}>
                        <Form.Group controlId="formBasicFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control required type="text"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type="password"/>
                        </Form.Group>
                        <Button id="submit-button" className="ads-button" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>    
            </Container>
        );
    }
}


function mapStateToProps(state) {
    return state;
}

const VisibleSignup = connect(
    mapStateToProps,
    SignupActions
)(Signup);

export default VisibleSignup;
