import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import QuestionList from '../../../components/QuestionList';
import AddQuestion from '../../../components/AddQuestion';
// import { getQuestions, getTags, removeQuestion, updateQuestion } from '../../../actions';
import * as QuestionsActions from '../../../actions';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.openAddQuestionModal = this.openAddQuestionModal.bind(this);
    this.closeAddQuestionModal = this.closeAddQuestionModal.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.state = {
      showModal: false,
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

  openAddQuestionModal() {
    this.setState({ showModal: true });
  }

  closeAddQuestionModal() {
    this.setState({ showModal: false });
  }

  deleteQuestion(id) {
      this.props.removeQuestion(id);
  }

  saveQuestion(data) {
      this.props.saveQuestion(data);
  }

  updateQuestion() {
      // this.props.getQuestion(id);
      // const q = this.props.questions.filter(item => item.id === id)[0];
      // this.setState({
      //   showModal: true,
      //   question: q,
      // });
      // this.props.updateQuestion(data);
  }

  render() {
    const { questions } = this.props;
    const { tags } = this.props;
    const { showModal } = this.state;

    return (
        <Panel>
            <Button bsStyle="primary" onClick={this.openAddQuestionModal}>
            Add Question
            </Button>
            <h3>Questions:</h3>
            <QuestionList
                data={questions}
                remove={this.deleteQuestion}
                update={this.updateQuestion}
            />

            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Add new Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddQuestion
                        tags={tags}
                        save={this.saveQuestion}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeAddQuestionModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Panel>
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
  })
)(Questions);
