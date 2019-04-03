import tool from './tool'

class DrawPolygonTool extends tool {
  constructor(map) {
    super("ploygonTool")
    this.mapjs = map
    this.mapboxMap = map.getMap()


    // this.geojsonData = {
    //   "type": "FeatureCollection",
    //   "features": []
    // }
    this.mouseUpLnglat = []
    this.mouseMoveLngLat = null
    this.mouseMoveLngLatOne = null

  }

  mouseMove(event) {
    this.mouseMoveLngLat = event.lngLat
    this.createIng()

//     console.log(this.mouseUpLnglat)
// if(this.mouseUpLnglat.length>1){
//  this.mouseUpLnglat.splice(0,1)
//     let lngLat = {
//       lnglat: event.lngLat,
//       time: String(new Date().getTime())
//     }
//     this.mouseUpLnglat.push(lngLat)

//     this.createIng()
// }
   

  }
  mouseclick(event) {
    let isEnd = false
    let isInPoint = false
    let lngLat = {
      lnglat: event.lngLat,
      time: String(new Date().getTime())
    }
    if (!this.mouseMoveLngLatOne) {
      this.mouseMoveLngLatOne = lngLat
    }

    let features = this.mapboxMap.queryRenderedFeatures(event.point, {
      layers: ['source-tooling-point']
    });
    for (let i = 0; i < features.length; i++) {
      let f = features[i]
      if (f.layer.id === "source-tooling-point") {
        isInPoint = true
        let first = this.mouseMoveLngLatOne

        if (this.mouseUpLnglat.length > 0 && f.properties.id === first.time) {
          isEnd = true
          first.time = String(new Date().getTime())
          this.mouseUpLnglat.push(first)
        }
      }
    }
    if (isInPoint) {
      if (isEnd) {
        this.createEnd()
      }
    } else {
      this.mouseUpLnglat.push(lngLat)
      this.createIng()
    }

  }
  createIng() {
    let geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    geojsonData.features = this.createGeometry(this.mouseUpLnglat);
    this.mapboxMap.getSource('source-tooling').setData(geojsonData);
  }
  createEnd() {

    let f = this.createGeometry(this.mouseUpLnglat)
    for (let i = 0; i < f.length; i++) {
      this.mapjs.source.geojsonData.features.push(f[i]);
    }
    this.mapboxMap.getSource('source-toolend').setData(this.mapjs.source.geojsonData);
    this.mouseUpLnglat = []
    this.mouseMoveLngLatOne = null
    this.createIng()

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
    if(mouseUpLnglat.length>0){
      let arr = [this.mouseMoveLngLat.lng, this.mouseMoveLngLat.lat]
      linestring.geometry.coordinates.push(arr)
      ploygonArr.push(arr)
    }
    featuresArr.push(linestring)
    if (ploygonArr.length > 2) {
      let length = ploygonArr.length
      if (ploygonArr[length - 1][0] !== this.mouseMoveLngLatOne.lnglat.lng && ploygonArr[length - 1][1] !== this.mouseMoveLngLatOne.lnglat.lat) {
        ploygonArr.push(ploygonArr[0])
      }
      ploygon.geometry.coordinates = [ploygonArr]
      featuresArr.push(ploygon)
    }
    return featuresArr

  }
}
export default DrawPolygonTool