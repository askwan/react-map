import Evented from '../utils/Evented'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import SourceLayer from './tool/SourceLayer'
import DrawPolygonTool from './tool/DrawPolygonTool'
import DrawCircleTool from './tool/DrawCircleTool'
import DrawRectangleTool from './tool/DrawRectangleTool'

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
      zoom: 15, // starting zoom
      hash: true,
      dragRotate: false,
      attributionControl: true,
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
    if (metas.length === 0) {
      map.removeLayer('meta-layer');
      map.removeSource('meta-layer');
      return false
    }
    let sourceId = metas.map(el => el.mt_thumbimg).join(',');
    let url = `${this.sourceUrl}/tile/getTile?mtThumbimgs=${sourceId}&col={x}&row={y}&level={z}&bboxSR=3857`;
    if (map.getLayer('meta-layer')) {
      map.removeLayer('meta-layer');
      map.removeSource('meta-layer');
    }
    let layer = {
      id: 'meta-layer',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          url
        ],
        tileSize: 256
      }
    }
    map.addLayer(layer, 'source-tooling-polygon');
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
}

export default Map