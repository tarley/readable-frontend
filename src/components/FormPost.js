import React, {Component} from 'react';
import {	Button,
			Form,
			FormGroup,
			Label,
			Input,
			Row,
			Col,
			Badge,
			FormFeedback} from 'reactstrap';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as UUID from 'uuid';
import {IoIosThumbsDown, IoIosThumbsUp} from 'react-icons/io';

import {	dateFormat,
			isNullOrEmpty} from '../utils/Helpers';

import * as PostAPI from '../utils/PostAPI';

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
	async componentDidMount() {
		const {postId} = this.props;
		const editMode = postId ? true : false;

		if(editMode) {
			const post = await PostAPI.getById(postId);

			this.setState({
				...post,
				editMode
			});	
		}
	}
	onChange(key, value) {
		const {validate} = this.state;

    	validate[key] = isNullOrEmpty(value) ? 'has-danger' : 'has-success';
    	
    	this.setState({
    		[key]: value,
    		validate
    	});
	}
	async save(e) {
		e.preventDefault();
    	
		const {id, title, body, author, category, validate} = this.state;

		this.onChange('title', title);
		this.onChange('body', body);
		this.onChange('author', author);
		this.onChange('category', category);

		const values = Object.values(validate);

		if(values.length !== values.filter(value => value === 'has-success').length)
    		return;

    	let res = {};

		if(this.state.editMode) {
			const post = {
				id,
				title,
				body
			}

			console.log(post);
			res = await PostAPI.update(post);
		} else {
			const post = {
				id: UUID.v1(),
				timestamp: Date.now(),
				title,
				body,
				author,
				category
			}
			console.log(post);
			res = await PostAPI.create(post);
		}

		console.log(res);
		this.props.history.push('/');
	}
	async delete() {
		const {id} = this.state;
		const res = await PostAPI.remove(id);
		console.log(res);
		this.props.history.push('/');
	}
	async vote(option) {
		const {id} = this.state;
		const res = await PostAPI.vote(id, option);
		console.log(res);
		this.props.history.push('/');
	}
	render() {
		const {title, body, author, category, voteScore, timestamp, editMode} = this.state;
		const {categories} = this.props;

		return (
			<Form onSubmit={(e) => this.save(e) }>
				<h1>{editMode ? "Edit Post" : "New Post"}</h1>

				<FormGroup row>
					<Label for="input-title" sm={2}>Title:</Label>
					<Col sm={10}>
						<Input 
							type="text" 
							name="title" 
							id="input-title" 
							defaultValue={title}
							placeholder="Udacity is the best place to learn React"
							onChange={e => this.onChange('title', e.target.value)}
							valid={ this.state.validate.title === 'has-success' }
                		invalid={ this.state.validate.title === 'has-danger' }
						/>
						<FormFeedback valid>OK!</FormFeedback>
              		<FormFeedback>Title is required</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="input-body" sm={2}>Text:</Label>
					<Col sm={10}>
						<Input 
							type="textarea" 
							name="body" 
							id="input-body" 
							value={body} 
							placeholder="Everyone says so after all."
							onChange={e => this.onChange('body', e.target.value)}
							valid={ this.state.validate.body === 'has-success' }
                		invalid={ this.state.validate.body === 'has-danger' }
                	/>
                	<FormFeedback valid>OK!</FormFeedback>
              		<FormFeedback>Text is required</FormFeedback>
					</Col>
				</FormGroup>
				
				{
					editMode ? 
						<Row form>
							<Col sm={3}>
								<Label>Author: {author}</Label>
							</Col>
							<Col sm={3}>
								<Label>Create at: {dateFormat(timestamp)}</Label>
							</Col>
							<Col md={3}>
								<Label>Category: {category}</Label>
							</Col>
							<Col md={3}>
								<Label>Vote Score: <Badge pill color="success">{voteScore}</Badge></Label>
							</Col>
						</Row> 
						:
						<div>
							<FormGroup row>
								<Label for="input-author" sm={2}>Author:</Label>
								<Col sm={10}>
									<Input 
										type="text" 
										name="author" 
										id="input-author" 
										placeholder="Tarley Lana"
										onChange={e => this.onChange('author', e.target.value)}
										valid={ this.state.validate.author === 'has-success' }
	                				invalid={ this.state.validate.author === 'has-danger' }
									/>
									<FormFeedback valid>OK!</FormFeedback>
	              				<FormFeedback>Author is required</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="input-category" sm={2}>Category:</Label>
								<Col sm={10}>
									<Input 
										type="select"
										name="category"
										id="input-category"
										onChange={e => this.onChange('category', e.target.value)}
										valid={ this.state.validate.category === 'has-success' }
	                				invalid={ this.state.validate.category === 'has-danger' }
									>
											<option value=""></option>
											{categories && categories.map(category => (
												<option key={category.name}>{category.name}</option>
			                        ))}
	          					</Input>
	          					<FormFeedback valid>OK!</FormFeedback>
	              				<FormFeedback>Category is required</FormFeedback>
								</Col>
							</FormGroup>
						</div>
				}	
				<div>
					<Button outline color="primary">Submit</Button>{' '}
					<Link to="/"><Button outline>Back</Button></Link>{' '}
					{editMode ? <Button outline onClick={e => this.delete()}>Delete</Button> : ""}{' '}
					{editMode ? <Button outline onClick={e => this.vote('upVote')}><IoIosThumbsUp /></Button> : ""}{' '} 
					{editMode ? <Button outline onClick={e => this.vote('downVote')}><IoIosThumbsDown /></Button> : ""}{' '} 
				</div>
			</Form>
		);
	}
}

function mapStateToProps({categories}) {
   return {
      categories: categories.values
   }
}

function mapDispatchToProps(dispatch) {
   return {};

   /*
   return {
      getAllCategories : () => dispatch(getAllCategories()),
      sortPostsByVoteScore: () => dispatch(sortPostsByVoteScore()),
      sortPostsByCreateDate: () => dispatch(sortPostsByCreateDate()),
      getAllPosts: () => dispatch(getAllPosts()),
      getPosts: (category) => dispatch(getPosts(category))
   }
   */
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormPost));