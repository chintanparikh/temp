import _ from 'underscore';

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;



export function filterObject(object, fn) {

  let filteredArray = _.map(object, (val, key) => {
    if (fn(key, val)) {
      return {key: key, val: val}
    }
  });

  filteredArray = _.filter(object, (val) => {
    return val !== undefined;
  });

  return _.object(_.map(filteredArray, _.values))
}

export function isValidUrl(url) {
  return URL_REGEX.test(url);
}
