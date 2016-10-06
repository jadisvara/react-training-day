import React, { PropTypes, Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Question from '../Question';

class Questions extends Component {
    componentWillMount() {
      console.log('Question list');
    }
    render() {
      const { questions } = this.props.data;

      return (
          <ListGroup>
              {questions.map(question => (
                  <Question txt={question.text} key={question.id}/>
              ))}
          </ListGroup>
      );
  }
}
Questions.propTypes = {
  data: PropTypes.array.isRequired,
};

module.exports = Questions;
