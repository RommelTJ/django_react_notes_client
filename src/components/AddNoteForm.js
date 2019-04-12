import React, {Fragment} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddNoteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSave(this.state);
        this.setState({title: '', content: ''})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        return (
            <Fragment>
                <Form onSubmit={(e) => this.handleSubmit(e)} >
                    <FormGroup>
                        <Label>Title</Label>
                        <Input name="title" type="text" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Content</Label>
                        <Input name="content" type="textarea" value={this.state.content} onChange={(e) => this.handleChange(e)} />
                    </FormGroup>
                    <Button color="success">Save</Button>
                </Form>
            </Fragment>
        );
    }
}

export default AddNoteForm;