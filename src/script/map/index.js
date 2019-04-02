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
      style: 'mapbox://styles/mapbox/streets-v11',
      // style:{
      //   version: 8,
      //   sources:{
      //     'raster-tiles': {
      //       type: 'raster',
      //       tiles: [
      //         'http://www.google.cn/maps/vt?lyrs=s@781&gl=cn&x={x}&y={y}&z={z}'
      //       ],
      //       tileSize: 256,
      //       minzoom: 0,
      //       maxzoom: 22
      //     },
      //   },
      //   layers:[{
      //     id: 'raster-tiles',
      //     type: 'raster',
      //     source: 'raster-tiles',
      //     minzoom: 0,
      //     maxzoom: 22
      //   }]
      // },
      center: [110.766, 44.2411], // starting position [lng, lat]
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
  setSourceUrl(url){
    this.sourceUrl = url;
  }
  changeSource(metas){
    if(metas.length===0) {
      map.removeLayer('meta-layer');
      map.removeSource('meta-layer');
      return false
    }
    let sourceId = metas.map(el=>el.mt_thumbimg).join(',');
    let url = `${this.sourceUrl}/tile/getTile?mtThumbimgs=${sourceId}&col={x}&row={y}&level={z}&bboxSR=3857`;
    if(map.getLayer('meta-layer')){
      map.removeLayer('meta-layer');
      map.removeSource('meta-layer');
    }
    let layer = {
      id:'meta-layer',
      type:'raster',
      source:{
        type:'raster',
        tiles:[
          url
        ],
        tileSize:256
      }
    }
    map.addLayer(layer);
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