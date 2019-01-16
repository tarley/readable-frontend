import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Label,
			Badge,
			Button} from 'reactstrap';
import {	IoIosThumbsDown,
			IoIosThumbsUp} from 'react-icons/io';
import {connect} from 'react-redux';

import {	upVotePost,
			downVotePost} from '../../actions'

class VotePost extends Component {
	render() {
		const {id, voteScore} = this.props;

		const color = voteScore > 0 ? 'success' : voteScore < 0 ? 'danger' : 'warning';

		return(
			<div>
				<Label>Score: <Badge color={color}>{voteScore}</Badge></Label>{'  '}
				<Button type="button" color="success" size="sm" onClick={e => this.props.upVotePost(id)}>
					<IoIosThumbsUp />
				</Button>{'  '}
				<Button type="button" color="danger" size="sm" onClick={e => this.props.downVotePost(id)}>
					<IoIosThumbsDown />
				</Button>
			</div>
		);
	}
}

VotePost.propTypes = {
    id: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		upVotePost: (id) => dispatch(upVotePost(id)),
		downVotePost: (id) => dispatch(downVotePost(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(VotePost);