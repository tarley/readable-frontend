import React, { Component } from 'react';
import { Container, 
         Row, 
         Col} from 'reactstrap';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';

import './App.css';

import Menu from './Menu';
import ListPost from './ListPost';
import FormPost from './FormPost';

class App extends Component {
   state = {
      selectedPostId: null
   }

   onSelectPost = (selectedPostId) => {
      this.setState({
         selectedPostId
      });

      this.props.history.push('/post');
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
                  <Route path='/:category?' render={({match}) => (
                     <ListPost category={match.params.category}/>
                  )}/>

                  <Route exact path='/post' render={() => (
                     <FormPost postId={this.state.selectedPostId} /> 
                  )} />
               </Col>
            </Row>
         </Container>
      );
   }
}

export default withRouter(App);
