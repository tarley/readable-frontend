import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Label,
		Badge,
		Button} from 'reactstrap';
import {IoIosThumbsDown,
		IoIosThumbsUp} from 'react-icons/io';

class VoteScore extends PureComponent{
	render() {
		const {score} = this.props;

		const color = score > 0 ? 'success' : score < 0 ? 'danger' : 'warning';

		return(
			<div>
				<Label>Score: <Badge color={color}>{score}</Badge></Label>{'  '}
				<Button type="button" outline color="success" size="sm" onClick={e => this.props.upVote()}>
					<IoIosThumbsUp />
				</Button>{'  '}
				<Button type="button" outline color="danger" size="sm" onClick={e => this.props.downVote()}>
					<IoIosThumbsDown />
				</Button>
			</div>
		);
	}
}

VoteScore.propTypes = {
    score: PropTypes.number.isRequired,
	upVote: PropTypes.func.isRequired,
	downVote: PropTypes.func.isRequired
}

export default VoteScore;