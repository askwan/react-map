import React, { Component } from 'react'
import { Icon, Tooltip } from 'antd';

export default class ZoomControl extends Component {
  onZoom(status){
    let map = this.props.getMap();
    let zoom = map.getZoom();
    if(zoom<=1) return;
    if(zoom>=21) return;
    zoom = status === '+' ? zoom+=1 :zoom-=1;
    map.zoomTo(zoom);
  }
  render() {
    return (
      <div className="zoom-control">
        <Tooltip placement="right" title="放大" overlayClassName="zoom-tip">
          <div className="zoom-btn" onClick={this.onZoom.bind(this,'+')}>
              <Icon type="plus" />
          </div>
        </Tooltip>
        <Tooltip placement="right" title="缩小" overlayClassName="zoom-tip">
          <div className="zoom-btn" onClick={this.onZoom.bind(this,'-')}>
              <Icon type="minus" />
          </div>
        </Tooltip>
      </div>
    )
  }
}
