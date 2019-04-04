class Meta {
  constructor(option){
    this.initData(option);
  }
  initData(option){
    let meta = {
      CloudPercent:0,
      DriverName:'',
      RollSatelliteAngle:0,
      SensorID:'',
      StoragePath:'',
      cloudPercent:'',
      driverName:'',
      mt_databound:'',
      mt_datamainname:'',
      mt_filesize:0,
      mt_metatable:'',
      mt_thumbimg:'',
      mt_uuid:'',
      rollSatelliteAngle:0,
      sensorID:'',
      storagePath:''
    }
    Object.assign(meta,option);
    Object.assign(this,meta);
  }
}

let num = 0;

export default class MetaData{
  constructor(list){
    this.length = 0;
    this.initData(list)
  }
  initData(list){
    num+=1;
    let metadata = {
      datalength:list.length,
      name:'AOI'+num,
      datas:list.map(el=>new Meta(el)),
      coverage:1,
      selects:[],
      id:num
    }
    Object.assign(this,metadata);
  }
  clearSelect(){
    this.selects = [];
    return this
  }
}