// import Evented from '../utils/Evented'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapEventFn from './mapEventFn/MapEventFn'
mapboxgl.accessToken = 'pk.eyJ1IjoieHRwZ2t4ayIsImEiOiJSUEhldmhZIn0.dJzz5bXztrZRAViAdmQvyQ';

let map;
let mapEventFn;
class Map {
  constructor(container, callback) {
    // super();
    this.initMap(container, callback)

    this.drawMap = false

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
      mapEventFn = new MapEventFn(map)
      if (typeof callback === 'function') callback(this);
    });
  }
  getMapEventFn(){
    return mapEventFn
  }
  zoomTo(zoom) {
    map.zoomTo(zoom);
  }
  getZoom() {
    return map.getZoom();
  }

  drawPloygon() {
    this.drawMap = true
    mapEventFn.mouseClick(true)

  }
  drawReatIcon() {

    console.log(222)
  }
  drawEarthIcon() {

    console.log(333)
  }


}

export default Map