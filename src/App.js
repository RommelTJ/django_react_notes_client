import React, {Component, Fragment} from 'react';
import './App.css';
import {Button, Container, Row, Col} from 'reactstrap';
import ListNotes from "./components/ListNotes";
import {fetchNotes, fetchNote, updateNote, addNote} from './api';
import AddNoteForm from './components/AddNoteForm';
import Websocket from 'react-websocket';
import EditNoteForm from "./components/EditNoteForm";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        note: {},
        current_note_id: 0,
        is_creating: true,
        is_fetching: true
    };

    this.getData = this.getData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
      this.getData();
  }

  async getData() {
      let data = await fetchNotes();
      this.setState({notes: data});
      this.setState({is_fetching: false});
  }

  async handleItemClick(id) {
      let selected_note = await fetchNote(id);
      this.setState({current_note_id: id});
      this.setState({is_creating: false});
      this.setState({note: selected_note});
  }

  handleAddNote = () => {
      this.setState({is_creating: true});
  };

  handleSaveNote = async (data) => {
      await addNote(data);
      this.setState({is_fetching: true});
      await this.getData();
  };

  handleData(data) {
      let result = JSON.parse(data);
      let current_note = this.state.notes;
      if (current_note.id === result.id) {
          this.setState({note: result});
      }
  }

  handleOnChange(e) {
      let content = e.target.value;
      let current_note = this.state.note;
      current_note.content = content;

      this.setState({note: current_note});

      const socket = this.refs.socket;
      socket.state.ws.send(JSON.stringify(current_note));

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
                              <EditNoteForm handleChange={this.handleOnChange} note={this.state.note} />
                      }
                      <Websocket ref='socket' url='ws://127.0.0.1:8000/ws/notes'
                                 onMessage={this.handleData.bind(this)} />
                  </Col>
              </Row>
          </Container>
      </Fragment>
    );
  }
}

export default App;
