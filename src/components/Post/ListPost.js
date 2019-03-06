import React, { Component } from 'react';
import { Row, 
         Col,
         Card,
         CardHeader,
         CardText,
         CardBody,
         CardFooter,
         Button} from 'reactstrap';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import VoteScore from '../Common/VoteScore';

import { getAllPosts,
         getPostsByCategory,
         upVotePost,
         downVotePost} from '../../actions';

import {dateFormat} from '../../utils/Helpers';

class ListPost extends Component {
   componentDidMount() {
      const {category} = this.props;

      if(!category)
         this.props.getAllPosts();
      else
         this.props.getPostsByCategory(category);

   }

   render() {
      const {posts} = this.props;

      return (
         <Row>
            {posts && posts.map(post => (
                  <Col xs='4' key={post.id} className='p-1'>
                     <Card body className='h-100'>
                        <CardHeader>{post.title}</CardHeader>
                        <CardBody>
                           <CardText><small className="text-muted">{`Author: ${post.author}`}</small></CardText>
                           <CardText><small className="text-muted">{`Category: ${post.category}`}</small></CardText>
                           <CardText><small className="text-muted">{`Created at: ${dateFormat(post.timestamp)}`}</small></CardText>
                           <CardText><small className="text-muted">{`Comment count: ${post.commentCount}`}</small></CardText>
                           <Link to={`/${post.category}/${post.id}`}>
                              <Button outline color="primary">Edit Post</Button>
                           </Link>
                        </CardBody>
                        <CardFooter>
                           <VoteScore 
                              score={post.voteScore} 
                              upVote={() => this.props.upVotePost(post.id)} 
										downVote={() => this.props.downVotePost(post.id)}
                           />
                        </CardFooter>
                     </Card>
                  </Col>
               
            ))}
          </Row>
      );
   }
}

function mapStateToProps({posts}) {
   return {
      posts: Object.values(posts)
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllPosts: () => dispatch(getAllPosts()),
      getPostsByCategory: (category) => dispatch(getPostsByCategory(category)),
		upVotePost: (id) => dispatch(upVotePost(id)),
		downVotePost: (id) => dispatch(downVotePost(id))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
