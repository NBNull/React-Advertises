import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {login}
)

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:'',
      pwd:''
    }
    this.toRegister = this.toRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  toRegister(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleLogin(){
    this.props.login(this.state)
  }
  render() {
    return (<div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
      <WingBlank>
        <Logo/>
      </WingBlank>
      <List>
        <InputItem onChange={v=>this.handleChange('user',v)}>
          <div className='anticon icon-user' style={{color: '#108ee9',fontSize: '16px'}}>
            账号
          </div>
        </InputItem>
        <InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>
          <div className='anticon icon-Safety' style={{color: '#108ee9',fontSize: '16px'}}>
            密码
          </div>
        </InputItem>
      </List>
      <WingBlank>
        <WhiteSpace size={`lg`}/>
        <div className="msg_warning">{this.props.msg}</div>
        <WhiteSpace size={`lg`}/>
        <Button onClick={this.handleLogin} className="button_main" type={`primary`}><div className='anticon icon-login' style={{color:'#ffffff',fontSize:'20px'}}> 登录</div></Button>
        <WhiteSpace/>
        <Button className="button_main" onClick={this.toRegister} type={`primary`}><div className='anticon icon-rollback' style={{color:'#ffffff',fontSize:'20px'}}> 跳转注册</div></Button>
      </WingBlank>
    </div>)
  }
}

export default Login
