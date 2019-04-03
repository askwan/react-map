class Tool {
  mouseDown(event) {}
  // mouseMove(event) {}
  // mouseUp(event) {}
  mouseDBclick(event) {}
  active() {
    console.log('bb')

    this.map.on('mousedown', this.mouseDown.bind(this))
    this.map.on('mousemove', this.mouseMove.bind(this))
    this.map.on('mouseup', this.mouseUp.bind(this))
  }
  unactive() {
    console.log(this.map,'aaaaaa')
    this.map.off('mousedown', this.mouseDown.bind(this))
    this.map.off('mousemove', this.mouseMove.bind(this))
    this.map.off('mouseup', this.mouseUp.bind(this))
  }
}

export default Tool;