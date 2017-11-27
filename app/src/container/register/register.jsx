import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {redirectTo} from '../../util'

@connect(
  state=>state.user,
  {register}
)

class Register extends React.Component{
  constructor(props){
    super(props);
    this.toLogin = this.toLogin.bind(this)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'//boss
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  toLogin(){
    console.log(this.props)
    this.props.history.push('/login')
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (<div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
      <WingBlank>
        <Logo/>
      </WingBlank>
      <List>
          <InputItem onChange={v=>this.handleChange('user',v)}>
              <div className='anticon icon-solution1' style={{color:'#108ee9',fontSize:'16px'}}> 账号</div>
          </InputItem>
          <InputItem type='password' onChange={v=>this.handleChange('pwd',v)} >
              <div className='anticon icon-Safety' style={{color:'#108ee9',fontSize:'16px'}}> 密 码</div>
          </InputItem>
          <InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)} >
              <div className='anticon icon-Safety' style={{color:'#108ee9',fontSize:'16px'}}> 确认密码</div>
          </InputItem>
      </List>
      <WhiteSpace/>
      <List>
          <RadioItem checked={this.state.type=='genius'} onChange={()=>this.handleChange('type','genius')} >
              <div className='anticon icon-codesquareo' style={{color:'#108ee9',fontSize:'16px'}}> 牛人</div>
          </RadioItem>
          <RadioItem checked={this.state.type=='boss'} onChange={()=>this.handleChange('type','boss')} >
              <div className='anticon icon-dingding' style={{color:'#108ee9',fontSize:'16px'}}> 老板</div>
          </RadioItem>
      </List>
      <WingBlank>
        <WhiteSpace size={`lg`}/>
        <div className="msg_warning">{this.props.msg}</div>
        <WhiteSpace size={`lg`}/>
        <Button onClick={this.handleRegister} className="button_main" type={`primary`}><div className='anticon icon-adduser' style={{color:'#ffffff',fontSize:'20px'}}> 注册</div></Button>
        <WhiteSpace/>
        <Button className="button_main" onClick={this.toLogin} type={`primary`}><div className='anticon icon-rollback' style={{color:'#ffffff',fontSize:'20px'}}> 跳转登录</div></Button>
      </WingBlank>
    </div>)
  }
}

export default Register
