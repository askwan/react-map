import tool from './tool'
import * as turf from '@turf/turf'

class DrawCircleTool extends tool {
  constructor(map) {
    super("circleTool")
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
      geojsonData.features = this.createGeometry(startLngLat, moveLnglat, true);
    }
    return geojsonData;
  }
  createEnd(startLngLat, endLngLat, geojsonData) {
    let f = this.createGeometry(startLngLat, endLngLat, false)
    for (let i = 0; i < f.length; i++) {
      geojsonData.features.push(f[i]);
    }
    console.log(geojsonData)
    return geojsonData
  }
  createGeometry(one, two, show) {
    let featuresArr = []
    let start = [one.lng, one.lat]
    let end = [two.lng, two.lat]
    let linestring = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };
    if (show) {
      linestring.geometry.coordinates.push(start)
      linestring.geometry.coordinates.push(end)
    } else {
      let from = turf.point(start);
      let to = turf.point(end);
      let distance = turf.distance(from, to, {
        units: 'miles'
      });
      let center = start;
      let radius = distance;
      let options = {
        steps: 180,
        units: 'miles'
      };
      let circle = turf.circle(center, radius, options);
      for (let i = 0; i < circle.geometry.coordinates[0].length; i++) {
        let g = circle.geometry.coordinates[0][i]
        linestring.geometry.coordinates.push(g)
      }
      this.polygonData = circle.geometry
    }
    featuresArr.push(linestring)
    return featuresArr
  }
}
export default DrawCircleTool