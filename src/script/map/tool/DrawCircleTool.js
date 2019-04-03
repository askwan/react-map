import tool from './tool'

class DrawCircleTool extends tool {
  constructor(map) {
    super("circleTool")
  
    this.mapboxMap = map.getMap()

  }
 
  mouseMove() {
    console.log(111111)
  }
  mouseUp() {
    console.log(22222222)

  }

}
export default DrawCircleTool