import tool from './tool'

class DrawRectangleTool extends tool {
  constructor(map) {
    super()
    this.map = map

    this.geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    this.mouseMoveLngLat = null
    this.mouseMoveLngLatOne = null
    this.mouseMoveLngLatTwo = null
  }
  getName() {
    return "rectangle"
  }
  mouseMove(event) {
    this.mouseMoveLngLat = event.lngLat

  }
  mouseUp(event) {
if(this.mouseMoveLngLatOne){
  this.mouseMoveLngLatTwo = event.lngLat
}else{
  this.mouseMoveLngLatOne = event.lngLat
}
    
    this.createIng()

  }
  createIng() {
    let geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    // geojsonData.features = this.createGeometry(mouseUpLnglat);
    // this.map.getSource('source-tooling').setData(geojsonData);
  }
  createEnd(mouseUpLnglat) {

    let f = this.createGeometry(mouseUpLnglat)
    for (let i = 0; i < f.length; i++) {
      this.geojsonData.features.push(f[i]);
    }
    this.map.getSource('source-toolend').setData(this.geojsonData);
    this.mouseUpLnglat = []

  }
  createGeometry(mouseUpLnglat) {
    let featuresArr = []
    let ploygonArr = []

    let linestring = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };
    let ploygon = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      }
    };
    for (let i = 0; i < mouseUpLnglat.length; i++) {
      let lnglat = mouseUpLnglat[i].lnglat
      let time = mouseUpLnglat[i].time
      let arr = [lnglat.lng, lnglat.lat]

      let point = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": arr
        },
        "properties": {
          "id": time
        }
      }
      featuresArr.push(point)

      linestring.geometry.coordinates.push(arr)
      ploygonArr.push(arr)
    }
    featuresArr.push(linestring)
    if (ploygonArr.length > 2) {
      if (ploygonArr[0][0] !== ploygonArr[ploygonArr.length - 1][0] && ploygonArr[0][1] !== ploygonArr[ploygonArr.length - 1][1]) {
        ploygonArr.push(ploygonArr[0])
      }
      ploygon.geometry.coordinates = [ploygonArr]
      featuresArr.push(ploygon)

    }
    return featuresArr

  }
}
export default DrawRectangleTool