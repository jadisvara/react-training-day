import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import { Toolbar } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { FormGroup, Button } from 'react-bootstrap';
import QuestionList from '../../../components/QuestionList';
import AddQuestion from '../../../components/AddQuestion';
import * as QuestionsActions from '../../../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.openAddQuestionModal = this.openAddQuestionModal.bind(this);
    this.openEditQuestionModal = this.openEditQuestionModal.bind(this);
    this.closeAddQuestionModal = this.closeAddQuestionModal.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      showModal: false,
      searchText: '',
      searchQuestions: [],
      isEng: true,
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
  openEditQuestionModal(id) {
      const q = this.props.questions.filter(item => item.id === id)[0];
      this.setState({
          questionToEdit: q,
          showModal: true,
      });
  }
  openAddQuestionModal() {
    this.setState({ showModal: true, questionToEdit: null });
  }
  closeAddQuestionModal() {
    this.setState({ showModal: false, questionToEdit: null });
  }
  deleteQuestion(id) {
      this.props.removeQuestion(id);
  }
  saveQuestion(data) {
      this.props.saveQuestion(data);
  }
  updateQuestion(data) {
      this.props.updateQuestion(data);
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
            <Button bsStyle="primary" onClick={this.openAddQuestionModal}>
            Add Question
            </Button>
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
                        remove={this.deleteQuestion}
                        update={this.openEditQuestionModal}
                        isEng={this.state.isEng}
                    />
                }
            </FormGroup>
            <Toolbar/>
            <Button
                onClick={() => this.setState({ isEng: !this.state.isEng })}
            >
              {this.state.isEng ? 'ru' : 'eng'}
            </Button>
            <QuestionList
                data={questions}
                remove={this.deleteQuestion}
                update={this.openEditQuestionModal}
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
    updateQuestion: (data) => dispatch(QuestionsActions.updateQuestion(data)),
    saveQuestion: (data) => dispatch(QuestionsActions.saveQuestion(data)),
    searchQuestion: (text) => dispatch(QuestionsActions.searchQuestion(text)),
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
