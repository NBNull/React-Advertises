import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')
@connect(state => state, {getMsgList, sendMsg, recvMsg})
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji:0
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  fixCarousel(){
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit() {
    this.setState({text:''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
  }
  render() {
    const user_id = this.props.match.params.user
    const Item = List.Item
    const user = this.props.chat.users

    if (!user[user_id]) {
      return null
    }

    const chatid = getChatId(user_id, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)

    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
    .split(' ').filter(v => v).map(v => ({text: v}))

    return (<div id='chat-page'>
      <NavBar mode='dark' icon={<Icon type = "left" />} onLeftClick={() => {
          this.props.history.goBack()
        }}>{user[user_id].name}</NavBar>
      <List>
      {/* 聊天列表 */}
        {
          chatmsg.map(v => {
            const avator = require(`../img/${user[v.from].avator}.png`)
            return v.from === user_id
              ? (<Item thumb={avator} key={v._id}>{v.content}</Item>)
              : (<Item key={v._id} className='chat-me' extra={<img src = {
                  avator
                } />}>{v.content}</Item>)
          })
        }
      </List>
      {/* 底部输入框 */}
      <div className='stick-footer'>
        <List>
          <InputItem placeholder='请输入信息' value={this.state.text} onChange={v => {
              this.setState({text: v})
            }} extra={
              <div>
              <span style={{marginRight:15}} onClick={()=>{this.setState({showEmoji:!this.state.showEmoji});this.fixCarousel()}}>😃</span>
              <span className = 'send-text' onClick = {() => this.handleSubmit()}> 发送</span>
              </div>
            }>
          </InputItem>
        </List>
        {this.state.showEmoji?<Grid
        data = {emoji}
        columnNum = {9}
        carouselMaxRow = {4}
        isCarousel
        />:null}
      </div>
    </div>)
  }
}

export default Chat
