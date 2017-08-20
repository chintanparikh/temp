import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import Dropzone from 'react-dropzone';


import Picture from './Base64Picture';
import { defaultMetadata, addMissingKeysToMetadata } from '../util/metadata';

export default class MetadataForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      metadata: addMissingKeysToMetadata(this.props.metadata)
    }

    _.bindAll(this, 'handleSubmit', 'handleAttributeChange');
  }

  handleAttributeChange(attribute) {
    return (event) => {
      let metadata = this.state.metadata;
      metadata[attribute] = event.target.value;
      this.setState({metadata: metadata});
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state.metadata);
  }

  render() {
    return (
      <div>
      {this.state.metadata.picture && <Picture picture={this.state.metadata.picture} />}

      <Dropzone onDrop={(acc, rej) => {console.log(acc)}} ></Dropzone>

      {_.map(this.state.metadata, (val, key) => {
        return (
          <div className="input-form">
            <label>{key}</label> 
            <input type="text" value={typeof val === 'string' ? val : ""} onChange={this.handleAttributeChange(key)} />
          </div>
        )
      })}

      <button onClick={this.handleSubmit}>Save</button>

      </div>
    );
  }
}