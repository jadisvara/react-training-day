import $http from 'axios';

export function interviewList() {
    return $http({ url: 'interviews' });
}

export function saveInterview(interview) {
    return $http({
      method: 'POST',
      url: 'interviews',
      data: interview,
    });
}

export function updateInterview(interview) {
    return $http({
      method: 'PUT',
      url: `interviews/${interview.id}`,
      data: interview,
    });
}

export function removeInterview(id) {
    return $http({
      method: 'DELETE',
      url: `interviews/${id}`,
    });
}

export function interviewById(id) {
    return $http({ url: `interviews/${id}` });
}
