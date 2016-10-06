import React, { PropTypes, Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Question from '../Question';

class QuestionList extends Component {
    componentWillMount() {
      console.log('Question list', this.props.data);
    }
    render() {
      return (
          <ListGroup>
              {this.props.data.map(question => (
                  <Question
                      engText={question.eng_text}
                      ruText={question.rus_text}
                      tags={question.tags}
                      key={question.id}
                      id={question.id}
                      remove={this.props.remove}
                      update={this.props.update}
                  />
              ))}
          </ListGroup>
      );
  }
}

QuestionList.propTypes = {
    data: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
};

module.exports = QuestionList;
