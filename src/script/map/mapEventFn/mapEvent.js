class MapEvent {
  constructor(map) {
    this.map = map

    this.geojsonData = {
      "type": "FeatureCollection",
      "features": []
    }
    this.clickArr = []
    this.mouseMoveArr = null
  }
  mouseMove(event, drawMap) {
    if (drawMap) {
      this.mouseMoveArr = event.lngLat
      this.createPloygon(event)
    } else {
      this.mouseMoveArr = null
    }
  }
  mouseClick(open) {
    let click = (e) => {
      this.clickArr.push(e.lngLat)
      console.log(e, this.clickArr)
    }
    if (open) {
      this.map.on('click', click);
    } else {
      this.map.off('click', click);
      this.clickArr = []
    }
  }
  createPloygon(event) {
    let features = this.map.queryRenderedFeatures(event.point, {
      layers: ['park-volcanoes']
    });
    if (this.clickArr.length > 1) {
      this.clickArr.pop();
    }
    let lngLat = [event.lngLat.lng,
      event.lngLat.lat
    ]
    let point = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": lngLat
      },
      "properties": {
        "id": String(new Date().getTime())
      }
    }
    let linestring = {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": []
      }
    };
    this.mouseMoveArr=point

    if (features.length) {
      features.pop();
    }
    this.geojsonData.features.push(point);

    if (this.clickArr.length > 0) {
      linestring.geometry.coordinates = this.geojsonData.features.map(function (point) {
        return point.geometry.coordinates;
      });

      this.geojsonData.features.push(linestring);
    }
    console.log(this.geojsonData)
    this.map.getSource('areaLayer-park').setData(this.geojsonData);
  }
  addAreaLayer() {
    this.map.addSource("areaLayer-park", {
      "type": "geojson",
      "data": this.geojsonData
    });

    this.map.addLayer({
      "id": "park-boundary",
      "type": "fill",
      "source": "areaLayer-park",
      "paint": {
        "fill-color": "#888888",
        "fill-opacity": 0.4
      },
      "filter": ["==", "$type", "Polygon"]
    });
    this.map.addLayer({
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
    this.map.addLayer({
      "id": "park-volcanoes",
      "type": "circle",
      "source": "areaLayer-park",
      "paint": {
        "circle-radius": 6,
        "circle-color": "#B42222"
      },
      "filter": ["==", "$type", "Point"],
    });
  }
}
export default MapEvent