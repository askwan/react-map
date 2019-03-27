import React, { Component } from 'react'
import { Input } from 'antd';

export class Search extends Component {
  state={
    searchValue:''
  }
  searchChange(event){
    this.setState({
      searchValue:event.target.value
    })
  }
  render() {
    return (
      <div className="page-search pd-left-small pd-right-small flex-center">
        <Input className="page-search-input" value={this.state.searchValue} onChange={this.searchChange.bind(this)} size="large" placeholder="请输入搜索内容" />        
      </div>
    )
  }
}

export default Search
