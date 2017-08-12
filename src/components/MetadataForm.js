import React, { Component, PropTypes } from 'react';
import _ from 'underscore';

export default class MetadataForm extends Component {
  
  constructor(props) {
    super(props);
  }

  base64encode(picture) {
    return _.map(picture.data, (imageString) => {
      return String.fromCharCode(imageString);
    }).join('');
  }

  renderPicture() {
    let base64String = `data:image/${this.props.metadata.picture.format};base64,${window.btoa(this.base64encode(this.props.metadata.picture))}`
    console.log(base64String.length);
    console.log(this.props.metadata.picture);
    return (
      <img src={base64String}/>
    )
  }

  render() {
    console.log(this.props.metadata.picture);
    return (
      <div>
      {this.renderPicture()}

      {_.map(this.props.metadata, (val, key) => {
        return (
          <div>{key}: {typeof val === 'string' ? val : ""}</div>
        )
      })}
      </div>
    );
  }
}