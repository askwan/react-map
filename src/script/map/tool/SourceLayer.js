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
    //     "fill-opacity": 1
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
  addMetaLayer(){
    this.map.addSource('metadata',{
      "type": "geojson",
      data:{
        type:'FeatureCollection',
        features:[]
      }
    });
    this.map.addSource('centermeta',{
      "type": "geojson",
      data:{
        type:'FeatureCollection',
        features:[]
      }
    });
    this.map.addSource('meta-layer',{
      "type": "vector",
      tiles:[]
    })
    // this.map.addLayer({
    //   id: 'meta-layer',
    //   type: 'raster',
    //   source: {
    //     type: 'raster',
    //     tiles: [],
    //     tileSize: 256,
    //   },
    //   minzoom:8
    // })

    this.map.addLayer({
      "id": "metadata",
      "type": "line",
      "source": "metadata",
      "paint": {
        "line-color": "rgba(160, 9, 9, 1)",
        "line-width": 1
      },
      maxzoom:8
    });
    this.map.addLayer({
      id:'metauid',
      source:'centermeta',
      type:'symbol',
      'layout': {
        'text-field': ['get','uid'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        "text-size": 10,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.05,
        "text-offset": [0, 1.5]
        },
      'paint': {
        "text-color": "#202",
        "text-halo-color": "#fff",
        "text-halo-width": 2
      },
      maxzoom:8
    });
  }
}
export default SourceLayer