import React from 'react'
import { NavBar, InputItem, List, TextareaItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      desc:''
    }
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path ? <Redirect to={this.props.redirectTo}/> : null}
        <NavBar mode="dark">
           <div className='anticon icon-contacts'
           style={{color:'#ffffff',fontSize:'20px'}}> Genius完善信息页
           </div>
        </NavBar>
        <AvatarSelector
           selectAvatar={(img_name)=>{
             this.setState({
               avator:img_name
             })
           }}
        ></AvatarSelector>
        <List>
        <InputItem onChange={(v)=>this.onChange('title',v)}>求职岗位</InputItem>
        <TextareaItem title="个人简介" rows={3} autoHeight
        placeholder="输入你的职位描述"
        onChange={(v)=>this.onChange('desc',v)}></TextareaItem>
        </List>
        <WingBlank>
        <WhiteSpace size={`lg`}/>
        <Button onClick={()=>{
          this.props.update(this.state)
        }} className="button_main" type={`primary`}><div className='anticon icon-adduser' style={{color:'#ffffff',fontSize:'20px'}}> 保存</div></Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo
