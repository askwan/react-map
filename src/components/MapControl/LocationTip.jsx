import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LocationTip extends Component {
  state={
    posi:{
      lat:1,
      lng:0
    }
  }
  static propTypes = {
    getMap: PropTypes.func.isRequired,
  }
  componentWillMount(){
    let map = this.props.getMap();
    map.on('mousemove',obj=>{
      this.setState({
        posi:{
          lat:obj.lngLat.lat,
          lng:obj.lngLat.lng
        }
      })
    })
  }
  copy(event){
    
  }
  render() {
    return (
      <div className="control-location-tip" onClick={this.copy}>
        <span>Lat:{this.state.posi.lat}</span>
        <span>Lng:{this.state.posi.lng}</span>
      </div>
    )
  }
}
