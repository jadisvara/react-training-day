import $http from 'axios';

export function questionList(params = {}) {
    const { _start = 0, _limit = 50 } = params;
    return $http({ url: `questions?_start=${_start}&_limit=${_limit}` });
}

export function saveQuestion(question) {
    return $http({
      method: 'post',
      url: 'questions',
      data: question,
    });
}

export function updateQuestion(question) {
    return $http({
      method: 'put',
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
