import React, { Component } from 'react'
import Login from './Login';
import Search from './Search';
import Tabs from './Tabs';
import Area from './Area';
import Filters from './Filters'

const Tab = props => {
  let str = props.selected;
  if(str === 'area'){
    return <Area />
  }else if(str === 'filter'){
    return <Filters />
  }
  return null
}

export default class PageHeader extends Component {
  state={
    selected:'',
  }
  changeSelect(item){
    this.setState({
      selected:item
    })
  }
  render() {
    return (
      <div className="page-header">
        <Login />
        <Search />
        <Tabs selected={this.state.selected} onselect={this.changeSelect.bind(this)} />
        <Tab selected={this.state.selected} />
      </div>
    )
  }
}
