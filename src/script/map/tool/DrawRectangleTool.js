import tool from './tool'

class DrawRectangleTool extends tool {
  constructor(map) {
    super()
    this.mapjs=map
    this.map = map.getMap()

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
    this.createIng()

  }
  mouseclick(event) {
    if (this.mouseMoveLngLatOne) {
      this.mouseMoveLngLatTwo = event.lngLat
      this.createEnd()
      this.mapjs.drawEndFn(this.geojsonData)

    } else {
      this.mouseMoveLngLatOne = event.lngLat
      this.createIng()
    }

  }
  createIng() {
    let geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    if(this.mouseMoveLngLatOne&&this.mouseMoveLngLat){
   geojsonData.features = this.createGeometry(this.mouseMoveLngLatOne,this.mouseMoveLngLat);
    }
    this.map.getSource('source-tooling').setData(geojsonData);
  }
  createEnd() {

    let f = this.createGeometry(this.mouseMoveLngLatOne,this.mouseMoveLngLatTwo)
    for (let i = 0; i < f.length; i++) {
      this.geojsonData.features.push(f[i]);
    }
    this.map.getSource('source-toolend').setData(this.geojsonData);
    this.mouseMoveLngLatOne = null
    this.mouseMoveLngLatTwo = null
    this.createIng()
  }
  createGeometry(one,two) {
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
    let minLng=one.lng>two.lng?two.lng:one.lng
    let minLat=one.lat>two.lat?two.lat:one.lat
    let maxLng=one.lng<=two.lng?two.lng:one.lng
    let maxLat=one.lat<=two.lat?two.lat:one.lat
    linestring.geometry.coordinates.push([minLng, minLat])
    linestring.geometry.coordinates.push([minLng, maxLat])
    linestring.geometry.coordinates.push([maxLng, maxLat])
    linestring.geometry.coordinates.push([maxLng, minLat])
    linestring.geometry.coordinates.push([minLng, minLat])

    ploygonArr.push([minLng, minLat])
    ploygonArr.push([minLng, maxLat])
    ploygonArr.push([maxLng, maxLat])
    ploygonArr.push([maxLng, minLat])
  
    ploygon.geometry.coordinates = [ploygonArr]

    featuresArr.push(linestring)
    featuresArr.push(ploygon)
    
    return featuresArr

  }
}
export default DrawRectangleTool