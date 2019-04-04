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
import MaskLayer from './components/MaskLayer';
import * as turf from '@turf/turf'
import { Modal } from 'antd';
let map;

const getMap = ()=>{
  return map;
}

class App extends Component {
  state={
    showLeft:false,
    mapReady:false,
    selected:'',
    metadatalist:[],
    isAjax:false,
    warning:false
  }
  componentDidMount(){
    
    map = new Map(document.getElementById('map'),(map)=>{
      map.setSourceUrl(server.getUrl());
      console.log('ready',map);
      map.on('drawEnd',data=>{
        console.log(data,'dfafa')
        let bool = this.adjustArea(data.geojsonData);
        console.log(bool,'bool')
        if(bool) {
          this.setState({
            warning:true
          })
        }
        

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
  adjustArea(geomtry){
    console.log(geomtry,'geom')
    let ploygon = turf.polygon(geomtry.coordinates);
    let area = turf.area(ploygon);
    console.log(area,7777);
    if(area>100000){
      return false
    }else {
      return true
    }
  }
  getAreaData(geoGsonStr){
    this.setState({
      isAjax:true
    })
    server.imageServer.queryByArea(geoGsonStr).then(metadata=>{
      console.log(metadata,'metaData')
      this.state.metadatalist.push(metadata);
      let metadatalist = this.state.metadatalist.map(el=>el.clearSelect());
      this.setState({
        metadatalist:metadatalist,
        showLeft:true,
        isAjax:false
      });
      map.clearLayer();
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
    let metadatalist = this.state.metadatalist;
    metadatalist.map(el=>el.clearSelect());
    metadata.selects = ids;
    console.log(metadatalist,78888888888888)
    this.setState({
      metadatalist:metadatalist
    })
  }
  cancel(){
   this.setState({
     warning:false
   }) 
  }
  render() {
    return (
      <div className="App fill">
        {this.state.isAjax===true && <MaskLayer />}
        <PageHeader getMap={getMap} selected={this.state.selected} changeSelect={this.changeSelect.bind(this)} />
        <LeftTab getMap={getMap} map={map} showLeft={this.state.showLeft} toggleLeft = {this.toggleLeft.bind(this)} metadatalist={this.state.metadatalist} selectMeta={this.selectMeta.bind(this)} />
        {this.state.mapReady && <MapControl getMap={getMap} /> }
        <div id="map"></div>
        <Modal visible={this.state.warning} title="警告" onCancel={this.cancel.bind(this)} footer={null}>
          <span>区域过大</span>
        </Modal>
      </div>
    );
  }
}

export default App;
