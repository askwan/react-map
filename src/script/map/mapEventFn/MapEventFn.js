import Evented from '../../utils/Evented'


class MapEventFn extends Evented {
  constructor(map) {
    super()
    this.map = map

    this.mouseMove()
  }
  mouseMove() {
    this.map.on('mousemove', (event) => {
      this.fire('mousemove', {
        lngLat: event.lngLat
      })
      // mapEvent.mouseMove(event, this.drawMap)
    })
  }
  mouseClick(open) {
    let click = (e) => {
      console.log(e)
    }
    if (open) {
      this.map.on('click', click);
    } else {
      this.map.off('click', click);
    }
  }
}
export default MapEventFn