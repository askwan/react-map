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
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [113.650423, 34.746904], // starting position [lng, lat]
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
      // map.off('mousemove',lngLatFn)
      let source = new SourceLayer(map)
      source.addSource()
      let polygonTool = new DrawPolygonTool(map)
      this.tool[polygonTool.getName()] = polygonTool
      let pointTool = new DrawPointTool(map)
      this.tool[pointTool.getName()] = pointTool
      let rectangleTool = new DrawRectangleTool(map)
      this.tool[rectangleTool.getName()] = rectangleTool
      if (typeof callback === 'function') callback(this);

    });
  }

  asd() {
    console.log(9999999)
  }
  zoomTo(zoom) {
    map.zoomTo(zoom);
  }
  getZoom() {
    return map.getZoom();
  }

  drawGeometry(type) {
    // if (this.status != type) {
    for (let i in this.tool) {
      this.tool[i].unactive()
    }
    // }
    console.log(this.tool, type)
    this.tool[type].active()
  }


}

export default Map