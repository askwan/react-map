import React, { Component } from 'react'
import Login from './Login';
import Search from './Search';
import Tabs from './Tabs';
import Area from './Area';
import Filters from './Filters'
import Help from './Help';

const Tab = props => {
  let str = props.selected;
  if(str === 'area'){
    return <Area getMap={props.getMap} changeSelect={props.changeSelect} />
  }else if(str === 'filter'){
    return <Filters />
  }
  return null
}

export default class PageHeader extends Component {
  state={
    selected:'',
    showHelp:false
  }
  // changeSelect(item){
  //   this.setState({
  //     selected:item
  //   })
  // }
  toggleHelp(bool){
    this.setState({
      showHelp:bool
    })
  }
  render() {
    return (
      <div className="page-header">
        <Login showHelp = {this.state.showHelp} toggleHelp={this.toggleHelp.bind(this)} />
        <Search />
        <Tabs selected={this.props.selected} onselect={this.props.changeSelect} />
        <Tab selected={this.props.selected} getMap={this.props.getMap} changeSelect={this.props.changeSelect} />
        <Help showHelp={this.state.showHelp} toggleHelp={this.toggleHelp.bind(this)} />
      </div>
    )
  }
}
