import React, { PropTypes, Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { removeQuestion } from '../../actions';

class Question extends Component {
    componentWillMount() {
      console.log('Question');
    }

    onDelete(e, id) {
        this.props.remove(id);
    }

    onEdit(e, id) {
        this.props.update(id);
    }
//
    render() {
      return (
          <ListGroupItem>
              #{this.props.id} {this.props.engText} / {this.props.ruText}
              {this.props.tags
                ? this.props.tags.map(tag => (
                    <Button
                        bsSize="xsmall"
                        key={tag.id}
                    >
                        '#'{tag.tag}
                    </Button>
              ))
                : ''
              }
              <Button
                  bsStyle="danger"
                  bsSize="xsmall"
                  style={{ float: 'right' }}
                  onClick={e => this.onDelete(e, this.props.id)}
              >
                Delete
              </Button>
              <Button
                  bsStyle="warning"
                  bsSize="xsmall"
                  style={{ float: 'right', marginRight: '10px' }}
                  onClick={e => this.onEdit(e, this.props.id)}
              >
                Edit
              </Button>
          </ListGroupItem>
      );
    }
}
Question.propTypes = {
  engText: PropTypes.string.isRequired,
  ruText: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

// module.exports = connect(
//   state => ({
//     questions: state.questions.questions,
//   }),
//   dispatch => ({
//     removeQuestion: (id) => dispatch(removeQuestion(id)),
//   })
// )(Question);
module.exports = Question;
