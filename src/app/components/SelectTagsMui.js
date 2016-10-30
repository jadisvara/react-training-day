import React, { Component, PropTypes } from 'react';
// import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { GridList } from 'material-ui/GridList';

class SelectTagsMui extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newTagText: '',
      };
    }
    componentWillMount() {
      console.log('SelectTags component mounted');
    }
    componentWillReceiveProps() {
        this.setState({
            newTagText: '',
        });
    }
    onChange(e, tag) {
         this.props.select({ tag: tag.tag, isAdded: e.target.checked, isNew: tag.isNew });
    }
    addNewTag() {
        // TODO: add validation
        if (this.state.newTagText === '') return;
        this.props.select({ tag: this.state.newTagText, isAdded: true, isNew: true });
    }
    handleTextChange(e) {
        this.setState({ newTagText: e.target.value });
    }

    render() {
      return (
          <div>
              <GridList cellHeight={24}>
                  {this.props.tags.map(tag => (
                      <Checkbox
                          key={tag.id}
                          label={tag.tag}
                          checked={tag.selected}
                          onCheck={e => this.onChange(e, tag)}
                      />
                  ))}
                  {this.props.createdTags.map(tag => (
                      <Checkbox
                          key={tag.id}
                          label={tag.tag}
                          checked={tag.selected}
                          onCheck={e => this.onChange(e, tag)}
                      />
                  ))}
              </GridList>
              <TextField
                  hintText="You can enter a new tag here..."
                  floatingLabelText="New Tag"
                  onChange={e => this.handleTextChange(e)}
                  value={this.state.newTagText}
              />
              <FlatButton
                  label="Add"
                  primary
                  onClick={() => this.addNewTag()}
              />
          </div>
      );
  }
}
SelectTagsMui.propTypes = {
  tags: PropTypes.array.isRequired,
  createdTags: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
};
module.exports = SelectTagsMui;
