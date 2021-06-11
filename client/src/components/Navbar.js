import * as AdvertisementsActions from "../actions/Advertisements";
import React from "react";
import { connect } from "react-redux";
import {Button, Container, Row, Col} from "react-bootstrap";

class NavBar extends React.Component {
    render() {
      const session_data = this.props.session_data;
        return (
          <Container fluid className="navbar">
            <Row>
              <Col className="left-allign" md={6}><h3>Ads.com</h3></Col>
              <Col className="right-allign" md={6}>
                {session_data.is_logged_in === "true" ?
                <div>
                  <h4>{"Hello " + session_data.name} | <a href="/login" onClick={this.props.logout.bind(this)}>Logout</a></h4>
                </div>
                : <div>
                  <Button id="solid-button" className="ads-button" onClick={()=> window.location.href='/login'} variant="primary">Login</Button>
                  <Button id="outlined-button" className="ads-button" onClick={()=> window.location.href='/signup'} variant="light">Signup</Button>
                </div>}
              </Col>
            </Row>
          </Container>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const VisibleNavBar = connect(
    mapStateToProps,
    AdvertisementsActions
)(NavBar);

export default VisibleNavBar;
