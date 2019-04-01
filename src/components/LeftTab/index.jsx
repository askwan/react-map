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
    layer:'l7041'
  }
//3123123
//3123123
 
  toggleLeft(){
    this.props.toggleLeft(!this.props.showLeft);
  }
  render() {
    let className = 'left-box';
    className = this.props.showLeft ? className : className+' left-hidden'
    return (
      <div className={className}>
        <div className="left-content">
          <ContentTitle />
          <ContentCollapse />
          <ContentFooter />
        </div>
        <div className="left-bar flex-center" onClick={this.toggleLeft.bind(this)}>
          <img src={LeftIcon} width="24" height="24" alt=""/>
        </div>
      </div>
    )
  }
}
