import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class Menu extends Component {

	render() {
		const {itens} = this.props;

		return (
			<div>
				<p>Categories</p>
				<Nav vertical>
					{itens.map(item => (
						<NavItem key={item.name}>
							<NavLink href={item.path}>{item.name}</NavLink>
						</NavItem>
					))}
				</Nav>
			</div>
		);
	}
}

export default Menu;