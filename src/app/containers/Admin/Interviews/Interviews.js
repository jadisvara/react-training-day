import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { Button,
   FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import * as InterviewsActions from '../../../actions/InterviewActions';
import InterviewItem from '../../../components/InterviewItem';

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
    onAddInterviewClick() {
        this.setState({ showAddInterviewFrom: false });
        this.props.createInterview({
          name: this.state.name,
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
    onNameChangeNew(e, id) {
      console.log('onNameChangeNew', e, id);
    }
    onNameBlur(e, id) {
      // TODO: Save interview name on blur
        console.log('onNameBlur', e, id);
    }
    getValidationState() {

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
          <div header="Interviews" bsStyle="primary">
              <Button
                  bsStyle="primary"
                  onClick={() =>
                    this.setState({ showAddInterviewFrom: !this.state.showAddInterviewFrom })}
              >
                  Add Interview
              </Button>
              {this.state.showAddInterviewFrom &&
                  <div>
                      <FormGroup
                          controlId="questionField"
                          validationState={this.getValidationState()}
                      >
                          <ControlLabel>New Interview:</ControlLabel>
                          <FormControl
                              type="text"
                              value={this.state.name}
                              placeholder="Please enter an interview name..."
                              onChange={e => this.onNameChange(e)}
                          />
                          <div>
                              <Button
                                  bsStyle="success"
                                  onClick={() => this.onAddInterviewClick()}
                              >
                                Add
                              </Button>
                              <Button
                                  onClick={() => this.onCancelClick()}
                              >
                                Cancel
                              </Button>
                          </div>
                      </FormGroup>
                  </div>
              }
              <h3>Interviews:</h3>
              <List style={{ padding: '10px' }}>
                  {this.props.interviews.map(interview => (
                      <InterviewItem
                          key={interview.id}
                          interview={interview}
                          onNameChangeNew={(e, id) => this.onNameChangeNew(e, id)}
                          onNameBlur={(e, id) => this.onNameBlur(e, id)}
                          onDeleteClick={(e, id) => this.onDeleteClick(e, id)}
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
};

module.exports = connect(
  state => ({
    interviews: state.interviewState.interviews,
  }),
  dispatch => ({
    getInterviews: () => dispatch(InterviewsActions.getInterviews()),
    createInterview: (data) => dispatch(InterviewsActions.saveInterview(data)),
    removeInterview: (id) => dispatch(InterviewsActions.removeInterview(id)),
  })
)(Interviews);
