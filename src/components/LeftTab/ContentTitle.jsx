import React, { Component } from 'react'
import ShareIcon from '@/assets/svgIcon/share.svg';

export default class ContentTitle extends Component {
  render() {
    return (
      <div className="content-table-title flex-between">
        <div style={{width:'135px'}}>Area Name</div>
        <div style={{width:'60px'}}>Selected</div>
        <div style={{width:'60px'}}>Coverage</div>
        <div style={{width:'17px'}}></div>
        <div style={{width:'17px'}}></div>
        <img width="20" height="20" src={ShareIcon} alt=""/>
      </div>
    )
  }
}
