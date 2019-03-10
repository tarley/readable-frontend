import React from 'react';
import {Form,
		FormGroup,
		Label,
		Input,
		FormFeedback,
		Row,
		Col,
		Button} from 'reactstrap';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import FormPost from './FormPost';

import {createPost} from '../../actions/Posts';

class NewPost extends FormPost {
	async createPost(e) {
		e.preventDefault();
    	
		if(super.hasErros())
    		return;

    	const {title, body, author, category} = this.state;

		const action = await this.props.createPost(title, body, author, category);	

		this.props.history.push(`/${category}/${action.post.id}`);
	}
	render() {
		const {validate} = this.state;
		
		const options = [{name: ""}, ...this.props.categories];

		return (
			<Form onSubmit={(e) => this.createPost(e) }>
				{super.componentAppMensage()}

				<h1>New Post</h1>

				{super.componentTitle()}
				{super.componentBody()}
				{super.componentAuthor()}

				<FormGroup row>
					<Label for="input-category" sm={2}>Category:</Label>
					<Col sm={10}>
						<Input 
							type="select"
							name="category"
							id="input-category"
							onChange={e => this.validate('category', e.target.value)}
							valid={validate.category === 'has-success'}
          				invalid={validate.category === 'has-danger'}
						>
							{
								options.map(option => (
									<option key={option.name}>{option.name}</option>
								))
							}
    					</Input>
    					<FormFeedback valid>OK!</FormFeedback>
        				<FormFeedback>Category is required</FormFeedback>
					</Col>
				</FormGroup>
				<Row>
					<Col md={{size: 'auto', offset: 2}}>
						<Button outline color="primary">Submit</Button>{' '}
						<Link to="/"><Button outline>Cancel</Button></Link>
					</Col>
				</Row>
			</Form>
		);
	}
}

function mapStateToProps({categories}) {
   return {
      categories: Object.values(categories)
   }
}

function mapDispatchToProps(dispatch) {
   return {
   	createPost: (title, body, author, category) => 
   		dispatch(createPost(title, body, author, category))
   };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));