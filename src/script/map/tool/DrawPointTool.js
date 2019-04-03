import tool from './tool'

class DrawPointTool extends tool {
  constructor(map) {
    super("pointTool")
  
    this.mapboxMap = map.getMap()

  }
 
  mouseMove() {
    console.log(111111)
  }
  mouseUp() {
    console.log(22222222)

  }

}
export default DrawPointTool