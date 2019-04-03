import React, { Component } from 'react';
// import logo from './logo.svg';

import './assets/App.scss';
import './assets/public/index.scss';
import Map from './script/map'
import LeftTab from './components/LeftTab';
import PageHeader from './components/PageHeader';
import MapControl from './components/MapControl';
import server from '@/server';
let map;

const getMap = ()=>{
  return map;
}

class App extends Component {
  state={
    showLeft:false,
    mapReady:false,
    selected:''
  }
  componentDidMount(){
    map = new Map(document.getElementById('map'),(map)=>{
      map.setSourceUrl(server.getUrl());
      console.log('ready',map);
      map.on('drawEnd',data=>{
        console.log(data,1111)
      })
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
  changeSelect(item){
    console.log('item',item)
    this.setState({
      selected:item
    })
  }
  render() {
    return (
      <div className="App fill">
        <PageHeader getMap={getMap} selected={this.state.selected} changeSelect={this.changeSelect.bind(this)} />
        <LeftTab getMap={getMap} map={map} showLeft={this.state.showLeft} toggleLeft = {this.toggleLeft.bind(this)} />
        {this.state.mapReady && <MapControl getMap={getMap} /> }
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
