import React, { Component } from 'react';
import { Row, 
         Col,
         Card,
         CardHeader,
         CardText,
         CardBody,
         CardFooter,
         Badge,
         Button} from 'reactstrap';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './ListPost.css';

import {getAllPosts, getPosts} from '../actions';

import {dateFormat} from '../utils/Helpers';

class ListPost extends Component {
   componentDidMount() {
      const {category} = this.props;

      if(!category)
         this.props.getAllPosts();
      else
         this.props.getPosts(category);
   }

   render() {
      const {posts} = this.props;

      return (
         <Row>
            {posts && posts.map(post => (
                  <Col xs='4' key={post.id} className='col-card'>
                     <Card body className='card-post'>
                        <CardHeader>{post.title}</CardHeader>
                        <CardBody>
                           <CardText><small className="text-muted">{`Author: ${post.author}`}</small></CardText>
                           <CardText><small className="text-muted">{`Category: ${post.category}`}</small></CardText>
                           <CardText><small className="text-muted">{`Created at: ${dateFormat(post.timestamp)}`}</small></CardText>
                           <Link to={`/${post.category}/${post.id}`}>
                              <Button outline color="primary">Edit Post</Button>
                           </Link>
                        </CardBody>
                        <CardFooter>Score: <Badge pill color="success">{post.voteScore}</Badge>
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
      posts: posts.values
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllPosts: () => dispatch(getAllPosts()),
      getPosts: (category) => dispatch(getPosts(category))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
