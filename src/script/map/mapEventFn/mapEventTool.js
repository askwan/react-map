import CreatePloygon from "../create/CreatePloygon"

let map
class MapEventTool {
  constructor() {
    this.create = {

    }
    this.geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    this.onType = ""
    this.mouseLeftLnglat = []
    this.mouseMoveLngLat = null
  }
  init(props) {
    let Ploygon = new CreatePloygon()
    this.create[Ploygon.getName()] = Ploygon

    map = props

    this.addAreaLayer()
  }
  setType(type) {
    this.onType = type
  }
  mouseMove(event) {
    if (this.onType) {
      this.mouseMoveLngLat = event.lngLat
      this.createGeometry(event)
    } else {
      this.mouseMoveArr = null
    }
  }
  mouseClick(event) {
    if (this.onType) {
      let features = map.queryRenderedFeatures(event.point, {
        layers: ['park-volcanoes']
      });
      for (let i = 0; i < features.length; i++) {
        let f = features[i]
        if (f.layer.id === "park-volcanoes") {
          return
        }
      }
      this.mouseLeftLnglat.push({
        lnglat: event.lngLat,
        time: String(new Date().getTime())
      })
      this.createGeometry(event)
    } else {
      this.mouseLeftLnglat = []
    }
  }
  createGeometry(event) {
//     if(!this.create[this.onType].orEnd(this.mouseMoveLngLat, this.mouseLeftLnglat)){
//       this.onType=""
// return
//     }
    this.geojsonData.features = this.create[this.onType].createPloygon(event, this.mouseMoveLngLat, this.mouseLeftLnglat);
    map.getSource('areaLayer-park').setData(this.geojsonData);
  }
  addAreaLayer() {
    map.addSource("areaLayer-park", {
      "type": "geojson",
      "data": this.geojsonData
    });

    map.addLayer({
      "id": "park-boundary",
      "type": "fill",
      "source": "areaLayer-park",
      "paint": {
        "fill-color": "#888888",
        "fill-opacity": 0.4
      },
      "filter": ["==", "$type", "Polygon"]
    });
    map.addLayer({
      "id": 'park-lines',
      "type": 'line',
      "source": 'areaLayer-park',
      "layout": {
        'line-cap': 'round',
        'line-join': 'round'
      },
      "paint": {
        'line-color': '#000',
        'line-width': 2.5
      },
      "filter": ['in', '$type', 'LineString']
    });
    map.addLayer({
      "id": "park-volcanoes",
      "type": "circle",
      "source": "areaLayer-park",
      "paint": {
        "circle-radius": 16,
        "circle-color": "#B42222"
      },
      "filter": ["==", "$type", "Point"],
    });
  }
}
let mapEventTool = new MapEventTool()
export default mapEventTool