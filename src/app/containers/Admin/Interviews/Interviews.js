import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';

import * as InterviewsActions from '../../../actions/InterviewActions';
import InterviewItem from '../../../components/InterviewItem';
import AddBtn from '../../../components/AddBtn';
import AddInterview from '../../../components/AddInterview';

class Interviews extends Component {
    constructor(props) {
        super(props);
        this.openAddInterview = this.openAddInterview.bind(this);
        this.state = {
          name: '',
          showAddInterviewFrom: false,
        };
    }
    componentWillMount() {
      this.props.getInterviews();
    }
    onAddInterviewClick(name) {
        if (name === '') return; // TODO: add validation inside AddInterview component
        this.setState({ showAddInterviewFrom: false });
        this.props.createInterview({
          name,
        });
    }
    onCancelClick() {
        this.setState({ showAddInterviewFrom: false });
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onDeleteClick(e, id) {
        this.props.removeInterview(id);
    }
    onUpdate(data) {
        this.props.updateInterview(data, this.props.getInterviews);
    }
    onNameChangeNew(e, id) {
      console.log('onNameChangeNew', e, id);
    }
    onNameBlur(e, id) {
      // TODO: Save interview name on blur
        console.log('onNameBlur', e, id);
    }
    getValidationState() {
        // TODO: name should not be empty

    }
    openAddInterview() {
      this.setState({
        showAddInterviewFrom: true,
        name: '',
       });
    }

    render() {
      // onClick={ ()=> this.setState({ showAddInterviewFrom: !this.state.showAddInterviewFrom })}
      // const { interviews } = this.props;
      return (
          <div>
              <AddBtn
                  onClick={() =>
                    this.setState({
                      showAddInterviewFrom: !this.state.showAddInterviewFrom,
                    })}
              />
              {this.state.showAddInterviewFrom &&
                  <AddInterview
                      add={name => this.onAddInterviewClick(name)}
                      cancel={() => this.onCancelClick()}
                  />
              }
              <List style={{ padding: '20px 10px 10px 10px' }}>
                  {this.props.interviews.map(interview => (
                      <InterviewItem
                          key={interview.id}
                          interview={interview}
                          onDeleteClick={(e, id) => this.onDeleteClick(e, id)}
                          onSaveClick={data => this.onUpdate(data)}
                      />
                  ))}
              </List>
          </div>
      );
  }
}
Interviews.propTypes = {
  interviews: PropTypes.array.isRequired,
  getInterviews: PropTypes.func.isRequired,
  createInterview: PropTypes.func.isRequired,
  removeInterview: PropTypes.func.isRequired,
  getInterview: PropTypes.func.isRequired,
  updateInterview: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    interviews: state.interviewState.interviews,
  }),
  dispatch => ({
    getInterviews: () => dispatch(InterviewsActions.getInterviews()),
    createInterview: data => dispatch(InterviewsActions.saveInterview(data)),
    removeInterview: id => dispatch(InterviewsActions.removeInterview(id)),
    getInterview: id => dispatch(InterviewsActions.getInterview(id)),
    updateInterview: (data, callback) =>
        dispatch(InterviewsActions.updateInterview(data, callback)),
  })
)(Interviews);
