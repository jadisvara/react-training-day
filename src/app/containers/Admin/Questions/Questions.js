import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { FormGroup, Button } from 'react-bootstrap';
import QuestionList from '../../../components/QuestionList';
import AddQuestion from '../../../components/AddQuestion';
import AddQuestionMui from '../../../components/AddQuestionMui';
import * as QuestionsActions from '../../../actions';
import * as CommonActions from '../../../actions/CommonActions';

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
  openEditQuestionModal(id) {
    console.log('openEditQuestionModal', id);
      const q = this.props.questions.filter(item => item.id === id)[0];
      this.setState({
          questionToEdit: q,
          openRightNav: true,
      });
  }
  openAddQuestionModal() {
    this.setState({ showModal: true, questionToEdit: null });
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

  render() {
    const { questions, tags } = this.props;
    const { showModal, searchQuestions, questionToEdit } = this.state;

    return (
        <div>
            <FloatingActionButton
                onClick={this.openAddQuestionModal}
            >
                <ContentAdd />
            </FloatingActionButton>
            <TextField
                hintText="Enter search words"
                floatingLabelText="Search for"
                value={this.state.searchText}
                onChange={this.handleSearchChange}
                style={{ display: 'block', margin: '10px' }}
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
            <Button
                onClick={() => this.setState({ isEng: !this.state.isEng })}
            >
              {this.state.isEng ? 'ru' : 'eng'}
            </Button>
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
  searchQuestion: PropTypes.func.isRequired,
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
    getTags: () => dispatch(QuestionsActions.getTags()),
    removeQuestion: (id) => dispatch(QuestionsActions.removeQuestion(id)),
    getQuestion: (id) => dispatch(QuestionsActions.getQuestion(id)),
    updateQuestion: (data, callback) => dispatch(QuestionsActions.updateQuestion(data, callback)),
    saveQuestion: (data, callback) => dispatch(QuestionsActions.saveQuestion(data, callback)),
    searchQuestion: (text) => dispatch(QuestionsActions.searchQuestion(text)),
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
