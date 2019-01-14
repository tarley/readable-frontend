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

import './ListPost.css';

import {getAllPosts} from '../actions';

import {dateFormat} from '../utils/Helpers';

class ListPost extends Component {
   componentDidMount() {
      this.props.getAllPosts();
   }

   render() {
      console.log(this.props);
      const {posts, onSelect} = this.props;

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
                           <Button outline color="primary" onClick={() => onSelect(post.id)}>View Text</Button>
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
      getAllPosts: () => dispatch(getAllPosts())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
