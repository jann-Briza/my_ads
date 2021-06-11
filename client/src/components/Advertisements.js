import React from "react";
import * as AdvertisementActions from "../actions/Advertisements";
import { connect } from "react-redux";
import {Button, Card, Container, Row, Col, Form, Pagination} from "react-bootstrap";
import VisibleNavBar from "./Navbar";


class Advertisements extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAdvertisements();
        this.props.getCategory();
        this.props.getLoginDetails();
    }

    render() {
        const {advertisements, active_category, categories, session_data} = this.props;
        const pagination_size = [...`${this.props.pagination_info.size}`].map(Number);
        let pagination_size_int = pagination_size / 6;
        let pagination_list = []
        if (pagination_size_int % 1 != 0) {
            pagination_size_int += 1;
        }
        for(let i = 0; i < parseInt(pagination_size_int); i++)
        {
            pagination_list.push(i);
        }
        return (
            <div>
                <VisibleNavBar session_data={session_data}/>
                <Container>
                    <Row className="posting-section">
                        <Col className="left-allign" md={6}>
                            <h3>Postings</h3>
                        </Col>
                        {
                            session_data.is_logged_in === "true" ?
                            <Col className="right-allign" md={6}>
                                <Button id="submit-button" onClick={()=> window.location.href='/form'} className="ads-button" variant="primary">+ Create a Posting</Button>
                            </Col>
                            : null
                        }
                    </Row>
                    <Row className="search-ads">
                        <Form>
                            <Col md={12}>
                                <Form.Group className="category-style" controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Select Category</Form.Label>
                                    <Form.Control as="select" onChange={this.props.getCategoryValue.bind(this, categories)}>
                                        {categories.map((category, index) => (
                                            <option name={category.name} value={category.id} key={index}>{category.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form>                        
                    </Row>
                    <Row>
                        <Col md={12} className="left-allign">
                            {active_category === null ? null : <h4>Search for results for <b>"{active_category}"</b></h4> }
                        </Col>
                    </Row>
                    <Row>
                        {advertisements.map((advertisement, index) => (
                            <Col md={6} key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><h3>{advertisement.title} </h3></Card.Title>
                                        <Card.Text>
                                            {advertisement.description}
                                        </Card.Text>
                                        <Button onClick={()=> window.location.href='/form/' + advertisement.id} variant="primary">See details</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col className="center-allign" md={12}>
                            <Pagination>
                                {pagination_list.map((category, index) => (
                                    <Pagination.Item onClick={this.props.paginateAdvertisement.bind(this, index, this.props.pagination_info, this.props.active_pagination)} key={index} active={index === this.props.active_pagination}>
                                        {index}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const VisibleAdvertisements = connect(
    mapStateToProps,
    AdvertisementActions
)(Advertisements);

export default VisibleAdvertisements;
