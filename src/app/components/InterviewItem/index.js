import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';

class InterviewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: this.props.interview.name || '',
          showSaveCancelBtn: false,
        };
    }
    componentWillMount() {
      console.log('InterviewItem');
    }
    onSaveClick() {
      // TODO: add validation
      if (this.state.name === '') return;
      this.props.onSaveClick({
        id: this.props.interview.id,
        name: this.state.name,
      });
      this.setState({
        showSaveCancelBtn: false,
      });
    }
    onCancelClick() {
      this.setState({
        name: this.props.interview.name,
        showSaveCancelBtn: false,
      });
    }
    onNameChange(e) {
      this.setState({
        name: e.target.value,
        showSaveCancelBtn: true,
      });
    }

    render() {
      const { interview } = this.props;

      return (
          <ListItem>
              <TextField
                  style={{ width: '50%' }}
                  fullWidth
                  name={interview.name}
                  value={this.state.name}
                  onChange={(e) => this.onNameChange(e)}
              />
              <FlatButton
                  label="Delete"
                  style={{ float: 'right' }}
                  onTouchTap={e => this.props.onDeleteClick(e, interview.id)}
              />
              {this.state.showSaveCancelBtn &&
                  <FlatButton
                      label="Cancel"
                      style={{ float: 'right' }}
                      onTouchTap={() => this.onCancelClick()}
                  />
              }
              {this.state.showSaveCancelBtn &&
                  <FlatButton
                      label="Save"
                      style={{ float: 'right' }}
                      onTouchTap={() => this.onSaveClick()}
                  />
              }
          </ListItem>
      );
  }
}
InterviewItem.propTypes = {
  interview: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

module.exports = InterviewItem;
