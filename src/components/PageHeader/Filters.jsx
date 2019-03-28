import React, { Component } from 'react'
import { Input, Modal, Radio, Slider, Icon, Checkbox, Calendar } from 'antd';
// import RadioGroup from 'antd/lib/radio/group';
// import CheckboxGroup from 'antd/lib/checkbox/Group';
// console.log(Radio.Group);
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


const radioStyle = {
  display:'block',
  height:'30px',
  lineHeight:'30px'
}

const formLists = [{
  type:'string',
  ui:'radio',
  value:'',
  title:'选择类型',
  options:[{id:1,label:'Core Imagery'},{id:2,label:'InTrack Stereo'}]
},{
  type:'string',
  ui:'checkbox',
  value:[],
  title:'图片格式',
  options:[{id:1,label:'PAN'},{id:2,label:'4-BANDS'},{id:3,label:'8-BANDS'},{id:4,label:'SWIR'}]
},{
  type:'string',
  ui:'radio',
  value:'',
  title:'区域范围',
  options:[{id:1,label:'所有'},{id:2,label:'<30cm'},{id:3,label:'<40cm'},{id:4,label:'<50cm'},{id:5,label:'<60cm'},{id:6,label:"<70cm"}]
},{
  type:'date',
  ui:'calendar',
  value:'',
  title:'开始时间',
  options:[]
},{
  type:'date',
  ui:'calendar',
  value:'',
  title:'结束时间',
  options:[]
},{
  type:'slider',
  ui:'slider',
  value:0.34,
  title:'Area Cloud Cover',
  step:0.01,
  domain:[0,1]
},{
  type:'slider',
  ui:'slider',
  value:24,
  title:'高度角',
  step:1,
  domain:[0,90]
}]


const FormListElement = (props)=>{
  let className = 'filter-el mg-bottom-small';
  const compair = form => form.title === props.selected.title ? className+' active' : className;
  return (
    props.formLists.map((item,index)=>(
      <div className={compair(item)} key={index} onClick={()=>props.selectOperate(index)}>
        <p>{item.title}{item.type==='slider' && <span>：{item.value}</span>}</p>
        {item.type === 'string' && <Input className="form-input" readOnly value={item.value} />}
        {item.type === 'date' && <div className="flex-center"><Icon type="calendar" /> <Input readOnly className="form-input" value={item.value} /></div>}
        {item.type === 'slider' && <Slider min={item.domain[0]} step={item.step} max={item.domain[1]} value={item.value} onChange={(value)=>props.changeValue(value,item)} />}
      </div>
    ))
  )
}

const ModalElement = (props)=>{
  return (<Modal title={props.selected.title} visible={props.visible} onOk={()=>props.okButton()} onCancel={()=>props.calcelButton()} footer={null}>
          {
            props.selected.ui === 'radio' && <RadioGroup onChange={(value)=>props.changeRadio(value,props.selected)} value={props.selected.value}>
              {props.selected.options.map(el=>(<Radio key={el.id} style={radioStyle} value={el.label}>{el.label}</Radio>))}
            </RadioGroup>
          }
          {
            props.selected.ui === 'checkbox' && <CheckboxGroup className="check-box" options={props.selected.options.map(el=>el.label)} value={props.selected.value} onChange={(value)=>props.changecheckbox(value,props.selected)} />
          }
          {
            props.selected.ui === 'calendar' && <Calendar fullscreen={false}  />
          }
        </Modal>)

  // return (
  //   <div>
  //     {
  //       props.selected.ui === 'radio' && 
  //         <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
  //           <Radio style={radioStyle} value='Core Imagery' >Core Imagery</Radio>
  //           <Radio style={radioStyle} value='In Track Stereo' >In Track Stereo</Radio>
  //         </RadioGroup>
  //     }
  //   </div>
  // )
}

export default class Filters extends Component {
  state = {
    visible:false,
    value:'',
    selectedForm:{},
    formLists
  }
  select(event){
    event.stopPropagation();
    this.toggleModal(true)
  }
  toggleModal(bool){
    this.setState({
      visible:bool
    })
  }
  selectOperate(index){
    let form = this.state.formLists[index];
    if(form.ui !== 'slider'){
      this.setState({
        selectedForm:form,
        visible:true
      })
    }else{
      this.setState({
        selectedForm:form
      });
    }
  }
  okButton(bool){
    console.log(bool,'ok')
  }
  calcelButton(bool){
    this.setState({
      value:''
    })
    console.log('cancle',this)
    this.toggleModal(false);
  }
  changeValue(value,item,b,c){
    item.value = value;
    this.setState({
      formLists:this.state.formLists
    })
  }
  changeRadio(event,item){
    item.value = event.target.value;
    this.setState({
      formLists:this.state.formLists
    })
  }
  changecheckbox(value,item){
    item.value = value;
    this.setState({
      formLists:this.state.formLists
    })
  }
  
  render() {
    console.log('render')
    return (
      <div className="header-filter page-tab pd-big">
        <FormListElement formLists = {this.state.formLists} selectOperate = {this.selectOperate.bind(this)} changeValue={this.changeValue.bind(this)} selected={this.state.selectedForm} />
        <ModalElement visible={this.state.visible} selected={this.state.selectedForm} okButton={this.okButton.bind(this)} calcelButton={this.calcelButton.bind(this)} changeRadio={this.changeRadio.bind(this)} changecheckbox={this.changecheckbox.bind(this)} />
        
      </div>
    )
  }
}
