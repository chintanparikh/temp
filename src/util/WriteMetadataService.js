import _ from 'underscore';
import { isValidUrl } from './util';
import { APP_FOLDER } from './constants';

var ffmetadata = window.require('ffmetadata-ohnx-fork');
var temp = window.require('temp').track();
var request = window.require('request');
var fs = window.require('fs');

class WriteMetadataService {

  constructor() {
      this.postProcessing = {
        picture: {
          keyTransform: () => {
            return 'attachments';
          },
          valueTransform: (data) => {
            if (isValidUrl(data)) {
              if (!fs.existsSync(APP_FOLDER)){
                  fs.mkdirSync(APP_FOLDER);
              }

              request(data).pipe(fs.createWriteStream('tempImage.jpg'));

              return ['tempImage.jpg'];
            }
          }
        }
      };
  }

  saveID3(songData, path, callback) {
    // did we successfully load the ffmetadata library

      // only commit the fields ffmpeg will honor: http://wiki.multimedia.cx/index.php?title=FFmpeg_Metadata#MP3
      const data = {
        title: songData.title,
        author: songData.artist,
        album: songData.album,
        year: songData.year,
        genre: songData.genre,
      };

      let options = {};

      if (songData.picture) {
        options.attachments = [songData.picture];
      }

      console.log(path);
      // write the to the id3 tags on the file
      ffmetadata.write(path, data, options, function(err) {
        if (err) {
          console.log('Error writing id3 tags to file: ' + err);
          console.log('You should check if ffmpeg is installed.');
        } else {
          console.log('Successfully wrote id3 tags to file: ' + path);
        }
        callback();
      });
  }

  process(path, metadata) {
    const filteredMetadata = this.filter(metadata);
    const songData = this.postProcessData(metadata);
    this.saveID3(songData, path, () => console.log("Successfully written to file"));

    return songData;
  }

  postProcessData(metadata) {
    Object.keys(metadata).map((key, index) => {
      if (key in this.postProcessing) {
        const out = this.postProcessing[key].valueTransform(metadata[key]);
        metadata[this.postProcessing[key].keyTransform(key)] = out;
      }
    });

    return metadata;
  }

  filter(metadata) {
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

  writeToFile(path, metadata) {
    ffmetadata.write(path, metadata, (err) => {
      console.log("Writing metadata");
      console.log(metadata);
      if (err) console.error("Error writing metadata", err);
      else console.log("Data written");
    })
  }
}


export default WriteMetadataService;
