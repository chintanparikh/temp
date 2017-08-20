import React, { PropTypes, Component } from 'react';
import _ from 'underscore';

class Base64Picture extends Component {

  base64encode(data) {
    return _.map(data, (imageString) => {
      return String.fromCharCode(imageString);
    }).join('');
  }

  render() {
    let base64String = `data:image/${this.props.picture.format};base64,${window.btoa(this.base64encode(this.props.picture.data))}`
    
    return (
      <img src={base64String} className="album-art" alt="Album Art" />
    )
  }
}

Base64Picture.PropTypes = {
  picture: PropTypes.shape({
    format: PropTypes.string,
    data: PropTypes.array
  })
}

export default Base64Picture