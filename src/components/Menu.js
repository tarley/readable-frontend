import React, { Component } from 'react';
import { Navbar,
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

import './Menu.css';

import { getAllCategories,
			sortPostsByVoteScore,
			sortPostsByCreateDate} from '../actions';

class Menu extends Component {
   componentDidMount() {
      this.props.getAllCategories();
   }
   render() {
      const categoryMenuItens = [
      	{name: 'All', path: ''},
      	...this.props.categories
      ];

      return (
         <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
               <img src="/iconfinder_woman-reading-bg_3430603.svg" alt='Logo' className="mr-3 img-logo"></img>
               Readable
            </NavbarBrand>
            <Collapse navbar>
               <Nav className="ml-auto" navbar>
                  <NavItem>
                  	<NavLink href="/posts/new">Add Post</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>Categories</DropdownToggle>
                     <DropdownMenu right>
                     {
                     	categoryMenuItens.map(item => (
                     		<DropdownItem key={item.path} href={`/${item.path}`}>{item.name}</DropdownItem>
                  		))
                     }
                     </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>Sort Posts by</DropdownToggle>
                     <DropdownMenu right>
                     	<DropdownItem onClick={e => this.props.sortPostsByVoteScore()}>Vote Score</DropdownItem>
                     	<DropdownItem onClick={e => this.props.sortPostsByCreateDate()}>Creation Date</DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </Nav>
            </Collapse>
         </Navbar>
      );
   }
}

function mapStateToProps({categories}) {
   return {
      categories: Object.values(categories)
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllCategories : () => dispatch(getAllCategories()),
      sortPostsByVoteScore : () => dispatch(sortPostsByVoteScore()),
      sortPostsByCreateDate: () => dispatch(sortPostsByCreateDate())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
