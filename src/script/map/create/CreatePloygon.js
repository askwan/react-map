class CreatePloygon {
  constructor() {}

  getName() {
    return "Ploygon"
  }
  orEnd(mouseMoveLngLat, mouseLeftLnglat) {
    let lnglat = mouseLeftLnglat[0].lnglat
    let arr = [lnglat.lng, lnglat.lat]
    if (lnglat.lng === mouseMoveLngLat.lng && lnglat.lat === mouseMoveLngLat.lat) {
      return false
    }

  }
  createPloygon(event, mouseMoveLngLat, mouseLeftLnglat) {
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
    for (let i = 0; i < mouseLeftLnglat.length; i++) {
      let lnglat = mouseLeftLnglat[i].lnglat
      let time = mouseLeftLnglat[i].time
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
    // console.log(featuresArr)

  }
}
export default CreatePloygon