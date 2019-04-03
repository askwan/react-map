import Evented from './../utils/Evented'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import SourceLayer from './tool/SourceLayer'
import DrawPolygonTool from './tool/DrawPolygonTool'
import DrawPointTool from './tool/DrawPointTool'
import DrawRectangleTool from './tool/DrawRectangleTool'

mapboxgl.accessToken = 'pk.eyJ1IjoieHRwZ2t4ayIsImEiOiJSUEhldmhZIn0.dJzz5bXztrZRAViAdmQvyQ';

let map;


class Map extends Evented {
  constructor(container, callback) {
    super()
    this.initMap(container, callback)

    this.tool = {}
    this.status = ""

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
          lngLat: event.lngLat
        })
      }
      map.on('mousemove', lngLatFn)
      let source = new SourceLayer(map)
      source.addSource()
      let polygonTool = new DrawPolygonTool(this)
      this.tool[polygonTool.getName()] = polygonTool
      let pointTool = new DrawPointTool(this)
      this.tool[pointTool.getName()] = pointTool
      let rectangleTool = new DrawRectangleTool(this)
      this.tool[rectangleTool.getName()] = rectangleTool
      if (typeof callback === 'function') callback(this);

    });
  }
  getMap(){
    return map
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
    map.addLayer(layer);
  }

  zoomTo(zoom) {
    map.zoomTo(zoom);
  }
  getZoom() {
    return map.getZoom();
  }
  drawGeometry(type) {
    for (let i in this.tool) {
      this.tool[i].unactive()
    }
    this.tool[type].active()
  }
}

export default Map