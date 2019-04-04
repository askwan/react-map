import Evented from '../utils/Evented'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import SourceLayer from './tool/SourceLayer'
import DrawPolygonTool from './tool/DrawPolygonTool'
import DrawCircleTool from './tool/DrawCircleTool'
import DrawRectangleTool from './tool/DrawRectangleTool'
import Wkt from 'wicket'
import Operate from './operate';

mapboxgl.accessToken = 'pk.eyJ1IjoieHRwZ2t4ayIsImEiOiJSUEhldmhZIn0.dJzz5bXztrZRAViAdmQvyQ';

let map;


class Map extends Evented {
  constructor(container, callback) {
    super()
    this.initMap(container, callback)

    this.tool = {}
    this.source = ""
    this.drawStatus=null
  }
  initMap(container, callback) {
    map = new mapboxgl.Map({
      container: container,
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'http://www.google.cn/maps/vt?lyrs=s@781&gl=cn&x={x}&y={y}&z={z}'
            ],
            tileSize: 256,
            minzoom: 0,
            maxzoom: 22
          },
        },
        layers: [{
          id: 'raster-tiles',
          type: 'raster',
          source: 'raster-tiles',
          minzoom: 0,
          maxzoom: 22
        }]
      },
      center: [110.766, 44.2411], // starting position [lng, lat]
      zoom: 8, // starting zoom
      hash: true,
      dragRotate: false,
      pitchWithRotate:true,
      pitch: 0
    });
    map.on("load", () => {
      let lngLatFn = (event) => {
        this.fire('mousemove', {
          lngLat: event.lngLat,
          point: event.point
        })
      }
      map.on('mousemove', lngLatFn)
      this.source = new SourceLayer(map)
      this.source.addSource()
      let polygonTool = new DrawPolygonTool(this)
      this.tool[polygonTool.getName()] = polygonTool
      let circleTool = new DrawCircleTool(this)
      this.tool[circleTool.getName()] = circleTool
      let rectangleTool = new DrawRectangleTool(this)
      this.tool[rectangleTool.getName()] = rectangleTool
      if (typeof callback === 'function') callback(this);
      this.operate = new Operate(this);
    });
  }
  getMap() {
    return map
  }
  drawEndFn(data) {
    this.clearDraw()
    this.fire('drawEnd', {
      geojsonData: data.geojsonData,
      area: data.areaData
    })
  }
  calculateArea(){
    if(this.drawStatus){
      return this.tool[this.drawStatus].calculateArea()
    }
  }
  setSourceUrl(url) {
    this.sourceUrl = url;
  }
  changeSource(metas) {
    this.operate.changeSource(metas);
  }

  clearLayer(){
    this.operate.clearLayer();
  }

  zoomTo(zoom) {
    map.zoomTo(zoom);
  }
  getZoom() {
    return map.getZoom();
  }
  drawGeometry(type) {
    this.clearDraw()
    let name = type + "Tool"
    this.tool[name].active()
    this.drawStatus=name
  }
  clearDraw() {
    for (let i in this.tool) {
      this.tool[i].unactive()
    }
    this.drawStatus=null
  }
  clearDrawLastOne(){
    this.source.geojsonData.features.splice(-1,1)
    map.getSource('source-toolend').setData(this.source.geojsonData);
  }
}

export default Map