import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';

class AddInterview extends Component {
    constructor(props) {
       super(props);
       this.state = {
         interviewName: '',
       };
    }
    componentWillMount() {
      console.log('AddInterview component');
    }
    onNameChange(e) {
      this.setState({ interviewName: e.target.value });
    }
    onNameBlur(e, id) {
      // TODO: Save interview name on blur
        console.log('onNameBlur', e, id);
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
      return (
          <div>
              <List style={{ padding: '10px' }}>
                  <ListItem>
                      <TextField
                          name="new-interview"
                          hintText="Please enter an interview name..."
                          floatingLabelText="New Interview"
                          fullWidth
                          onChange={e => this.onNameChange(e)}
                          onBlur={() => this.props.add(this.state.interviewName)}
                          value={this.state.interviewName}
                      />
                      <RaisedButton
                          label="Cancel"
                          style={{ float: 'right' }}
                          onTouchTap={() => this.props.cancel()}
                      />
                      <RaisedButton
                          label="Add"
                          primary
                          style={{ float: 'right', marginRight: '10px' }}
                          onTouchTap={() => this.props.add(this.state.interviewName)}
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
