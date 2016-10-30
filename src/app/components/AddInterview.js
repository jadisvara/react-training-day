import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';

class AddInterview extends Component {
    constructor(props) {
       super(props);
       this.onNameChange = e => this.setState({ interviewName: e.target.value });
       this.onAddClick = () => this.props.add(this.state.interviewName);
       this.state = {
         interviewName: '',
       };
    }
    componentWillMount() {
      console.log('AddInterview component');
    }
    getValidationState() {
      // TODO: make it real
      const length = this.state.interviewName.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length >= 0) return 'error';
      return 'error';
    }

    render() {
      console.log('render AddInterview');
      return (
          <div>
              <List style={{ padding: '10px' }}>
                  <ListItem>
                      <TextField
                          name="new-interview"
                          hintText="Please enter an interview name..."
                          floatingLabelText="New Interview"
                          fullWidth
                          onChange={this.onNameChange}
                          value={this.state.interviewName}
                      />
                      <RaisedButton
                          label="Cancel"
                          style={{ float: 'right' }}
                          onTouchTap={this.props.cancel}
                      />
                      <RaisedButton
                          label="Add"
                          primary
                          style={{ float: 'right', marginRight: '10px' }}
                          onTouchTap={this.onAddClick}
                      />
                  </ListItem>
              </List>
          </div>
      );
  }
}
AddInterview.propTypes = {
  add: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
module.exports = AddInterview;
