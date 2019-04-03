import tool from './tool'

class DrawRectangleTool extends tool {
  constructor(map) {
    super("rectangleTool")
    this.mapjs = map
    this.mapboxMap = map.getMap()

    this.polygonData = null

    this.moveLnglat = null;
    this.startLngLat = null;
    this.endLngLat = null;

  }

  mouseMove(event) {
    this.moveLnglat = event.lngLat
    this.setStartData(this.createIng(this.startLngLat, this.moveLnglat))

  }
  mouseclick(event) {
    if (this.startLngLat) {
      this.endLngLat = event.lngLat
      this.setEndData(this.createEnd(this.startLngLat, this.endLngLat, this.mapjs.source.geojsonData))
      this.mapjs.drawEndFn(this.polygonData)
    } else {
      this.startLngLat = event.lngLat
      this.setStartData(this.createIng(this.startLngLat, this.moveLnglat))
    }
  }
  setStartData(jsonData) {
    this.mapboxMap.getSource('source-tooling').setData(jsonData);
  }
  setEndData(jsonData) {
    this.mapboxMap.getSource('source-toolend').setData(jsonData);
    this.clearData()
    this.setStartData(this.createIng(this.startLngLat, this.moveLnglat))
  }
  clearData() {
    this.startLngLat = null
    this.endLngLat = null
  }
  createIng(startLngLat, moveLnglat) {
    let geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    if (startLngLat && moveLnglat) {
      geojsonData.features = this.createGeometry(startLngLat, moveLnglat);
    }
    return geojsonData;
  }
  createEnd(startLngLat, endLngLat, geojsonData) {

    let f = this.createGeometry(startLngLat, endLngLat)
    for (let i = 0; i < f.length; i++) {
      geojsonData.features.push(f[i]);
    }
    return geojsonData

  }

  createGeometry(one, two) {
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
    let minLng = one.lng > two.lng ? two.lng : one.lng
    let minLat = one.lat > two.lat ? two.lat : one.lat
    let maxLng = one.lng <= two.lng ? two.lng : one.lng
    let maxLat = one.lat <= two.lat ? two.lat : one.lat
    linestring.geometry.coordinates.push([minLng, minLat])
    linestring.geometry.coordinates.push([minLng, maxLat])
    linestring.geometry.coordinates.push([maxLng, maxLat])
    linestring.geometry.coordinates.push([maxLng, minLat])
    linestring.geometry.coordinates.push([minLng, minLat])

    ploygonArr.push([minLng, minLat])
    ploygonArr.push([minLng, maxLat])
    ploygonArr.push([maxLng, maxLat])
    ploygonArr.push([maxLng, minLat])
    ploygonArr.push([minLng, minLat])

    ploygon.geometry.coordinates = [ploygonArr]
    this.polygonData = ploygon.geometry
    featuresArr.push(linestring)
    featuresArr.push(ploygon)

    return featuresArr

  }
}
export default DrawRectangleTool