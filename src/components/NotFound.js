import React from 'react';
import {Link} from 'react-router-dom';
import {Row,
		Col,
		Button} from 'reactstrap';

const NotFound = () =>
	<div>
		<h3>Ops! 404 page not found.</h3>
		<Row>
			<Col md={{ size: 'auto'}}>
				<Link to="/"><Button outline>Home</Button></Link>
			</Col>
		</Row>
	</div>

export default NotFound;