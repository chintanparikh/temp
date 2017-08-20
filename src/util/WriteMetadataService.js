import _ from 'underscore';

var ffmetadata = window.require('ffmetadata-ohnx-fork');

class WriteMetadataService {

  static process(path, metadata) {
    console.log("Processing");
    const filteredMetadata = this.filter(metadata);
    const processedMetadata = this.postProcessData(metadata);
    this.writeToFile(path, processedMetadata);

    return filteredMetadata;
  }

  static postProcessData(metadata) {
    Object.keys(metadata).map((key, index) => {
      if (key in this.postProcessing) {
        metadata[key] = this.postProcessing[key];
      }
    });

    return metadata;
  }

  static filter(metadata) {
    let filteredMetadata = _.map(metadata, (val, key) => {
      if (val !== '' && val !== null && val !== undefined) {
        return {key: key, val: val};
      }
    });

    filteredMetadata = _.filter(filteredMetadata, (val) => {
      return val !== undefined;
    })

    return _.object(_.map(filteredMetadata, _.values))
  }

  static writeToFile(path, metadata) {
    ffmetadata.write(path, metadata, (err) => {
      if (err) console.error("Error writing metadata", err);
      else console.log("Data written");
    })
  }
}

// Defines functions for how to post process the data
WriteMetadataService.postProcessing = {
  picture: (data) => {
    console.log("Post Processing Image");
    console.log(data);
  }
}

export default WriteMetadataService;
