import React from 'react';
import {Row,
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
import VotePost from './VotePost';
import NotFound from '../NotFound';

import {getPostById,
		updatePost,
		deletePost} from '../../actions';
import {dateFormat} from '../../utils/Helpers';

class EditPost extends FormPost {
	async componentDidMount() {
		console.group("EditPost componentDidMount");
		console.log(this.props.postId);

		if(!this.props.selectedItem) {
			console.log('Find post by ID...');
			await this.props.getPostById(this.props.postId);
			console.log('Select post');
		}
		
		console.groupEnd();
		
		this.setState({
			...this.props.selectedItem
		});
	}
	updatePost(e) {
		e.preventDefault();
    	
		if(super.hasErros())
    		return;

    	const {title, body} = this.state;
		this.props.updatePost(this.props.postId, title, body);

		super.showMessage('Post updated successfully!');
	}
	delete() {
		this.props.deletePost(this.props.postId);
		super.showMessage('Post updated successfully!');

		this.props.history.push('/');
	}
	render() {
		if(!this.props.selectedItem)
			return(<NotFound />);

		const {id, author, voteScore, timestamp, category} = this.props.selectedItem;
		console.group('EditPost render');
		console.log(this.props);
		console.groupEnd();

		return (
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
			       		<Col md={{ size: 'auto', offset: 10 }}> 
			       			{ 
			       				id && (<VotePost id={id} voteScore={voteScore} />)
			       			}
			       		</Col>
		     		</Row>
					<Row>
						<Col md={{ size: 'auto', offset: 2 }}>
							<Button outline color="primary">Submit</Button>{' '}
							<Button outline onClick={e => this.delete()}>Delete</Button>{' '}
							<Link to="/"><Button outline>Back</Button></Link>
						</Col>
					</Row>
				</Form>
		);
	}
}

function mapStateToProps({posts}, props) {
	console.group("EditPost mapStateToProps");
	console.log(posts);
	console.groupEnd();
	
	return {
		selectedItem: posts[props.postId]
	}
}

function mapDispatchToProps(dispatch) {
	return {
   		getPostById: (id) => dispatch(getPostById(id)),
   		updatePost: (id, newTitle, newBody) => dispatch(updatePost(id, newTitle, newBody)),
   		deletePost: (id) => dispatch(deletePost(id))
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));