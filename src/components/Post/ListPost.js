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

import VotePost from './VotePost';
import './ListPost.css';

import {getAllPosts, getPostsByCategory} from '../../actions';

import {dateFormat} from '../../utils/Helpers';

class ListPost extends Component {
   componentDidMount() {
      console.group('ListPost componentDidMount');
      const {category} = this.props;

      console.log(this.props);
      console.groupEnd();
      if(!category)
         this.props.getAllPosts();
      else
         this.props.getPostsByCategory(category);

   }

   render() {
      console.group('ListPost render');
      console.log(this.props);
      console.groupEnd();

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
                        <CardFooter><VotePost id={post.id} voteScore={post.voteScore} /></CardFooter>
                     </Card>
                  </Col>
               
            ))}
          </Row>
      );
   }
}

function mapStateToProps({posts}) {
   console.group('ListPost mapStateToProps');
   console.log(posts);
   console.groupEnd();

   return {
      posts: Object.values(posts)
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllPosts: () => dispatch(getAllPosts()),
      getPostsByCategory: (category) => dispatch(getPostsByCategory(category))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
