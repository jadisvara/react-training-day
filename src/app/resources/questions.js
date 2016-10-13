import $http from 'axios';

export function questionList(params = {}) {
    const { _start = 0, _limit = 50 } = params;
    return $http({ url: `questions?start=${_start}&limit=${_limit}` });
}

export function saveQuestion(question) {
    return $http({
      method: 'POST',
      url: 'questions',
      data: question,
    });
}

export function updateQuestion(question) {
    return $http({
      method: 'PUT',
      url: `questions/${question.id}`,
      data: question,
    });
}

export function removeQuestion(id) {
    return $http({
      method: 'DELETE',
      url: `questions/${id}`,
    });
}

export function questionById(id) {
    return $http({ url: `questions/${id}` });
}
