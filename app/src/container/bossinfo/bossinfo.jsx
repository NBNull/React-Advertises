import React from 'react'
import { NavBar, Icon, InputItem, List, TextareaItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title:''
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
           style={{color:'#ffffff',fontSize:'20px'}}> BOSS完善信息页
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
        <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
        <TextareaItem title="职位简介" rows={3} autoHeight
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

export default BossInfo
