import React, {Component, Fragment} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'reactstrap';
import ListNotes from "./components/ListNotes";

const notes_temp = [
    {
        'id': 1,
        'title': 'This is react node data',
        'content': 'This is the content'
    },
    {
        'id': 2,
        'title': 'Second note',
        'content': 'This is more content'
    },
    {
        'id': 3,
        'title': 'Third note',
        'content': 'This is the content #3'
    }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: notes_temp,
        current_note_id: 0,
        is_creating: true
    }
  }

  handleItemClick(id) {
      this.setState({current_note_id: id});
      this.setState({is_creating: false});
  }

  handleAddNote = () => {
      this.setState({is_creating: true});
  };

  render() {
    return (
      <Fragment>
          <Container>
              <Row>
                  <Col xs="10">
                      <h2>Realtime notes</h2>
                  </Col>
                  <Col xs="2">
                      <Button color="primary" onClick={() => this.handleAddNote()}>
                          Create new note
                      </Button>
                  </Col>
              </Row>

              <Row>
                  <Col xs="4">
                      <ListNotes notes={this.state.notes} handleItemClick={(id) => this.handleItemClick(id)} />
                  </Col>
                  <Col xs="8">
                      <p>Content/Editing here...</p>
                      {this.state.is_creating ? "Creating now..." : `Editing note with id: ${this.state.current_note_id}` }
                  </Col>
              </Row>
          </Container>
      </Fragment>
    );
  }
}

export default App;
