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
   
   selectOrder = (event) => {
		event.currentTarget.textContent === 'Creation Date' ? 
			this.props.sortPostsByCreateDate() : this.props.sortPostsByVoteScore()
   }
   
   selectCategory = (event) => {
      const selectedItem = event.currentTarget.textContent;

      selectedItem === 'All' ? this.props.getAllPosts() : this.props.getPosts(selectedItem);
   }

   componentDidMount() {
      this.props.getAllCategories();
   }

   render() {
      const {categories} = this.props;

      return (
         <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
               <img src="iconfinder_woman-reading-bg_3430603.svg" alt='Logo' className="img-logo"></img>
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
      );
   }
}

function mapStateToProps({categories}) {
   return {
      categories: categories.values
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllCategories : () => dispatch(getAllCategories()),
      sortPostsByVoteScore: () => dispatch(sortPostsByVoteScore()),
      sortPostsByCreateDate: () => dispatch(sortPostsByCreateDate())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
