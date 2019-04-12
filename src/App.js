import React, {Component, Fragment} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        current_note_id: 0,
        is_creating: true
    }
  }

  render() {
    return (
      <Fragment>
          <Container>
              <Row>
                  <Col xs="10">
                      <h2>Realtime notes</h2>
                  </Col>
                  <Col xs="2">
                      <Button color="primary">Create new note</Button>
                  </Col>
              </Row>

              <Row>
                  <Col xs="4">
                      <h5>Add notes here...</h5>
                  </Col>
                  <Col xs="8">
                      <p>Content/Editing here...</p>
                  </Col>
              </Row>
          </Container>
      </Fragment>
    );
  }
}

export default App;
