import $http from 'axios';

export function tagList() {
    return $http({ url: 'tags' });
}
export function saveTag(tag) {
    return $http({
      method: 'POST',
      url: 'tags',
      data: tag,
    });
}
