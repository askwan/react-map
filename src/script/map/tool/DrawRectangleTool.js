import tool from './tool'
import * as turf from '@turf/turf'
class DrawRectangleTool extends tool {
  constructor(map) {
    super("rectangleTool")
    this.mapjs = map
    this.mapboxMap = map.getMap()

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
      this.sendData()
    } else {
      this.startLngLat = event.lngLat
      this.setStartData(this.createIng(this.startLngLat, this.moveLnglat))
    }
  }
  setStartData(jsonData) {
    console.log(jsonData)
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
      geojsonData.features = this.createGeometry(startLngLat, moveLnglat, true);
    }
    return geojsonData;
  }
  createEnd(startLngLat, endLngLat, geojsonData) {

    let f = this.createGeometry(startLngLat, endLngLat, false)
    for (let i = 0; i < f.length; i++) {
      geojsonData.features.push(f[i]);
    }
    return geojsonData

  }

  createGeometry(one, two, show) {
    let featuresArr = []

    let linestring = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };

    let turfFn = turf.featureCollection([
      turf.point([one.lng, one.lat]),
      turf.point([two.lng, two.lat])
    ]);
    let enveloped = turf.envelope(turfFn);
    for (let i = 0; i < enveloped.geometry.coordinates[0].length; i++) {
      let g = enveloped.geometry.coordinates[0][i]
      linestring.geometry.coordinates.push(g)
    }
    if (show) {
      featuresArr.push(enveloped)
    }
    this.polygonData = enveloped.geometry
    featuresArr.push(linestring)
    return featuresArr
  }
}
export default DrawRectangleTool