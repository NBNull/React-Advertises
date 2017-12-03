import React from 'react'
import {Result, List, WhiteSpace, WingBlank, Button, Modal} from 'antd-mobile';
import {connect} from 'react-redux'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state => state.user,
  {logoutSubmit}
)

class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert('注销', '确定退出登录', [
        {
          text: '返回',
          onPress: () => console.log('cancel')
        }, {
          text: '是的',
          onPress: () => {
            browserCookie.erase('userid')
            this.props.logoutSubmit()
          }
        }
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user
      ? (<div>
        <Result img={<img src={require(`../img/${props.avator}.png`)} alt = "" />}
        title={props.user}
        message={props.type==='boss'?props.company:null}/>
        <List renderHeader={() => '简介'}>
          <Item>{props.title}</Item>
          <Item multipleLine="multipleLine">
            {props.desc.split('\n').map(v => (<Brief key={v}>{v}</Brief>))}
          </Item>
          {
            props.money
              ? <Item>
                  <div className='anticon icon-pay-circle1' style={{
                      color: '#DC143C',
                      fontSize: '18px'
                    }}>
                    薪资:{props.money}</div>
                </Item>
              : null
          }
        </List>
        <WingBlank >
          <WhiteSpace size={`lg`}/>
          <Button className="button_main" onClick={this.logout} type={`primary`}>
            <div className='anticon icon-logout' style={{
                color: '#ffffff',
                fontSize: '20px'
              }}>
              退出登录</div>
          </Button>
        </WingBlank>
      </div>)
      :(<Redirect to={props.redirectTo} />)
  }
}

export default User
