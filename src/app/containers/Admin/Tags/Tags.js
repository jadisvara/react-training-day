import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Panel, ListGroupItem } from 'react-bootstrap';
// import Button from 'react-bootstrap/lib/Button';
// import Modal from 'react-bootstrap/lib/Modal';
// import QuestionList from '../../../components/QuestionList';
// import AddQuestion from '../../../components/AddQuestion';
import { getTags } from '../../../actions';

class Tags extends Component {
  componentWillMount() {
      console.log('Tags block mount');
      if (this.props.tags.length === 0) {
          this.props.getTags();
      }
  }

  render() {
    const { tags } = this.props;

    return (
        <Panel>
            <ListGroup>
                {tags.map(tag => (
                    <ListGroupItem key={tag.id}>#{tag.id} {tag.tag}</ListGroupItem>
                ))}
            </ListGroup>
        </Panel>
    );
  }
}
Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  getTags: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    tags: state.tags.tags,
  }),
  dispatch => ({
    getTags: () => dispatch(getTags()),
  })
)(Tags);
