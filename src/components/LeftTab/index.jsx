import React, { Component } from 'react'
import ContentTitle from './ContentTitle';
import ContentCollapse from './ContentCollapse';
import ContentFooter from './ContentFooter';
import LeftIcon from '@/assets/svgIcon/left.svg';


export default class LeftTab extends Component {
  // static propTypes = {
  //   map:PropTypes.instanceOf(Map),
  // }
  state = {
    metadatalist:[]
  }
 
  toggleLeft(){
    this.props.toggleLeft(!this.props.showLeft);
  }
  save(){
    console.log('save');
  }
  render() {
    let className = 'left-box';
    className = this.props.showLeft ? className : className+' left-hidden';
    return (
      <div className={className}>
        <div className="left-content">
          <ContentTitle />
          <ContentCollapse metalist = {this.props.metadatalist} getMap={this.props.getMap} selectMeta={this.props.selectMeta} deletemeta={this.props.deletemeta} />
          <ContentFooter save={this.save.bind(this)} />
        </div>
        <div className="left-bar flex-center" onClick={this.toggleLeft.bind(this)}>
          <img src={LeftIcon} width="24" height="24" alt=""/>
        </div>
      </div>
    )
  }
}
