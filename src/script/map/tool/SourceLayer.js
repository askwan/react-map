class SourceLayer {
  constructor(map) {
    this.map = map
    this.geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
  }
  addSource() {
    this.map.addSource("source-tooling", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });
    this.map.addSource("source-toolend", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });
    // this.map.addLayer({
    //   "id": "source-toolend-polygon",
    //   "type": "fill",
    //   "source": "source-toolend",
    //   "paint": {
    //     "fill-color": "#C0C4CC",
    //     "fill-opacity": 0
    //   },
    //   "filter": ["==", "$type", "Polygon"]
    // });

    this.map.addLayer({
      "id": "source-tooling-polygon",
      "type": "fill",
      "source": "source-tooling",
      "paint": {
        "fill-color": "#C0C4CC",
        "fill-opacity": 0.4
      },
      "filter": ["==", "$type", "Polygon"]
    });

    this.map.addLayer({
      "id": 'source-toolend-line',
      "type": 'line',
      "source": "source-toolend",
      "layout": {
        'line-cap': 'round',
        'line-join': 'round'
      },
      "paint": {
        'line-color': '#f2b478',
        'line-width': 2.5
      },
      "filter": ['in', '$type', 'LineString']
    });
    this.map.addLayer({
      "id": 'source-tooling-line',
      "type": 'line',
      "source": "source-tooling",
      "layout": {
        'line-cap': 'round',
        'line-join': 'round'
      },
      "paint": {
        'line-color': '#409EFF',
        'line-width': 2.5
      },
      "filter": ['in', '$type', 'LineString']
    });
    // this.map.addLayer({
    //   "id": "source-toolend-point",
    //   "type": "circle",
    //   "source": "source-toolend",
    //   "paint": {
    //     "circle-radius": 8,
    //     "circle-color": "#F56C6C"
    //   },
    //   "filter": ["==", "$type", "Point"],
    // });
    this.map.addLayer({
      "id": "source-tooling-point",
      "type": "circle",
      "source": "source-tooling",
      "paint": {
        "circle-radius": 8,
        "circle-color": "#F56C6C",
        "circle-opacity": 1
      },
      "filter": ["==", "$type", "Point"],
    });
  }
}
export default SourceLayer