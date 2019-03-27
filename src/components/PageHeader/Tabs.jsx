import React, { Component } from 'react'
import { Icon } from 'antd';

export default class Tabs extends Component {
  state = {
    classnames:{
      filter:'el-tab',
      area:'el-tab'
    }
  }
  select(item){
    let classnames = {
      filter:'el-tab',
      area:'el-tab'
    }
    if(item!==this.props.selected){
      if(item === 'area'){
        classnames.area = 'el-tab active';
      }else if(item === 'filter'){
        classnames.filter = 'el-tab active';
      }
    }else{
      item = ''
    }
    this.setState({
      classnames
    });
    this.props.onselect(item);
  }
  render() {
    return (
      <div className="page-tabs flex-around font-18 font-white">
        <div className={this.state.classnames.area} onClick={this.select.bind(this,'area')}>
          <Icon type="border" />
          <span className="mg-left-mini">区域</span>
        </div>
        <div className={this.state.classnames.filter} onClick={this.select.bind(this,'filter')}>
          <Icon type="filter" className="" />
          <span>过滤</span>
        </div>
      </div>
    )
  }
}
