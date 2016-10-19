import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { cyan500 } from 'material-ui/styles/colors';

import { FormGroup } from 'react-bootstrap';

import QuestionList from '../../../components/QuestionList';
import AddQuestion from '../../../components/AddQuestion';
import AddBtn from '../../../components/AddBtn';
import AddQuestionMui from '../../../components/AddQuestionMui';
import LangSwitcher from '../../../components/LangSwitcher';
import * as QuestionsActions from '../../../actions/QuestionActions';
import * as TagActions from '../../../actions/TagActions';
import * as CommonActions from '../../../actions/CommonActions';

const styles = {
  chip: {
    margin: 4,
    backgroundColor: cyan500,
  },
  wrapper: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    width: '30%',
  },
};

const dataSourceConfig = {
  text: 'tag',
  value: 'id',
};

class Questions extends Component {
  constructor(props) {
    super(props);
    this.openAddQuestionModal = this.openAddQuestionModal.bind(this);
    this.openEditQuestionModal = this.openEditQuestionModal.bind(this);
    this.closeAddQuestionModal = this.closeAddQuestionModal.bind(this);
    this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      showModal: false,
      searchText: '',
      searchQuestions: [],
      isEng: true,
      openRightNav: false,
      selectedTags: [],
      questions: this.props.questions || [],
    };
  }
  componentWillMount() {
    if (this.props.questions.length === 0) {
        this.props.getQuestions();
    }
    if (this.props.tags.length === 0) {
        this.props.getTags();
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      questions: newProps.questions,
    });
  }
  onRightNavStateChange(openRightNav) {
      this.setState({ openRightNav });
      if (!openRightNav) {
          this.setState({ questionToEdit: null });
      }
  }
  onDeleteQuestion(id) {
     // TODO: add confirm dialog here
      // this.props.removeQuestion(id);
      const body = 'Delete this Question?';
      const actions = [
          <FlatButton
              label="Cancel"
              primary
              onTouchTap={this.props.closeConfirmDialog}
          />,
          <FlatButton
              label="Submit"
              primary
              onTouchTap={() => {
                this.props.closeConfirmDialog();
                this.props.removeQuestion(id);
              }}
          />,
      ];
      this.props.showConfirmDialog(body, actions);
  }
  onNewItemAddedIntoFilter(chosenRequest, index) {
      const newSelectedTags = [...this.state.selectedTags, this.props.tags[index]];
      this.updateStateByFilter(newSelectedTags);
  }
  openEditQuestionModal(id) {
      const q = this.props.questions.filter(item => item.id === id)[0];
      this.setState({
          questionToEdit: q,
          openRightNav: true,
      });
  }
  openAddQuestionModal() {
    this.setState({ openRightNav: true, questionToEdit: null });
  }
  closeAddQuestionModal() {
    this.setState({ showModal: false, questionToEdit: null });
  }
  saveQuestion(data) {
      this.props.saveQuestion(data, this.props.getTags);
  }
  updateQuestion(data) {
      this.props.updateQuestion(data, this.props.getTags);
  }
  deleteTag(tagId, questionData) {
    this.props.updateQuestion({
        id: questionData.id,
        eng_text: questionData.engText,
        rus_text: questionData.ruText,
        tags: questionData.tags.filter(t => t.id !== tagId).map(t => t.tag),
      });
  }
  handleSearchChange(e) {
    const self = this;
    const text = e.target.value.trim().toLowerCase();
    if (text === '') {
        this.setState({
            searchText: text,
            searchQuestions: [],
       });
    } else {
        this.setState({
            searchText: text,
            searchQuestions: self.props.questions.filter((question) =>
              question.eng_text.toLowerCase().includes(text)
              || question.rus_text.toLowerCase().includes(text)),
        });
    }
  }
  handleDeleteFilterTag(id) {
    const newSelectedTags = this.state.selectedTags.filter(t => t.id !== id);
    this.updateStateByFilter(newSelectedTags);
  }
  updateStateByFilter(newSelectedTags) {
    const selectedTagsIds = newSelectedTags.map(t => t.id);
    this.setState({
      selectedTags: newSelectedTags,
      questions: this.props.questions.filter((q) => {
        let isPresent = true;
        selectedTagsIds.forEach(tag => {
          if (!(q.tags.map(t => t.id)).includes(tag)) {
            isPresent = false;
          }
        });
        return isPresent;
      }),
    });
  }

  render() {
    const { tags } = this.props;
    const { showModal, searchQuestions, questionToEdit, selectedTags, questions } = this.state;

    return (
        <div>
            <AddBtn onClick={this.openAddQuestionModal} />
            <TextField
                hintText="Enter search words"
                floatingLabelText="Search for"
                value={this.state.searchText}
                onChange={this.handleSearchChange}
                style={{ display: 'block' }}
            />
            <FormGroup controlId="questionSearch">
                {searchQuestions &&
                    <QuestionList
                        data={searchQuestions}
                        remove={this.onDeleteQuestion}
                        update={this.openEditQuestionModal}
                        deleteTag={this.deleteTag}
                        isEng={this.state.isEng}
                    />
                }
            </FormGroup>
            <LangSwitcher
                isEng={this.state.isEng}
                onClick={() => this.setState({ isEng: !this.state.isEng })}
            />

            <Paper style={{ margin: '20px' }}>
                <AutoComplete
                    hintText="Filter by Tags e.g. AngularJS, jQuery, Git..."
                    dataSource={tags}
                    dataSourceConfig={dataSourceConfig}
                    onUpdateInput={this.handleUpdateInput}
                    fullWidth
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={(chosenRequest, index) =>
                        this.onNewItemAddedIntoFilter(chosenRequest, index)}
                />
                <div style={styles.wrapper}>
                    Selected tags:
                    {selectedTags.length > 0 &&
                      selectedTags.map(tag => (
                          <Chip
                              key={tag.id}
                              style={styles.chip}
                              labelColor="#fff"
                              labelStyle={{ fontSize: '12px' }}
                              onRequestDelete={() => this.handleDeleteFilterTag(tag.id)}
                          >
                              {tag.tag}
                          </Chip>
                      ))
                    }
                </div>
            </Paper>

            <QuestionList
                data={questions}
                remove={this.onDeleteQuestion}
                update={this.openEditQuestionModal}
                deleteTag={this.deleteTag}
                isEng={this.state.isEng}
            />
            <Dialog
                title="Add new Question"
                actions={[
                    <FlatButton
                        label="Cancel"
                        primary
                        onTouchTap={this.closeAddQuestionModal}
                    />,
                    <FlatButton
                        label="Submit"
                        primary
                        onTouchTap={this.closeAddQuestionModal}
                    />,
                ]}
                modal={false}
                open={showModal}
                onRequestClose={this.closeAddQuestionModal}
            >
                <AddQuestion
                    tags={tags}
                    save={this.saveQuestion}
                    update={this.updateQuestion}
                    questionToEdit={questionToEdit}
                />
            </Dialog>

            <FlatButton
                label="Toggle Drawer"
                onTouchTap={() => this.setState({ openRightNav: !this.state.openRightNav })}
            />
            <Drawer
                width={500}
                openSecondary
                open={this.state.openRightNav}
                docked={false}
                onRequestChange={(openRightNav) => this.onRightNavStateChange(openRightNav)}
            >
                <AddQuestionMui
                    tags={tags}
                    save={this.saveQuestion}
                    update={this.updateQuestion}
                    questionToEdit={questionToEdit}
                />
            </Drawer>
        </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
  getQuestions: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  getTags: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  saveQuestion: PropTypes.func.isRequired,
  showConfirmDialog: PropTypes.func.isRequired,
  closeConfirmDialog: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    questions: state.questions.questions,
    tags: state.tags.tags,
  }),
  dispatch => ({
    getQuestions: () => dispatch(QuestionsActions.getQuestions()),
    removeQuestion: (id) => dispatch(QuestionsActions.removeQuestion(id)),
    getQuestion: (id) => dispatch(QuestionsActions.getQuestion(id)),
    updateQuestion: (data, callback) => dispatch(QuestionsActions.updateQuestion(data, callback)),
    saveQuestion: (data, callback) => dispatch(QuestionsActions.saveQuestion(data, callback)),

    getTags: () => dispatch(TagActions.getTags()),

    showConfirmDialog: (body, actions) => dispatch(CommonActions.showConfirmDialog(body, actions)),
    closeConfirmDialog: () => dispatch(CommonActions.closeConfirmDialog()),
  })
)(Questions);

// <Modal show={showModal}>
//     <Modal.Header>
//         <Modal.Title>Add new Question</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//         <AddQuestion
//             tags={tags}
//             save={this.saveQuestion}
//             update={this.updateQuestion}
//             questionToEdit={questionToEdit}
//         />
//     </Modal.Body>
//     <Modal.Footer>
//         <Button onClick={this.closeAddQuestionModal}>Close</Button>
//     </Modal.Footer>
// </Modal>
