import React from 'react';
import PropTypes from 'prop-types';
import {Container,
		Row,
		Col,
		Form,
		FormGroup,
		Label,
		Input,
		Button} from 'reactstrap';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import FormPost from './FormPost';
import VoteScore from '../Common/VoteScore';
import NotFound from '../Common/NotFound';

import {getPostById,
		updatePost,
		deletePost,
		upVotePost,
		downVotePost} from '../../actions/Posts';
import {getAllComments} from '../../actions/Comments';

import {dateFormat} from '../../utils/Helpers';
import ListComment from '../Comment/ListComment';

class EditPost extends FormPost {
	async componentDidMount() {
		await this.props.getPostById();
		await this.props.getAllComments();

		this.setState({
			...this.props.selectedItem
		});
	}
	updatePost(e) {
		e.preventDefault();
    	
		if(super.hasErros())
    		return;

    	const {title, body} = this.state;
		this.props.updatePost(title, body);

		super.showMessage('Post updated successfully!');
	}
	delete() {
		this.props.deletePost();
		this.props.history.push('/');
	}
	render() {
		if(!this.props.selectedItem.id)
			return(<NotFound />);

		const {id, author, voteScore, timestamp, category, comments} = this.props.selectedItem;
		
		return (
			<Container>
				<Form onSubmit={(e) => this.updatePost(e) }>
					{super.componentAppMensage()}

					<h1>Edit Post</h1>

					{super.componentTitle()}
					{super.componentBody()}
					
					<FormGroup row>
						<Label for="input-author" sm={2}>Author:</Label>
						<Col sm={10}>
							<Input 
								disabled
								type="text"
								name="author" 
								id="input-author" 
								defaultValue={author}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="input-timestamp" sm={2}>Create at:</Label>
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
					<FormGroup row>
						<Label for="input-category" sm={2}>Category:</Label>
						<Col sm={10}>
							<Input 
								disabled
								type="text"
								name="category" 
								id="input-category" 
								defaultValue={category}
							/>
						</Col>
					</FormGroup>
					<Row>
						{
							id && (<Label sm={6}>{`Comment count: ${comments.length}`}</Label>)
						}  
						<Col sm={6}> 
			       			{ 
								id && ( <VoteScore
											id={id} 
											score={voteScore} 
											upVote={this.props.upVotePost} 
											downVote={this.props.downVotePost}
										/>)
							}							 
			       		</Col>
		     		</Row>
					<Row>
						<Col md={{ size: 'auto', offset: 2 }}>
							<Button outline color="primary">Submit</Button>{' '}
							<Button outline onClick={e => this.delete()}>Delete</Button>{' '}
							<Link to={`/${category}/${id}/comments/new`}><Button outline>Add Comment</Button></Link>
							<Link to="/"><Button outline>Back</Button></Link>
						</Col>
					</Row>
				</Form>
				<Row>
					<Col>
						{
							id && (
								<ListComment
									category={category}
									postId={id} 
									comments={comments}
								/>)
						}	
					</Col>
				</Row>
			</Container>
		);
	}
}

EditPost.propTypes = {
	postId: PropTypes.string.isRequired
 }

function mapStateToProps({posts, comments}, props) {
	return {
		selectedItem: {
			 ...posts[props.postId],
			 comments: Object.values(comments)
		}
	}
}

function mapDispatchToProps(dispatch, props) {
	return {
   		getPostById: () => dispatch(getPostById(props.postId)),
   		updatePost: (newTitle, newBody) => dispatch(updatePost(props.postId, newTitle, newBody)),
		deletePost: () => dispatch(deletePost(props.postId)),
		upVotePost: () => dispatch(upVotePost(props.postId)),
		downVotePost: () => dispatch(downVotePost(props.postId)),
		getAllComments: () => dispatch(getAllComments(props.postId))
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));