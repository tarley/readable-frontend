import React, { Component } from 'react';
import { Container, 
         Row, 
         Col,
         Card,
         CardHeader,
         CardText,
         CardBody,
         CardFooter,
         Badge,
         Button} from 'reactstrap';

import {connect} from 'react-redux';

import './App.css';

import Menu from './Menu';

import { getAllPosts,
         getPosts} from '../actions';

import {dateFormat} from '../utils/Helpers';



class App extends Component {
   componentDidMount() {
      this.props.getAllPosts();
   }

   render() {
      console.log(this.props);
      const {posts} = this.props;

      return (
         <Container>
            <Row>
               <Col xs="12">
                  <Menu />
               </Col>
            </Row>
            <Row>
               <Col xs="12">
                     <Row>
                     {posts && posts.map(post => (
                        
                           <Col xs='4' key={post.id} className='col-card'>
                              <Card body className='card-post'>
                                 <CardHeader>{post.title}</CardHeader>
                                 <CardBody>
                                    <CardText>{post.body}</CardText>
                                    <CardText><small className="text-muted">{`Author: ${post.author}`}</small></CardText>
                                    <CardText><small className="text-muted">{`Category: ${post.category}`}</small></CardText>
                                    <CardText><small className="text-muted">{`Created at: ${dateFormat(post.timestamp)}`}</small></CardText>
                                    <Button color="primary">Details</Button>
                                 </CardBody>
                                 <CardFooter>Score: <Badge pill color="success">{post.voteScore}</Badge>
                                 </CardFooter>
                              </Card>
                           </Col>
                        
                     ))}
                     </Row>
                  
               </Col>
            </Row>
         </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
