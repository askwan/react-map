import React, { Component } from 'react';
// import logo from './logo.svg';

import './assets/App.scss';
import './assets/public/index.scss';
import Map from './script/map'
import LeftTab from './components/LeftTab';
import PageHeader from './components/PageHeader';

let map;

const getMap = ()=>{
  return map;
}

class App extends Component {
  state={
    showLeft:false
  }
  componentDidMount(){
    map = new Map(document.getElementById('map'))
  }
  toggleLeft(bool){
    console.log(bool,'bool')
    this.setState({
      showLeft: bool
    })
  }
  render() {
    return (
      <div className="App fill">
        <PageHeader />
        <LeftTab getMap={getMap} map={map} showLeft={this.state.showLeft} toggleLeft = {this.toggleLeft.bind(this)} />
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
