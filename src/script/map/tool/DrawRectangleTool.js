import tool from './tool'

class DrawRectangleTool extends tool{
  constructor(map){
    super()
    this.map = map

  }
  getName() {
    return "rectangle"
  }
  mouseMove(){
    console.log(333333)

  }
  mouseUp(){
    console.log(44444)

  }
 
}
export default DrawRectangleTool