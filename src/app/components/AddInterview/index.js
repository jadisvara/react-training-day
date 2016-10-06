import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ControlLabel, FormControl, Button, FormGroup } from 'react-bootstrap';
import { addQuestion } from '../../actions';

class AddInterview extends Component {
  constructor(props) {
   super(props);
   this.handleChange = this.handleChange.bind(this);
   this.add = this.add.bind(this);
   this.state = {
     interviewName: '',
   };
  }
    componentWillMount() {
      console.log('AddInterview component');
    }

    getValidationState() {
        const length = this.state.interviewName.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length >= 0) return 'error';

        return 'error';
    }
    handleChange(e) {
        this.setState({ interviewName: e.target.value });
    }

    add() {
      console.log('this.state.interviewName', this.state.interviewName);
      console.log('this.props', this.props);
      if (this.state.interviewName.length > 0) {
        // const index = this.props.questions.length + 1;
        //   this.props.addQuestion({
        //       id: index,
        //       text: this.state.value,
        //     });
      }
    }

    render() {
      return (
          <div>
              <FormGroup controlId="addInterview" validationState={this.getValidationState()}>
                  <ControlLabel>New Interview</ControlLabel>
                  <FormControl
                      type="text"
                      value={this.state.interviewName}
                      placeholder="Please enter an Interview name"
                      onChange={this.handleChange}
                  />
                  <Button onClick={this.add}>Add</Button>
              </FormGroup>
          </div>
      );
  }
}
AddInterview.propTypes = {
  interview: PropTypes.array.isRequired,
  addQuestion: PropTypes.func.isRequired,
};
module.exports = connect(
  state => ({
    questions: state.questions.questions,
  }),
  dispatch => ({
    addQuestion: (value) => dispatch(addQuestion(value)),
  })
)(AddInterview);
