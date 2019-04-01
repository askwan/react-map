import Evented from '../utils/Evented'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoieHRwZ2t4ayIsImEiOiJSUEhldmhZIn0.dJzz5bXztrZRAViAdmQvyQ';
let map;
class Map extends Evented {
  constructor(container, callback) {
    super();
    this.initMap(container, callback)
    
    this.clickArr=[]
    this.mouseMoveArr=[]
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
    this.initEvent(map);
    if (typeof callback === 'function') callback(this);
  }
  initEvent(map) {
    map.on('mousemove', (event) => {
      this.fire('mousemove', {
        lngLat: event.lngLat
      })
    })
  }
  zoomTo(zoom) {
    map.zoomTo(zoom);
  }
  getZoom() {
    return map.getZoom();
  }

  drawPloygon() {
    this.mouseMove(true)
    this.mouseClick(true)
  }
  drawReatIcon() {

    console.log(222)
  }
  drawEarthIcon() {

    console.log(333)
  }
  mouseMove(open) {
    let move=(e)=> {
      this.mouseMoveArr.splice(this.mouseMoveArr.length-1,1,e.lngLat)
      // console.log(e,this.mouseMoveArr)

    }
    if (open) {
      map.on('mousemove', move);
    } else {
      map.off('mousemove', move);
    }
  }
  mouseClick(open) {
    let click=(e)=> {
      this.clickArr.push(e.lngLat)
      console.log(e,this.clickArr)

    }
    if (open) {
      map.on('click', click);
    } else {
      map.off('click', click);
      this.clickArr=[]
    }
  }
}

export default Map