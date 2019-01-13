import React, { Component } from 'react';
import { Container, 
         Row, 
         Col} from 'reactstrap';

import './App.css';

import Menu from './Menu';
import ListPost from './ListPost';

class App extends Component {
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
                  <ListPost />
               </Col>
            </Row>
         </Container>
      );
   }
}

export default App;
