import tool from './tool'

class DrawPolygonTool extends tool {
  constructor(map) {
    super()
    this.map = map

    this.geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    this.mouseUpLnglat = []
    this.mouseMoveLngLat = null
  }

  getName() {
    return "ploygon"
  }
  mouseMove(event) {
    this.mouseMoveLngLat = event.lngLat
    this.createIng(this.mouseUpLnglat)

  }
  mouseclick(event) {
    let features = this.map.queryRenderedFeatures(event.point, {
      layers: ['source-tooling-point']
    });
    for (let i = 0; i < features.length; i++) {
      let f = features[i]
      if (f.layer.id === "source-tooling-point") {
        let first=this.mouseUpLnglat[0]
        if (this.mouseUpLnglat.length > 0 && f.properties.id === first.time) {
          first.time=String(new Date().getTime())
          this.mouseUpLnglat.push(first)
          this.createEnd(this.mouseUpLnglat)
          this.createIng([])
        }
        return

      }
    }
    this.mouseUpLnglat.push({
      lnglat: event.lngLat,
      time: String(new Date().getTime())
    })
    this.createIng(this.mouseUpLnglat)
  }
  createIng(mouseUpLnglat) {
    let geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    geojsonData.features = this.createGeometry(mouseUpLnglat);
    this.map.getSource('source-tooling').setData(geojsonData);
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
export default DrawPolygonTool