import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import _ from 'underscore';

import MetadataForm from "./MetadataForm";

/* Full list of the metadata that ffmpeg supports
  “title”
  “author”
  “album”
  “year”
  “comment”
  “track”
  “genre”
*/
var ffmetadata = window.require('ffmetadata');
var jsmediatags = window.require("jsmediatags");


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {file: null, metadata: null, path: null}

    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    let file = acceptedFiles[0];
    let path = file.path;
    let metadata = null;
    let that = this;

    jsmediatags.read(path, {
      onSuccess: function(tag) {
        // acceptable keys
        let keys = ["title", "artist", "album", "year", "comment", "track", "genre", "picture", "lyrics"];

        // Filter out all the metadata that we don't want (because ffmetadata doesn't support it)
        let filteredMetadata = _.map(tag.tags, (val, key) => {
          if (_.contains(keys, key)) {
            return {key: key, val: val}
          }
        });
        
        filteredMetadata = _.filter(filteredMetadata, (val) => {
          return val !== undefined
        })

        filteredMetadata = _.object(_.map(filteredMetadata, _.values))
        
        that.setState({file: file, path: path, metadata: filteredMetadata})
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    });
  }

  handleChangeMetadata(metadata) {
    this.setState({metadata: metadata});
  }

  handleSave() {
    // Write Metadata to file
  }

  render() {
    if (this.state.file) {
      return <MetadataForm metadata={this.state.metadata}
                           onSubmit={this.handleChangeMetadata}
                           onSave={this.handleSave}></MetadataForm>
    } else {
      return (
        <Dropzone onDrop={this.handleDrop} ></Dropzone>
      )
    }
  }
}

export default App;
