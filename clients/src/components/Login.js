import React, { Component } from "react";
import {Button, Form, Container} from "react-bootstrap";
import * as LoginActions from "../actions/Login";
import { connect } from "react-redux";
import '../App.scss';

class Login extends Component {
    render() {
        return (
            <Container className="newpostingcontainer">
                <Container className="form-container">
                <h1 className="page-title">Login</h1>
                    <Form onSubmit={this.props.login.bind(this)}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder=""/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder=""/>
                        </Form.Group>
                        <Button id="submit-button" className="ads-button" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p className="No-account-yet">No account yet? <a href="/signup">Sign up here</a></p>
                </Container>    
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const VisibleLogin = connect(
    mapStateToProps,
    LoginActions
)(Login);

export default VisibleLogin;
