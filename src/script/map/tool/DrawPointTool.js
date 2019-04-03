import tool from './tool'

class DrawPointTool extends tool {
  constructor(map) {
    super("pointTool")
    this.mapjs = map
    this.mapboxMap = map.getMap()

    this.mouseUpLnglat = []
    this.mouseMoveLngLat = null
    this.mouseMoveLngLatOne = null
  }
 
  mouseMove(event) {
    console.log(111111)
    this.mouseMoveLngLat = event.lngLat
    this.createIng()
  }
  mouseUp() {
    console.log(22222222)

  }

  mouseclick(event){
    let isEnd = false
    let isInPoint = false
    let lngLat = {
      lnglat: event.lngLat,
      time: String(new Date().getTime())
    }


    let features = this.mapboxMap.queryRenderedFeatures(event.point, {      //在某一点上查找所有特性
      layers: ['source-tooling-point']
    });

    /******* */
    for (let i = 0; i < features.length; i++) {
      let f = features[i]
      if (f.layer.id === "source-tooling-point") {

      }
    }
    /****** */

    //判断是否是两点
    if(this.mouseUpLnglat.length==2){

    }else{
      this.mouseUpLnglat.push(lngLat)
      this.createIng()
    }

  }

  createIng(){

  }

}
export default DrawPointTool