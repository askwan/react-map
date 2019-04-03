import React, { Component } from 'react';
// import logo from './logo.svg';

import './assets/App.scss';
import './assets/public/index.scss';
import Map from './script/map'
import LeftTab from './components/LeftTab';
import PageHeader from './components/PageHeader';
import MapControl from './components/MapControl';
import server from '@/server';
import Wkt from 'wicket'
let map;

const getMap = ()=>{
  return map;
}

class App extends Component {
  state={
    showLeft:false,
    mapReady:false,
    selected:'',
    metadatalist:[]
  }
  componentDidMount(){
    
    map = new Map(document.getElementById('map'),(map)=>{
      map.setSourceUrl(server.getUrl());
      console.log('ready',map);
      map.on('drawEnd',data=>{
        let wkt = new Wkt.Wkt()
        wkt.fromObject(data.geojsonData)
        let geoGsonStr = wkt.write();
        this.getAreaData(geoGsonStr);
      })
      this.setState({
        mapReady:true
      })
    })
  }
  getAreaData(geoGsonStr){
    server.imageServer.queryByArea(geoGsonStr).then(metadata=>{
      console.log(metadata,'metaData')
      this.state.metadatalist.push(metadata);
      this.setState({
        metadatalist:this.state.metadatalist,
        showLeft:true
      });
      // console.log(this.state.metadatalist)
    })
  }
  toggleLeft(bool){
    this.setState({
      showLeft: bool
    })
  }
  changeSelect(item){
    this.setState({
      selected:item
    })
  }
  selectMeta(metadata,ids,metas){
    console.log(metadata,'selectmeta');
    let aim = this.state.metadatalist.find(el=>el.id === metadata.id);
    aim.selects = ids;
    this.setState({
      metadatalist:this.state.metadatalist
    })
  }
  render() {
    return (
      <div className="App fill">
        <PageHeader getMap={getMap} selected={this.state.selected} changeSelect={this.changeSelect.bind(this)} />
        <LeftTab getMap={getMap} map={map} showLeft={this.state.showLeft} toggleLeft = {this.toggleLeft.bind(this)} metadatalist={this.state.metadatalist} selectMeta={this.selectMeta.bind(this)} />
        {this.state.mapReady && <MapControl getMap={getMap} /> }
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
