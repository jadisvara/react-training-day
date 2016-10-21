import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Question from '../../../components/Question';

import * as InterviewsActions from '../../../actions/InterviewActions';
import * as InterviewQuestionsActions from '../../../actions/InterviewQuestionsActions';

class InterviewDetail extends Component {
    componentWillMount() {
      console.log('this.props', this.props.params.id);
      this.props.getInterview(this.props.params.id);
      this.props.getInterviewQuestions(this.props.params.id);
    }

    render() {
      const { interview } = this.props;

      return (
          <div>
              <TextField
                  style={{ width: '80%', padding: '0 40px' }}
                  fullWidth
                  name={interview.name}
                  value={interview.name}
              />
              { this.props.interviewQuestions.length > 0 &&
                this.props.interviewQuestions.map(question => (
                    <Question
                        key={question.id}
                        data={question}
                        // remove={remove}
                        // update={update}
                        // deleteTag={deleteTag}
                        // isEng={isEng}
                    />
                ))
              }


          </div>
      );
  }
}
InterviewDetail.propTypes = {
  interview: PropTypes.object.isRequired,
  interviewQuestions: PropTypes.array.isRequired,
  removeInterview: PropTypes.func.isRequired,
  getInterview: PropTypes.func.isRequired,
  updateInterview: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  getInterviewQuestions: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    interview: state.interviewState.interview,
    interviewQuestions: state.interviewQuestionsState.interviewQuestions,
  }),
  dispatch => ({
    removeInterview: id => dispatch(InterviewsActions.removeInterview(id)),
    getInterview: id => dispatch(InterviewsActions.getInterview(id)),
    updateInterview: (data, callback) =>
        dispatch(InterviewsActions.updateInterview(data, callback)),
    getInterviewQuestions: id => dispatch(InterviewQuestionsActions.getInterviewQuestions(id)),
  })
)(InterviewDetail);
