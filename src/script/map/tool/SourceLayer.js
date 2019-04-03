class SourceLayer {
  constructor(map) {
    this.map = map
  }
  addSource() {
    this.map.addSource("source-tooling", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });

    this.map.addLayer({
      "id": "source-tooling-polygon",
      "type": "fill",
      "source": "source-tooling",
      "paint": {
        "fill-color": "#888888",
        "fill-opacity": 0.4
      },
      "filter": ["==", "$type", "Polygon"]
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
        'line-color': '#000',
        'line-width': 2.5
      },
      "filter": ['in', '$type', 'LineString']
    });
    this.map.addLayer({
      "id": "source-tooling-point",
      "type": "circle",
      "source": "source-tooling",
      "paint": {
        "circle-radius": 6,
        "circle-color": "#B42222"
      },
      "filter": ["==", "$type", "Point"],
    });
    this.map.addSource("source-toolend", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }
    });

    this.map.addLayer({
      "id": "source-toolend-polygon",
      "type": "fill",
      "source": "source-toolend",
      "paint": {
        "fill-color": "#888888",
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
        'line-color': '#000',
        'line-width': 2.5
      },
      "filter": ['in', '$type', 'LineString']
    });
    this.map.addLayer({
      "id": "source-toolend-point",
      "type": "circle",
      "source": "source-toolend",
      "paint": {
        "circle-radius": 6,
        "circle-color": "#B42222"
      },
      "filter": ["==", "$type", "Point"],
    });
  }
}
export default SourceLayer