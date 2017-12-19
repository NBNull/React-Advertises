import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import Msg from '../../component/msg/msg'
import User from '../user/user'
import {getMsgList,recvMsg} from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList,recvMsg}
)

class Dashboard extends React.Component {
  componentDidMount(){
    if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'aliwangwang-o1',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      }, {
        path: '/boss',
        text: 'Genius',
        icon: 'bulb1',
        title: 'Genius列表',
        component: Boss,
        hide: user.type === 'genius'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'message1',
        title: '消息列表',
        component: Msg
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    const page = navList.find(v => v.path === pathname)
    return page
      ? (<div>
        <NavBar className='fixd-header' mode='dark'>{page.title}</NavBar>
        <div>
          {navList.map(v => (<Route key={v.path} path={v.path} component={v.component}></Route>))}
        </div>
        <NavLinkBar data={navList}/>
      </div>)
      : <Redirect to='/msg'></Redirect>
  }
}

export default Dashboard
