import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.toRegister = this.toRegister.bind(this)
  }
  toRegister(){
    console.log(this.props)
    this.props.history.push('/register')
  }
  render() {
    return (<div>
      <WingBlank>
        <Logo/>
      </WingBlank>
      <List>
        <InputItem>
          <div className='anticon icon-user' style={{color: '#108ee9',fontSize: '16px'}}>
            账号
          </div>
        </InputItem>
        <InputItem>
          <div className='anticon icon-Safety' style={{color: '#108ee9',fontSize: '16px'}}>
            密码
          </div>
        </InputItem>
      </List>
      <WingBlank>
        <WhiteSpace size={`lg`}/>
        <div className="msg_warning"></div>
        <WhiteSpace size={`lg`}/>
        <Button className="button_main" type={`primary`}><div className='anticon icon-login' style={{color:'#ffffff',fontSize:'20px'}}> 登录</div></Button>
        <WhiteSpace/>
        <Button className="button_main" onClick={this.toRegister} type={`primary`}><div className='anticon icon-rollback' style={{color:'#ffffff',fontSize:'20px'}}> 跳转注册</div></Button>
      </WingBlank>
    </div>)
  }
}

export default Login
