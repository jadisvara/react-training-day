import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import * as InterviewsActions from '../../../actions/InterviewActions';

class InterviewDetail extends Component {
    componentWillMount() {
      console.log('this.props', this.props.params.id);
      this.props.getInterview(this.props.params.id);
    }

    render() {
      const { interview } = this.props;

      return (
          <div>
              <TextField
                  style={{ width: '80%', padding: '40px' }}
                  fullWidth
                  name={interview.name}
                  value={interview.name}
              />
          </div>
      );
  }
}
InterviewDetail.propTypes = {
  interview: PropTypes.object.isRequired,
  removeInterview: PropTypes.func.isRequired,
  getInterview: PropTypes.func.isRequired,
  updateInterview: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

module.exports = connect(
  state => ({
    interview: state.interviewState.interview,
  }),
  dispatch => ({
    removeInterview: (id) => dispatch(InterviewsActions.removeInterview(id)),
    getInterview: (id) => dispatch(InterviewsActions.getInterview(id)),
    updateInterview: (data, callback) =>
        dispatch(InterviewsActions.updateInterview(data, callback)),
  })
)(InterviewDetail);
