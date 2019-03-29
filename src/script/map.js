import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = 'pk.eyJ1IjoieHRwZ2t4ayIsImEiOiJSUEhldmhZIn0.dJzz5bXztrZRAViAdmQvyQ';

class Map {
  constructor(container){
    this.initMap(container)
  }
  initMap(container){
    this.map = new mapboxgl.Map({
      container:container,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [113.650423, 34.746904], // starting position [lng, lat]
      zoom: 15, // starting zoom
      hash:true
    })
  }
}

export default Map