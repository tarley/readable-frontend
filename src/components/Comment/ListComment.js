import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiTrash2,
         FiEdit} from 'react-icons/fi';
import { Table,
         Button} from 'reactstrap';

import {Link} from 'react-router-dom';         
import {connect} from 'react-redux';

import VoteScore from '../Common/VoteScore';

import { deleteComment,
         upVoteComment,
         downVoteComment} from '../../actions/Comments';

import {dateFormat} from '../../utils/Helpers';

class ListComment extends Component {
   render() {
      const {category, postId, comments} = this.props;

      return (
         <Table striped className="mt-3">
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Comment</th>
                  <th>Author</th>
                  <th>Vote Score</th>
                  <th></th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {
                  comments && comments.map(comment => (
                     <tr key={comment.id}>
                        <th scope="row">{dateFormat(comment.timestamp)}</th>
                        <td>{comment.body}</td>
                        <td>{comment.author}</td>
                        <td>
                           {
                              comment && (
                                 <VoteScore
                                    score={comment.voteScore} 
                                    upVote={() => this.props.upVoteComment(comment.id)} 
                                    downVote={() => this.props.downVoteComment(comment.id)}
									      />
                              )
                           }
                        </td>
                        <td>
                           <Link to={`/${category}/${postId}/comments/${comment.id}`}>
                              <Button type="button" outline color="info" size="md">
                                 <FiEdit/>
                              </Button>
                           </Link>
                        </td>
                        <td>
                           <Button type="button" outline color="danger" size="md" onClick={e => this.props.deleteComment(comment.id)}>
                              <FiTrash2/>
                           </Button>
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </Table>
      );
   }
}

ListComment.propTypes = {
   category: PropTypes.string.isRequired,
   postId: PropTypes.string.isRequired,
   comments: PropTypes.array.isRequired
}


function mapDispatchToProps(dispatch) {
   return {
      deleteComment: (id) => dispatch(deleteComment(id)),
      upVoteComment: (id) => dispatch(upVoteComment(id)),
      downVoteComment: (id) => dispatch(downVoteComment(id))
   }
}

export default connect(null, mapDispatchToProps)(ListComment);
