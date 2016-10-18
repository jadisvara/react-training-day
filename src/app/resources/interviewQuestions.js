import $http from 'axios';

export function getInterviewQuestions(id) {
  return $http({ url: `interview/${id}/questions` });
}

export function saveInterviewQuestions(data) {
    return $http({
      method: 'POST',
      url: `interview/${data.interview_id}/questions`,
      data,
    });
}

export function removeInterviewQuestion(InterviewId, QuestionId) {
    return $http({
      method: 'DELETE',
      url: `interview/${InterviewId}/questions/${QuestionId}`,
    });
}

export function getQuestionChildren(InterviewId, QuestionId) {
  return $http({ url: `interview/${InterviewId}/questions/${QuestionId}/children` });
}
