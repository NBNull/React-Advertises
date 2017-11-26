import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';

class Register extends React.Component{
  constructor(props){
    super(props);
    this.toLogin = this.toLogin.bind(this)
    this.state = {
      type:'genius'//boss
    }
  }
  toLogin(){
    console.log(this.props)
    this.props.history.push('/login')
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (<div>
      <WingBlank>
        <Logo/>
      </WingBlank>
      <List>
          <InputItem >
              <div className='anticon icon-solution1' style={{color:'#108ee9',fontSize:'16px'}}> 账号</div>
          </InputItem>
          <InputItem name='password' type='password' >
              <div className='anticon icon-Safety' style={{color:'#108ee9',fontSize:'16px'}}> 密 码</div>
          </InputItem>
          <InputItem type='password'>
              <div className='anticon icon-Safety' style={{color:'#108ee9',fontSize:'16px'}}> 确认密码</div>
          </InputItem>
      </List>
      <WhiteSpace/>
      <List>
          <RadioItem checked={this.state.type=='genius'}>
              <div className='anticon icon-codesquareo' style={{color:'#108ee9',fontSize:'16px'}}> 牛人</div>
          </RadioItem>
          <RadioItem checked={this.state.type=='bosss'}>
              <div className='anticon icon-dingding' style={{color:'#108ee9',fontSize:'16px'}}> 老板</div>
          </RadioItem>
      </List>
      <WingBlank>
        <WhiteSpace size={`lg`}/>
        <div className="msg_warning"></div>
        <WhiteSpace size={`lg`}/>
        <Button className="button_main" type={`primary`}><div className='anticon icon-adduser' style={{color:'#ffffff',fontSize:'20px'}}> 注册</div></Button>
        <WhiteSpace/>
        <Button className="button_main" onClick={this.toLogin} type={`primary`}><div className='anticon icon-rollback' style={{color:'#ffffff',fontSize:'20px'}}> 跳转登录</div></Button>
      </WingBlank>
    </div>)
  }
}

export default Register
