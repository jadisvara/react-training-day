import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Panel, Button, ButtonToolbar,
   FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import * as InterviewsActions from '../../../actions/InterviewActions';

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
          <Panel header="Interviews" bsStyle="primary">
              <Button
                  bsStyle="primary"
                  onClick={() =>
                    this.setState({ showAddInterviewFrom: !this.state.showAddInterviewFrom })}
              >
                  Add Interview
              </Button>
              {this.state.showAddInterviewFrom &&
                  <Panel>
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
                          <ButtonToolbar>
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
                          </ButtonToolbar>
                      </FormGroup>
                  </Panel>
              }
              <h3>Interviews:</h3>
              <ListGroup>
                      {this.props.interviews.map(interview => (
                          <ListGroupItem key={interview.id}>
                              {interview.name}

                              <Button
                                  bsStyle="danger"
                                  bsSize="xsmall"
                                  style={{ float: 'right' }}
                                  onClick={e => this.onDeleteClick(e, interview.id)}
                              >
                                  Delete
                              </Button>
                          </ListGroupItem>
                      ))}
              </ListGroup>
          </Panel>
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
