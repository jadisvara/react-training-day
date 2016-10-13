import $http from 'axios';

export function tagList(params = {}) {
  const { _start = 0, _limit = 50 } = params;
    return $http({ url: `tags?start=${_start}&limit=${_limit}` });
}

export function tagById(id) {
    return $http({ url: `tags/${id}` });
}
