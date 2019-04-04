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
    let geojsonData = metas.map(el=>{
      
      let geojson = new Wkt.Wkt().read(el.mt_databound).toJson();
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
    this.map.addSource('metadata',{
      "type": "geojson",
      data:{
        type:'FeatureCollection',
        features:geojsonData
      }
    })
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
}