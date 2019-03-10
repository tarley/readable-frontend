import React from 'react';
import PropTypes from 'prop-types';
import {Form,
		FormGroup,
		Label,
		Input,
		Row,
		Col,
		Button} from 'reactstrap';

import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import FormComment from './FormComment';
import NotFound from '../Common/NotFound';
import VoteScore from '../Common/VoteScore';

import {getCommentById,
		updateComment,
		deleteComment,
		upVoteComment,
		downVoteComment} from '../../actions/Comments';

import {dateFormat} from '../../utils/Helpers';

class EditComment extends FormComment {
	
	async componentDidMount() {
		await this.props.getCommentById();
		
		this.setState({
			...this.props.selectedItem
		});
	}

	async updateComment(e) {
		e.preventDefault();
    	
		if(super.hasErros())
    		return;
		
		await this.props.updateComment(this.state.body);

		super.showMessage('Comment updated successfully!');
	}
	delete() {
		this.props.deleteComment();
		this.props.history.push(this.getOriginURL());
	}
	getOriginURL() {
		return `/${this.props.category}/${this.props.postId}`;
	}

	render() {
		if(!this.props.selectedItem.id)
			return(<NotFound />);

		const {id, voteScore, timestamp} = this.props.selectedItem;

		return (
			<Form onSubmit={(e) => this.updateComment(e) }>
				{super.componentAppMensage()}

				<h1>Edit Comment</h1>

				{super.componentBody()}
				{super.componentAuthor(true)}

				<FormGroup row>
					<Label for="input-timestamp" sm={2}>Update at:</Label>
					<Col sm={10}>
						<Input 
							disabled
							type="text"
							name="timestamp" 
							id="input-timestamp" 
							defaultValue={dateFormat(timestamp)}
						/>
					</Col>
				</FormGroup>

				<Row>
					<Col sm={6}> 
						{ 
							id && ( <VoteScore
										id={id} 
										score={voteScore} 
										upVote={this.props.upVoteComment} 
										downVote={this.props.downVoteComment}
									/>)
						}							 
					</Col>
				</Row>
				<Row>
					<Col md={{size: 'auto', offset: 2}}>
						<Button outline color="primary">Submit</Button>{' '}
						<Button outline onClick={e => this.delete()}>Delete</Button>{' '}
						<Link to={this.getOriginURL()}><Button outline>Back</Button></Link>
					</Col>
				</Row>
			</Form>
		);
	}
}

EditComment.propTypes = {
	category: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	commentId: PropTypes.string.isRequired
}

function mapStateToProps({comments}, props) {
	return {
		selectedItem: {
			 ...comments[props.commentId]
		}
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
		getCommentById: () => dispatch(getCommentById(props.commentId)),
		updateComment: (body) => dispatch(updateComment(props.commentId, body)),
		deleteComment: () => dispatch(deleteComment(props.commentId)),
		upVoteComment: () => dispatch(upVoteComment(props.commentId)),
		downVoteComment: () => dispatch(downVoteComment(props.commentId))
	}
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment));