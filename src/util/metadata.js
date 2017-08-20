import _ from 'underscore';

let defaultMetadata = {title: '', artist: '', album: '', year: '', comment: '', track: '', genre: '', picture: '', lyrics: ''};
let allowedMetadataKeys = _.keys(defaultMetadata)

export function addMissingKeysToMetadata(metadata) {
  return _.extend(defaultMetadata, metadata)
}

export function removeRejectedKeys(metadata) {
  let filteredMetadata = _.map(metadata, (val, key) => {
    if (_.contains(allowedMetadataKeys, key)) {
      return {key: key, val: val}
    }
  });

  filteredMetadata = _.filter(filteredMetadata, (val) => {
    return val !== undefined
  })

  return _.object(_.map(filteredMetadata, _.values))
}