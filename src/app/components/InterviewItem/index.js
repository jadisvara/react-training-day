import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';

class InterviewItem extends Component {

    componentWillMount() {
      console.log('InterviewItem');
    }
    render() {
      const { interview } = this.props;

    return (
        <ListItem>
            <TextField
                defaultValue={interview.name}
                onChange={(e) => this.props.onNameChangeNew(e, interview.id)}
                onBlur={(e) => this.props.onNameBlur(e, interview.id)}
            />
            <FlatButton
                label="Delete"
                style={{ float: 'right' }}
                onTouchTap={e => this.props.onDeleteClick(e, interview.id)}
            />
        </ListItem>
    );
  }
}
InterviewItem.propTypes = {
  interview: PropTypes.object.isRequired,
  onNameChangeNew: PropTypes.func.isRequired,
  onNameBlur: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

module.exports = InterviewItem;
