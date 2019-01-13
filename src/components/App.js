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
         Button,
         Navbar,
         NavbarBrand,
         Collapse,
         Nav,
         NavItem,
         NavLink,
         UncontrolledDropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem} from 'reactstrap';

import {connect} from 'react-redux';

import './App.css';

import Menu from './Menu';

import { getAllCategories,
         getAllPosts,
         getPosts} from '../actions';

import * as CategoryAPI from '../utils/CategoryAPI';
import * as PostAPI from '../utils/PostAPI';
import {dateFormat} from '../utils/Helpers';



class App extends Component {
   state = {
      categories: [],
      posts: []
   }
   
   sortByVoteScore = (a, b) => b.voteScore - a.voteScore;
   sortByCreatedDate = (a, b) => b.timestamp - a.timestamp;

   selectOrder = (event) => 
      this.setState({
         sortPosts: event.currentTarget.textContent === 'Creation Date' ? 
            this.sortByCreatedDate : this.sortByVoteScore
      });
   
   selectCategory = (event) => {
      const selectedItem = event.currentTarget.textContent;

      selectedItem === 'All' ? this.props.getAllPosts() : this.props.getPosts(selectedItem);
   }

   componentDidMount() {
      //CategoryAPI.getAll().then(categories => this.setState({categories}));
      this.props.getAllCategories();
      this.props.getAllPosts();

      /*
      PostAPI.getAll().then(posts => this.setState({
         posts,
         sortPosts: this.sortByVoteScore
      }));
      */

   }

   render() {
      console.log(this.props);
      const {categories, posts} = this.props;

      return (
         <Container>
            <Row>
               <Col xs="12">
                  <Navbar color="light" light expand="md">
                     <NavbarBrand href="/">
                        <img src="iconfinder_woman-reading-bg_3430603.svg" className="img-logo"></img>
                        Readable
                     </NavbarBrand>
                     <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                           <NavItem>
                              <NavLink href="/components/">Add Post</NavLink>
                           </NavItem>
                           <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Categories</DropdownToggle>
                              <DropdownMenu right>
                                 <DropdownItem onClick={this.selectCategory}>All</DropdownItem>
                                 {categories && categories.map(category => (
                                    <DropdownItem onClick={this.selectCategory} key={category.name}>{category.name}</DropdownItem>
                                 ))}
                              </DropdownMenu>
                           </UncontrolledDropdown>
                           <UncontrolledDropdown nav inNavbar>
                              <DropdownToggle nav caret>Sort Posts by</DropdownToggle>
                              <DropdownMenu right>
                                 <DropdownItem onClick={this.selectOrder}>Vote Score</DropdownItem>
                                 <DropdownItem onClick={this.selectOrder}>Creation Date</DropdownItem>
                              </DropdownMenu>
                           </UncontrolledDropdown>
                        </Nav>
                     </Collapse>
                  </Navbar>
               </Col>
            </Row>
            <Row>
               <Col xs="12">
                     <Row>
                     {posts && posts.sort(this.state.sortPosts).map(post => (
                        
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

function mapStateToProps({categories, posts}) {
   return {
      categories: categories.values,
      posts: posts.values
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllCategories : () => dispatch(getAllCategories()),
      getAllPosts: () => dispatch(getAllPosts()),
      getPosts: (category) => dispatch(getPosts(category))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
