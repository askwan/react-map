import Base from "./Base";
import {MetaData} from '../model'
class ImageServer extends Base {
  constructor(option){
    super();
    this.url = option.url+'/metadata';
  }
  queryByArea(geogsonstr){
    return new Promise((resolve,reject)=>{
      // option.geoWkt = 'POLYGON((110.334 44.3182,111.766 45.2411,111.654 45.9166,110.224 43.9934,110.334 44.3182))';
      let option = {
        geoWkt:geogsonstr
      }
      if(!geogsonstr) {
        reject('不合法')
        return
      }
      this.get('/query',option).then(res=>{
        if(res.status===200){
          
          resolve(new MetaData(res.data));
        }else{
          reject(res);
        }
      })
      .catch(err=>reject(err));
    })
  }

}


export default ImageServer;