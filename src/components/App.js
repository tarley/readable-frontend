import React, { Component } from 'react';
import { Container, 
         Row, 
         Col} from 'reactstrap';
import {withRouter} from 'react-router';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Menu from './Menu';
import ListPost from './Post/ListPost';
import NewPost from './Post/NewPost';
import EditPost from './Post/EditPost';

class App extends Component {
   state = {
      selectedPostId: null
   }
   render() {
      return (
         <Container>
            <Row>
               <Col xs="12">
                  <Menu />
               </Col>
            </Row>
            <Row>
               <Col xs="12">
                  <Switch>
                     <Route path='/posts/new' render={() => (
                        <NewPost /> 
                     )} />

                     <Route path='/:category/:post_id' render={({match}) => (
                        <EditPost postId={match.params.post_id} /> 
                     )} />

                     <Route path='/:category?' render={({match}) => (
                        <ListPost category={match.params.category}/>
                     )}/>
                  </Switch>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default withRouter(App);
