import Evented from './utils/Evented'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoieHRwZ2t4ayIsImEiOiJSUEhldmhZIn0.dJzz5bXztrZRAViAdmQvyQ';
let map;
class Map extends Evented {
  constructor(container,callback){
    super();
    this.initMap(container,callback)
  }
  initMap(container,callback){
    map = new mapboxgl.Map({
      container:container,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [113.650423, 34.746904], // starting position [lng, lat]
      zoom: 15, // starting zoom
      hash:true,
      dragRotate:false,
      attributionControl:true,
      pitch: 0
    });
    this.initEvent(map);
    if(typeof callback === 'function') callback(this);
  }
  initEvent(map){
    map.on('mousemove',(event)=>{
      this.fire('mousemove',{lngLat:event.lngLat})
    })
  }
  zoomTo(zoom){
    map.zoomTo(zoom);
  }
  getZoom(){
    return map.getZoom();
  }
}

export default Map