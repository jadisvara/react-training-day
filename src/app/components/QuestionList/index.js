import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';
import Question from '../Question';

const QuestionList = ({ data, remove, update }) => (
    <ListGroup>
        {data.map(question => (
            <Question
                engText={question.eng_text}
                ruText={question.rus_text}
                tags={question.tags}
                key={question.id}
                id={question.id}
                remove={remove}
                update={update}
            />
        ))}
    </ListGroup>
);
QuestionList.propTypes = {
    data: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
};

export default QuestionList;
