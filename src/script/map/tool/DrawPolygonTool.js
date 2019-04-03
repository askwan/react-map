import tool from './tool'

class DrawPolygonTool extends tool {
  constructor(map) {
    super("ploygonTool")
    this.mapjs = map
    this.mapboxMap = map.getMap()

    this.polygonData = null

    this.lnglatArr = []
    this.moveLnglat = null
    this.firstLnglat = null
  }

  mouseMove(event) {
    this.moveLnglat = event.lngLat
    this.setStartData(this.createIng(this.lnglatArr, this.moveLnglat, this.firstLnglat))
  }
  mouseclick(event) {
    let isEnd = false
    let isInPoint = false
    let lngLat = {
      lnglat: event.lngLat,
      time: String(new Date().getTime())
    }
    if (!this.firstLnglat) {
      this.firstLnglat = lngLat
    }

    let features = this.mapboxMap.queryRenderedFeatures(event.point, {
      layers: ['source-tooling-point']
    });
    for (let i = 0; i < features.length; i++) {
      let f = features[i]
      if (f.layer.id === "source-tooling-point") {
        isInPoint = true
        let first = this.firstLnglat

        if (this.lnglatArr.length > 0 && f.properties.id === first.time) {
          isEnd = true
          first.time = String(new Date().getTime())
          this.lnglatArr.push(first)
        }
      }
    }
    if (isInPoint) {
      if (isEnd) {
        this.setEndData(this.createEnd(this.lnglatArr, this.moveLnglat, this.firstLnglat, this.mapjs.source.geojsonData))
        this.mapjs.drawEndFn(this.polygonData)

      }
    } else {
      this.lnglatArr.push(lngLat)
      this.setStartData(this.createIng(this.lnglatArr, this.moveLnglat, this.firstLnglat))
    }

  }
  setStartData(jsonData) {
    this.mapboxMap.getSource('source-tooling').setData(jsonData);
  }
  setEndData(jsonData) {
    this.mapboxMap.getSource('source-toolend').setData(jsonData);
    console.log(jsonData)

    this.clearData()
    this.setStartData(this.createIng(this.lnglatArr, this.moveLnglat, this.firstLnglat))
  }
  clearData() {
    this.lnglatArr = []
    this.firstLnglat = null
  }
  createIng(lnglatArr, moveLnglat, firstLnglat) {
    let geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    geojsonData.features = this.createGeometry(lnglatArr, moveLnglat, firstLnglat,true);
    return geojsonData
  }
  createEnd(lnglatArr, moveLnglat, firstLnglat, geojsonData) {
    let f = this.createGeometry(lnglatArr, moveLnglat, firstLnglat,false)
    for (let i = 0; i < f.length; i++) {
      geojsonData.features.push(f[i]);
    }
    return geojsonData
  }
  createGeometry(lnglatArr, moveLnglat, firstLnglat,show) {
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
    for (let i = 0; i < lnglatArr.length; i++) {
      let lnglat = lnglatArr[i].lnglat
      let time = lnglatArr[i].time
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
      if(show){
        featuresArr.push(point)
      }
      linestring.geometry.coordinates.push(arr)
      ploygonArr.push(arr)
    }
    if (show&&lnglatArr.length > 0) {
      let arr = [moveLnglat.lng, moveLnglat.lat]
      linestring.geometry.coordinates.push(arr)
      ploygonArr.push(arr)
    }

    featuresArr.push(linestring)
    if (ploygonArr.length > 2) {
      let length = ploygonArr.length
      if (ploygonArr[length - 1][0] !== firstLnglat.lnglat.lng && ploygonArr[length - 1][1] !== firstLnglat.lnglat.lat) {
        ploygonArr.push(ploygonArr[0])
      }
      ploygon.geometry.coordinates = [ploygonArr]
      this.polygonData = ploygon.geometry

      featuresArr.push(ploygon)
    }
    return featuresArr

  }
}
export default DrawPolygonTool