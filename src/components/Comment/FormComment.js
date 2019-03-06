import React from 'react';
import {	FormGroup,
			Label,
			Input,
			Col,
			FormFeedback} from 'reactstrap';

import FormBase from '../Common/FormBase';

class FormComment extends FormBase {
	state = {
		body: '',
		author: '',
		editMode: false,
		validate: {
			body: '',
			author: ''
		}
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
	componentAuthor(disabled=false) {
		const {author, validate} = this.state;

		return(
			<FormGroup row>
				<Label for="input-author" sm={2}>Author:</Label>
				<Col sm={10}>
					{
						disabled ?
							(
								<Input
									disabled
									type="text" 
									name="author" 
									id="input-author"
									defaultValue={author}  
								/>
							) :
							(
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
							)
					}
					
					<FormFeedback valid>OK!</FormFeedback>
     				<FormFeedback>Author is required</FormFeedback>
				</Col>
			</FormGroup>
		);
	}
	hasErros() {
		const {body, author, validate} = this.state;

		this.validate('body', body);
		this.validate('author', author);
		
		const values = Object.values(validate);

		if(values.length !== values.filter(value => value === 'has-success').length)
    		return true;
    	else
    		return false;
	}
}

export default FormComment;