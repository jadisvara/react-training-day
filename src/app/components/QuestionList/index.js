import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Question from '../Question';

const QuestionList = ({ data, remove, update, deleteTag, isEng }) => (
    <List style={{ padding: '10px' }}>
        {data.map(question => (
            <Question
                key={question.id}
                data={question}
                remove={remove}
                update={update}
                deleteTag={deleteTag}
                isEng={isEng}
            />
        ))}
    </List>
);
// <ListGroup>
//     {data.map(question => (
//         <Question
//             key={question.id}
//             data={question}
//             remove={remove}
//             update={update}
//             isEng={isEng}
//         />
//     ))}
// </ListGroup>
QuestionList.propTypes = {
    data: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    isEng: PropTypes.bool.isRequired,
};

export default QuestionList;
