
class Tool {
  constructor(){
    this.fnCollection = {};
  }
  mouseDown(event) {}
  // mouseMove(event) {}
  // mouseUp(event) {}
  mouseDBclick(event) {}
  active() {
    console.log('bb')
    this.fnCollection.mouseMove = this.mouseMove.bind(this);
    this.fnCollection.mouseDown = this.mouseDown.bind(this);
    this.fnCollection.mouseUp = this.mouseUp.bind(this);
    this.map.on('mousemove', this.fnCollection.mouseMove)
    this.map.on('mousedown', this.mouseDown)
    this.map.on('mouseup', this.mouseUp)
  }
  unactive() {
    console.log(this.map,'aaaaaa')
    this.map.off('mousemove', this.fnCollection.mouseMove)
    this.map.off('mousedown', this.fnCollection.this.mouseDown)
    this.map.off('mouseup', this.fnCollection.this.mouseUp)
  }
}

export default Tool;