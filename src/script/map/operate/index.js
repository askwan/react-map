import * as turf from '@turf/turf'
import Wkt from 'wicket'
// let context;
export default class Operate {
  constructor(context){
    this.context = context;
    this.map = context.getMap();
  }
  changeSource(metas) {
    if (metas.length === 0) {
      this.clearLayer();
      return false
    }
    let sourceId = metas.map(el => el.mt_uuid).join(',');
    let centers = [];
    let geojsonData = metas.map(el=>{
      let geojson = new Wkt.Wkt().read(el.mt_databound).toJson();
      let center = this.getPloygonCenter(geojson);
      center.properties = {
        uid:el.mt_uuid,
        mag:10
      }
      centers.push(center);
      let obj = {};
      obj.type = 'Feature';
      obj.properties = {
        uid: el.mt_uuid
      }
      obj.id = el.mt_uuid;
      obj.geometry = geojson;
      return obj
    })
    if (this.map.getLayer('meta-layer')) {
      this.clearLayer();
    }
    // console.log(centers,'centers')
    this.map.addSource('metadata',{
      "type": "geojson",
      data:{
        type:'FeatureCollection',
        features:geojsonData
      }
    });
    
    // this.map.addSource('centermeta',{
    //   "type": "geojson",
    //   data:{
    //     type:'FeatureCollection',
    //     features:centers
    //   }
    // })
    // this.addText();
    let url = `${this.context.sourceUrl}/tile/getTile?ids=${sourceId}&col={x}&row={y}&level={z}&bboxSR=3857`;
    
    let layer = {
      id: 'meta-layer',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          url
        ],
        tileSize: 256,
        
      },
      minzoom:8
    }
    
    this.map.addLayer(layer,'source-toolend-line');
    this.map.addLayer({
      "id": "metadata",
      "type": "line",
      "source": "metadata",
      "paint": {
        "line-color": "rgba(160, 9, 9, 1)",
        "line-width": 1
      },
      maxzoom:8
    })
  }

  clearLayer(){
    if(!this.map.getLayer('meta-layer')) return;
    this.map.removeLayer('meta-layer');
    this.map.removeLayer('metadata');
    this.map.removeSource('meta-layer');
    this.map.removeSource('metadata');
  }
  getArea(geomtry){
    let ploygon = turf.polygon(geomtry.coordinates);
    let area = turf.area(ploygon)/1000000;
    return area
  }
  getPloygonCenter(ploygon){
    let coords = ploygon.coordinates[0].map(el=>turf.point(el))
    let features = turf.featureCollection(coords);
    let center = turf.center(features);
    return center;
  }
  addText(){
    this.map.addLayer({
      id:'centermeta',
      source:'centermeta',
      type:'circle',
      paint:{
        "circle-radius":5,
        'circle-color':'#f00'
      }
    });
    this.map.addLayer({
      id:'metauid',
      source:'centermeta',
      type:'symbol',
      'layout': {
        'text-field': ['concat', ['to-string', ['get', 'mag']], 'm'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 12
        },
      'paint': {
      'text-color': 'rgba(0,0,0,0.5)'
      }
    })
  }
}