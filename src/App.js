import React, { Component } from 'react';
// import logo from './logo.svg';

import './assets/App.scss';
import './assets/public/index.scss';
import Map from './script/map'
import LeftTab from './components/LeftTab';
import PageHeader from './components/PageHeader';
import MapControl from './components/MapControl';

let map;

const getMap = ()=>{
  return map;
}

class App extends Component {
  state={
    showLeft:false,
    mapReady:false
  }
  componentDidMount(){
    console.log(1111)
    map = new Map(document.getElementById('map'),(map)=>{
      console.log('ready',map);
      this.setState({
        mapReady:true
      })
    })
  }
  toggleLeft(bool){
    this.setState({
      showLeft: bool
    })
  }
  render() {
    return (
      <div className="App fill">
        <PageHeader />
        <LeftTab getMap={getMap} map={map} showLeft={this.state.showLeft} toggleLeft = {this.toggleLeft.bind(this)} />
        {this.state.mapReady && <MapControl getMap={getMap} /> }
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
