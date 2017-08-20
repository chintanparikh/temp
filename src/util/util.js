import _ from 'underscore';

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