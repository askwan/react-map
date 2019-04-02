import {serverUrl} from './config'
class Server {
  constructor(option){
    this.init(option)
  }
  init(option){
    this.url = option.url || serverUrl;
  }
}

export default Server