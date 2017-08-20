import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import _ from 'underscore';

import MetadataForm from "./MetadataForm";
import { removeRejectedKeys } from '../util/metadata';
import { filterObject } from "../util/util";

var ffmetadata = window.require('ffmetadata-ohnx-fork');
var jsmediatags = window.require("jsmediatags");

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {file: null, metadata: null, path: null};

    _.bindAll(this, 'handleDrop', 'handleSubmit');
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    let file = acceptedFiles[0];
    let path = file.path;
    let metadata = null;
    let that = this;

    jsmediatags.read(path, {
      onSuccess: function(tag) {
        // Filter out all the metadata that we don't want (because ffmetadata doesn't support it)
        // TODO Bugfix: On the second call, jsmediatags will for some reason merge the newly dragged
        // file's metadata with the old metadata
        const filteredMetadata = removeRejectedKeys(tag.tags);
        const newState = {file: file, path: path, metadata: filteredMetadata};

        that.setState(newState);
      },
      onError: function(error) {
        console.log(':(', error.type, error.info);
      }
    });
  }

  handleSubmit(metadata) {
    let filteredMetadata = _.map(metadata, (val, key) => {
      if (val !== '' && val !== null && val !== undefined) {
        return {key: key, val: val};
      }
    });

    filteredMetadata = _.filter(filteredMetadata, (val) => {
      return val !== undefined;
    })

    filteredMetadata = _.object(_.map(filteredMetadata, _.values))
    console.log(filteredMetadata);

    // Write Metadata to file
    ffmetadata.write(this.state.path, filteredMetadata, (err) => {
      if (err) console.error("Error writing metadata", err);
      else console.log("Data written");
    })

    this.setState({metadata: filteredMetadata});
  }

  render() {
    if (this.state.file) {
      return (
        <div>
          <MetadataForm metadata={this.state.metadata}
                        onSubmit={this.handleSubmit}></MetadataForm>
          <Dropzone onDrop={this.handleDrop} ></Dropzone>
        </div>
      );
    } else {
      return (
        <Dropzone onDrop={this.handleDrop} ></Dropzone>
      )
    }
  }
}

export default App;
