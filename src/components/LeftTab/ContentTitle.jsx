import React, { Component } from 'react'
import ShareIcon from '@/assets/svgIcon/share.svg';

export default class ContentTitle extends Component {
  render() {
    return (
      <div className="content-table-title flex-between">
        <div style={{width:'135px'}}>选择集编号</div>
        <div className='flex-center' style={{width:'60px'}}>已选择</div>
        <div className="flex-center" style={{width:'60px'}}>云量</div>
        <div style={{width:'17px'}}></div>
        <div style={{width:'17px'}}></div>
        <img width="20" height="20" src={ShareIcon} alt=""/>
      </div>
    )
  }
}
