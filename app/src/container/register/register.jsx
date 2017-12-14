import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import HOC_Form from '../../component/HOC-Form/HOC-Form'

@connect(
  state=>state.user,
  {register}
)

@HOC_Form

class Register extends React.Component{
  constructor(props){
    super(props);
    this.toLogin = this.toLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  toLogin(){
    console.log(this.props)
    this.props.history.push('/login')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  render() {
    const RadioItem = Radio.RadioItem

    return (<div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
      <WingBlank>
        <Logo/>
      </WingBlank>
      <List>
          <InputItem onChange={v=>this.props.handleChange('user',v)}>
              <div className='anticon icon-solution1' style={{color:'#108ee9',fontSize:'16px'}}> 账号</div>
          </InputItem>
          <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)} >
              <div className='anticon icon-Safety' style={{color:'#108ee9',fontSize:'16px'}}> 密 码</div>
          </InputItem>
          <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)} >
              <div className='anticon icon-Safety' style={{color:'#108ee9',fontSize:'16px'}}> 确认密码</div>
          </InputItem>
      </List>
      <WhiteSpace/>
      <List>
          <RadioItem checked={this.props.state.type==='genius'} onChange={()=>this.props.handleChange('type','genius')} >
              <div className='anticon icon-bulb1' style={{color:'#108ee9',fontSize:'16px'}}> 牛人</div>
          </RadioItem>
          <RadioItem checked={this.props.state.type==='boss'} onChange={()=>this.props.handleChange('type','boss')} >
              <div className='anticon icon-aliwangwang-o1' style={{color:'#108ee9',fontSize:'16px'}}> 老板</div>
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
