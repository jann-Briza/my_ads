import * as AdvertisementsModalActions from "../actions/Advertisements";
import React from "react";
import { connect } from "react-redux";
import {Button, Col, Form, Container, Row} from "react-bootstrap";


class AdvertisementModalForm extends React.Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
    this.props.getCategory();
    this.props.getLoginDetails();
    const url_href = window.location.pathname;
    const splitted_url = url_href.split("/");
    let advertisement_id = null;

    if (splitted_url.length == 3){
      advertisement_id = url_href.split("/")[2];
    }

    if (advertisement_id){
      this.props.getAdvertisementsById(advertisement_id);      
    }
  }

  render() {
        const { categories, active_advertisement, session_data, category_dropdown_value } = this.props;

        let button = <Button variant="primary" type="submit">Submit</Button>;
        let ads_id_display = null;
        let created_by_display = null;

        if (active_advertisement.is_updating) {
          button = <Button variant="primary" type="submit">Update</Button>;
          ads_id_display = <Form.Group controlId="formBasicTitle"><Form.Label>Ads ID: {active_advertisement.id} </Form.Label></Form.Group>
          created_by_display = <Form.Group controlId="formBasicTitle"><Form.Label>Created by user_id: {active_advertisement.created_by_id}</Form.Label></Form.Group>
        }

        return (
          <div>
            <Container className="newpostingcontainer">
            <Container className="form-container">
             <h1 className="page-title">{active_advertisement.is_updating ? `Updating Post`: "Create New Posting"}</h1>
                <Form onSubmit={this.props.submitFormAdvertisement.bind(this, active_advertisement, session_data)}>
                  {ads_id_display}
                  {created_by_display}
                  <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required defaultValue={active_advertisement.title} type="text" placeholder="Title" />
                  </Form.Group>
                  <Form.Group controlId="formBasicKey">
                    <Form.Label>Key</Form.Label>
                    <Form.Control required defaultValue={active_advertisement.key} type="text" placeholder="Key" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" onChange={this.props.changeFormCategory.bind(this)} value={category_dropdown_value}>
                      {categories.map((category, index) => (
                          <option name={category.name} value={category.id} key={index}>{category.name}</option>
                      ))}
                  </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required defaultValue={active_advertisement.description} as="textarea" rows={4} />
                  </Form.Group>
                  <Row>
                    <Col md={6} >
                      {button}
                    </Col>
                    <Col className="right-allign" md={6} >
                      {active_advertisement.is_updating ?
                        <Button  variant="danger" onClick={this.props.deleteAdvertisementsById.bind(this,active_advertisement.id)} type="submit">Delete</Button>
                        : null
                      }
                    </Col>
                  </Row>
                </Form>
            </Container>    
          </Container>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const VisibleForm = connect(
    mapStateToProps,
    AdvertisementsModalActions
)(AdvertisementModalForm);

export default VisibleForm;
