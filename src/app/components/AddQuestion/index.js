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
   this.selectTag = this.selectTag.bind(this);
  const { questionToEdit } = undefined;
   this.state = {
     engText: questionToEdit ? questionToEdit.eng_text : '',
     ruText: questionToEdit ? questionToEdit.rus_text : '',
     selectedTags: [],
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
    selectTag(id) {
      // console.log('selectTag this.state.selectedTags', this.state.selectedTags);
      this.state.selectedTags.push(id);
      // const tags = [...this.state.selectedTags, id];
      // this.setState({
      //     selectedTags: tags,
      //  });
        console.log('this.state.selectedTags', this.state.selectedTags);
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
                      <SelectTags tags={tags} select={this.selectTag}/>
                  </Panel>
                  <Button onClick={this.add}>Add</Button>
              </FormGroup>
          </div>
      );
  }
}

AddQuestion.propTypes = {
  tags: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  // questionToEdit: PropTypes.object.isRequired,
};
module.exports = AddQuestion;
