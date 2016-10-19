import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
// import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectTagsMui from '../SelectTagsMui';

class AddQuestionMui extends Component {
    constructor(props) {
       super(props);

       this.handleEngTextChange = this.handleEngTextChange.bind(this);
       this.handleRuTextChange = this.handleRuTextChange.bind(this);
       this.add = this.add.bind(this);
       this.update = this.update.bind(this);
       this.selectTag = this.selectTag.bind(this);

       const question = this.props.questionToEdit || null;
       this.state = {
         tags: [],
         createdTags: [],
         engText: question ? question.eng_text : '',
         ruText: question ? question.rus_text : '',
         selectedLevel: 1,
       };
    }
    componentWillMount() {
      console.log('AddQuestionMui component');
    }
    componentWillReceiveProps(newProps) {
      console.log('AddQuestionMui  newProps', newProps.tags);

      const question = newProps.questionToEdit || null;
      const preselectedTags = question ? question.tags.map(t => t.tag) : [];
      // set tags
      const localTags = newProps.tags.concat();
      localTags.forEach((t) => { t.selected = preselectedTags.includes(t.tag); });

      this.setState({
        tags: localTags,
        engText: question ? question.eng_text : '',
        ruText: question ? question.rus_text : '',
        createdTags: [],
      });
    }
    getValidationState() {
        const length = this.state.engText.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length >= 0) return 'error';
        return 'error';
    }
    handleEngTextChange(e) {
        this.setState({ engText: e.target.value });
    }
    handleRuTextChange(e) {
        this.setState({ ruText: e.target.value });
    }
    add() {
        if (this.state.engText.length > 0) {
          const selectedTags = this.state.createdTags.filter(t => t.selected)
              .concat(this.state.tags.filter(t => t.selected));

          this.props.save({
              eng_text: this.state.engText,
              rus_text: this.state.ruText,
              tags: selectedTags.map(t => t.tag),
            });
          }
    }
    update() {
        if (this.state.engText.length > 0) {
          const selectedTags = this.state.createdTags.filter(t => t.selected)
              .concat(this.state.tags.filter(t => t.selected));

          this.props.update({
              id: this.props.questionToEdit.id,
              eng_text: this.state.engText,
              rus_text: this.state.ruText,
              tags: selectedTags.map(t => t.tag),
            });
          }
    }
    selectTag(tag, isAdded, isNew) {
      console.log('addQuestion tag, isAdded', tag, isAdded);
      if (isNew) {
        const newCreatedTags = this.state.createdTags.slice();
        const index = newCreatedTags.findIndex(t => t.tag === tag);
        if (index !== -1) {
          newCreatedTags[index].selected = isAdded;
          this.setState({
              createdTags: newCreatedTags,
          });
        } else {
          // TODO: and new tag to the list
          // fake tag object
          const tagObject = {
              id: this.state.tags.length + this.state.createdTags.length + 1,
              tag,
              selected: isAdded,
              isNew: true,
          };
          this.setState({
              createdTags: this.state.createdTags.concat(tagObject),
          });
        }
      } else {
        const newTags = this.state.tags.slice();
        const selectedTag = newTags.find(t => t.tag === tag);
        selectedTag.selected = isAdded;
        this.setState({
            tags: newTags,
        });
      }
    }
    handleLevelChange(e, index, value) {
      this.setState({
          selectedLevel: value,
      });
    }
    render() {
      const question = this.props.questionToEdit || null;

      return (
          <div>
              <Subheader>New Question:</Subheader>
              <Subheader>
                  <TextField
                      hintText="Please enter a question in English"
                      floatingLabelText="Question in English"
                      multiLine
                      rows={2}
                      fullWidth
                      onChange={this.handleEngTextChange}
                      defaultValue={question ? question.eng_text : ''}
                      value={this.state.engText}
                  />
                  <TextField
                      hintText="Please enter a question in Russian"
                      floatingLabelText="Question in Russian"
                      multiLine
                      rows={2}
                      fullWidth
                      onChange={this.handleRuTextChange}
                      defaultValue={question ? question.rus_text : ''}
                      value={this.state.ruText}
                  />
                  <DropDownMenu
                      value={this.state.selectedLevel}
                      onChange={(e, index, value) =>
                        this.handleLevelChange(e, index, value)}
                  >
                      <MenuItem value={1} primaryText="Theoretical" />
                      <MenuItem value={2} primaryText="Applied" />
                      <MenuItem value={3} primaryText="Instrumental" />
                  </DropDownMenu>
                  <SelectTagsMui
                      tags={this.state.tags}
                      createdTags={this.state.createdTags}
                      select={this.selectTag}
                  />

                  {this.props.questionToEdit
                      ?
                      <RaisedButton
                          label="Update"
                          primary
                          fullWidth
                          onClick={this.update}
                      />
                      :
                      <RaisedButton
                          label="Add"
                          primary
                          fullWidth
                          onClick={this.add}
                      />
                  }
              </Subheader>
          </div>
      );
  }
}

AddQuestionMui.propTypes = {
  tags: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  questionToEdit: PropTypes.object,
};
module.exports = AddQuestionMui;
