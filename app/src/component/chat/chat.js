import React from 'react'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {text:'',msg:[]}
  }
  componentDidMount(){
    if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
    // socket.on('recvmsg',(data)=>{
    //   this.setState({
    //     msg:[...this.state.msg,data.text]
    //   })
    // })
  }
  handleSubmit(){
    // socket.emit('sendmsg',{text:this.state.text})
    this.setState({text:''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
  }
  render(){
    console.log(this.props);
    const user_id = this.props.match.params.user
    const Item = List.Item
    const user = this.props.chat.users
    if (!user[user_id]) {
      return null
    }
    return(
      <div id='chat-page'>
      <NavBar mode='dark' icon={<Icon type="left"/>} onLeftClick={()=>{
        this.props.history.goBack()
      }}
      >{user[user_id].name}</NavBar>
      <List>
      {this.props.chat.chatmsg.map(v=>{
        const avator = require(`../img/${user[v.from].avator}.png`)
        return v.from === user_id?(<Item key={v._id} >{v.content}</Item>)
        :(<Item key={v._id}
          thumb={avator}
          className='chat-me'
          extra={'my'}
          >{v.content}</Item>)
      })}
      </List>
      <div className='stick-footer'>
      <List>
          <InputItem placeholder='请输入信息' value={this.state.text}
          onChange={v=>{
            this.setState({text:v})
          }}
          extra={<span className='send-text' onClick={()=>this.handleSubmit()}>发送</span>}
          ></InputItem>
      </List>
      </div>
      </div>
    )
  }
}

export default Chat
