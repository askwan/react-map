import tool from './tool'

class DrawPointTool extends tool {
  constructor(map) {
    super()
  
    this.map = map.getMap()

  }
  getName() {
    return "point"
  }
  mouseMove() {
    console.log(111111)
  }
  mouseUp() {
    console.log(22222222)

  }

}
export default DrawPointTool