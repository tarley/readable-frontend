import React, {Component} from 'react';
import {	FormGroup,
			Label,
			Input,
			Col,
			FormFeedback,
			Alert} from 'reactstrap';

import {isNullOrEmpty} from '../../utils/Helpers';

class FormPost extends Component {
	state = {
		title: '',
		body: '',
		author: '',
		category: '',
		editMode: false,
		validate: {
			title: '',
			body: '',
			author: '',
			category: '',
		}
	}
	validate(key, value) {
		const {validate} = this.state;

    	validate[key] = isNullOrEmpty(value) ? 'has-danger' : 'has-success';
    	
    	this.setState({
    		[key]: value,
    		validate
    	});
	}
	componentTitle() {
		const {title, validate} = this.state;

		return (
			<FormGroup row>
				<Label for="input-title" sm={2}>Title:</Label>
				<Col sm={10}>
					<Input 
						type="text" 
						name="title" 
						id="input-title" 
						defaultValue={title}
						placeholder="Udacity is the best place to learn React"
						onChange={e => this.validate('title', e.target.value)}
						valid={validate.title === 'has-success' }
            		invalid={validate.title === 'has-danger' }
					/>
					<FormFeedback valid>OK!</FormFeedback>
          		<FormFeedback>Title is required</FormFeedback>
				</Col>
			</FormGroup>
		);
	}
	componentBody() {
		const {body, validate} = this.state;

		return (
			<FormGroup row>
				<Label for="input-body" sm={2}>Text:</Label>
				<Col sm={10}>
					<Input 
						type="textarea" 
						name="body" 
						id="input-body" 
						value={body} 
						placeholder="Everyone says so after all."
						onChange={e => this.validate('body', e.target.value)}
						valid={validate.body === 'has-success' }
             		invalid={validate.body === 'has-danger' }
             	/>
             	<FormFeedback valid>OK!</FormFeedback>
           		<FormFeedback>Text is required</FormFeedback>
				</Col>
			</FormGroup>
		);
	}
	componentAuthor() {
		const {author, validate} = this.state;

		return(
			<FormGroup row>
				<Label for="input-author" sm={2}>Author:</Label>
				<Col sm={10}>
					<Input 
						type="text" 
						name="author" 
						id="input-author"
						defaultValue={author}
						placeholder="Tarley Lana"
						onChange={e => this.validate('author', e.target.value)}
						valid={validate.author === 'has-success' }
       				invalid={validate.author === 'has-danger' }
					/>
					<FormFeedback valid>OK!</FormFeedback>
     				<FormFeedback>Author is required</FormFeedback>
				</Col>
			</FormGroup>
		);
	}
	hasErros() {
		const {title, body, author, category, validate} = this.state;

		this.validate('title', title);
		this.validate('body', body);
		this.validate('author', author);
		this.validate('category', category);

		const values = Object.values(validate);

		if(values.length !== values.filter(value => value === 'has-success').length)
    		return true;
    	else
    		return false;
	}
	componentAppMensage() {
		const {message} = this.state;

		if(message)
			return (
				<Alert color={message.color} toggle={() => this.clearMessage()}>{message.text}</Alert>
			);
	}
	showMessage(text, type='success') {
		this.setState({
			message: {color: type, text}
		});
	}
	clearMessage() {
		this.setState({
			message: undefined
		});
	}
}

export default FormPost;