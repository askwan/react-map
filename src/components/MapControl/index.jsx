import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ZoomControl from './ZoomControl'
import LocationTip from './LocationTip';

export default class index extends Component {
  static propTypes = {
    getMap:PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="map-control">
        <ZoomControl getMap={this.props.getMap} />
        <LocationTip getMap={this.props.getMap} />
      </div>
    )
  }
}
