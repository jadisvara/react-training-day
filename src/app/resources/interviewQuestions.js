import $http from 'axios';

export function getInterviewQuestions(id) {
  return $http({ url: `interviews/${id}/questions` });
}

export function saveInterviewQuestions(data) {
    return $http({
      method: 'POST',
      url: `interviews/${data.interview_id}/questions`,
      data,
    });
}

export function removeInterviewQuestion(InterviewId, QuestionId) {
    return $http({
      method: 'DELETE',
      url: `interviews/${InterviewId}/questions/${QuestionId}`,
    });
}

export function getQuestionChildren(InterviewId, QuestionId) {
  return $http({ url: `interviews/${InterviewId}/questions/${QuestionId}/children` });
}
