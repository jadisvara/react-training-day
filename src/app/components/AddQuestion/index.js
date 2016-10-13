import React, { Component, PropTypes } from 'react';
import { ControlLabel, FormControl, Button, FormGroup, Panel } from 'react-bootstrap';
// import { saveQuestion } from '../../actions';
import SelectTags from '../SelectTags';

class AddQuestion extends Component {
    constructor(props) {
   super(props);
   this.handleEngTextChange = this.handleEngTextChange.bind(this);
   this.handleRuTextChange = this.handleRuTextChange.bind(this);
   this.add = this.add.bind(this);
   this.update = this.update.bind(this);
   this.selectTag = this.selectTag.bind(this);
   const question = this.props.questionToEdit || null;
   const tags = question ? question.tags.map(t => t.tag) : [];
   this.state = {
     engText: question ? question.eng_text : '',
     ruText: question ? question.rus_text : '',
     selectedTags: tags,
   };
  }
    componentWillMount() {
      console.log('AddQuestion component');
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
          this.props.save({
              eng_text: this.state.engText,
              rus_text: this.state.ruText,
              tags: this.state.selectedTags,
            });
          }
    }
    update() {
        if (this.state.engText.length > 0) {
          this.props.update({
              id: this.props.questionToEdit.id,
              eng_text: this.state.engText,
              rus_text: this.state.ruText,
              tags: this.state.selectedTags,
            });
          }
    }
    selectTag(tag, isAdded) {
      console.log('addQuestion tag, isAdded', tag.tag, isAdded);
      if (isAdded) {
          this.state.selectedTags.push(tag);
      } else {
          const index = this.state.selectedTags.findIndex(item => item === tag);
          if (index !== -1) {
              this.state.selectedTags.splice(index, 1);
          }
      }
    }

    render() {
      const { tags } = this.props;

      return (
          <div>
              <FormGroup controlId="questionField" validationState={this.getValidationState()}>
                  <ControlLabel>New Question:</ControlLabel>
                  <FormControl
                      type="text"
                      value={this.state.engText}
                      placeholder="Please enter a question in English"
                      onChange={this.handleEngTextChange}
                  />
                  <FormControl
                      type="text"
                      value={this.state.ruText}
                      placeholder="Please enter a question in Russian"
                      onChange={this.handleRuTextChange}
                  />
                  <Panel>
                      <SelectTags
                          tags={tags}
                          select={this.selectTag}
                          preselectedTags={this.state.selectedTags}
                      />
                  </Panel>
                  {this.props.questionToEdit
                      ? <Button onClick={this.update}>Update</Button>
                      : <Button onClick={this.add}>Add</Button>
                  }
              </FormGroup>
          </div>
      );
  }
}

AddQuestion.propTypes = {
  tags: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  questionToEdit: PropTypes.object,
};
module.exports = AddQuestion;
