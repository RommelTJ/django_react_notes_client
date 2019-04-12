import React, {Component, Fragment} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'reactstrap';
import ListNotes from "./components/ListNotes";
import {fetchNotes, fetchNote, updateNote, addNote} from './api';
import AddNoteForm from './components/AddNoteForm';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        current_note_id: 0,
        is_creating: true,
        is_fetching: true
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
      this.getData();
  }

  async getData() {
      let data = await fetchNotes();
      this.setState({notes: data});
      this.setState({is_fetching: false});
  }

  handleItemClick(id) {
      this.setState({current_note_id: id});
      this.setState({is_creating: false});
  }

  handleAddNote = () => {
      this.setState({is_creating: true});
  };

  handleSaveNote = async (data) => {
      await addNote(data);
      this.setState({is_fetching: true});
      await this.getData();
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
                      {
                          this.state.is_creating ?
                              <AddNoteForm handleSave={(data) => this.handleSaveNote(data)} /> :
                              `Editing note with id: ${this.state.current_note_id}`
                      }
                  </Col>
              </Row>
          </Container>
      </Fragment>
    );
  }
}

export default App;
