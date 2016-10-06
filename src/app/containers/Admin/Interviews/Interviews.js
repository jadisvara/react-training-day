import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

// const questionsData = [
//   {
//     id: 0,
//     text: 'How many roads must a man walk down?',
//   },
//   {
//     id: 1,
//     text: 'How many Vogons does it take to change a lightbulb?',
//   },
//   {
//     id: 2,
//     text: 'What do you get if you multiply six by nine?',
//   },
//   {
//     id: 3,
//     text: 'Answer to the Ultimate Question of Life, the Universe, and Everything?',
//   },
// ];

// class Interviews extends Component {
//   constructor(props) {
//    super(props);
//    this.openAddQuestionModal = this.openAddQuestionModal.bind(this);
//    this.closeAddQuestionModal = this.closeAddQuestionModal.bind(this);
//    this.state = {
//      showModal: false,
//    };
//    console.log('this', this);
//  }
//
//   componentWillMount() {
//     if (this.props.questions.length === 0) {
//         this.props.getQuestions();
//         console.log('Questions block mount', this.props.questions);
//     }
//   }
//
//   openAddQuestionModal() {
//     console.log('this', this);
//     this.setState({ showModal: true });
//   }
//
//   closeAddQuestionModal() {
//     this.setState({ showModal: false });
//   }
//
//   render() {
//     const { questions } = this.props;
//     const { showModal } = this.state;
//
//     return (
//         <Panel>
//             <Button bsStyle="primary" onClick={this.openAddQuestionModal}>
//             Add Question
//             </Button>
//             <h3>Questions:</h3>
//             <QuestionList data={questions}/>
//
//             <Modal show={showModal}>
//                 <Modal.Header>
//                     <Modal.Title>Add new Question</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <AddQuestion/>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={this.closeAddQuestionModal}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </Panel>
//     );
//   }
// }


module.exports = function Interviews() {
    return (
        <Panel>
            <h3>Interviews:</h3>
            Interviews sets go here
        </Panel>
    );
};
