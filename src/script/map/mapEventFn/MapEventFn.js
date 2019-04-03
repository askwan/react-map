import Evented from '../../utils/Evented'
import mapEventTool from './mapEventTool'
let map
class MapEventFn extends Evented {
  constructor(props) {
    super()
    map = props

    mapEventTool.init(props)
    this.mouseMove()
    this.mouseClick()
  }
  setType(type){
    mapEventTool.setType(type)
  }
  mouseMove() {
    map.on('mousemove', (event) => {
      this.fire('mousemove', {
        lngLat: event.lngLat
      })
      mapEventTool.mouseMove(event)
    })
  }
  mouseClick() {
    map.on('click', (event) => {
      mapEventTool.mouseClick(event)
    });
  }
}
export default MapEventFn