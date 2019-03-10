import React from 'react';
import PropTypes from 'prop-types';
import {Form,
		Row,
		Col,
		Button} from 'reactstrap';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import FormComment from './FormComment';

import {createComment} from '../../actions/Comments';

class NewComment extends FormComment {
	async createComment(e) {
		e.preventDefault();
    	
		if(super.hasErros())
    		return;

		const {body, author} = this.state;
		const {postId, dispatch} = this.props;

		await dispatch(createComment(body, author, postId));

		this.props.history.push(this.getOriginURL());
	}
	getOriginURL() {
		return `/${this.props.category}/${this.props.postId}`;
	}
	render() {
		return (
			<Form onSubmit={(e) => this.createComment(e) }>
				{super.componentAppMensage()}

				<h1>New Comment</h1>

				{super.componentBody()}
				{super.componentAuthor()}

				<Row>
					<Col md={{size: 'auto', offset: 2}}>
						<Button outline color="primary">Submit</Button>{' '}
						<Link to={this.getOriginURL()}><Button outline>Cancel</Button></Link>
					</Col>
				</Row>
			</Form>
		);
	}
}

NewComment.propTypes = {
	category: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired
}

export default withRouter(connect()(NewComment));