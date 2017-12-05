import React from 'react'
import {List,InputItem,NavBar} from 'antd-mobile'
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
    this.props.getMsgList()
    this.props.recvMsg()
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
    const user = this.props.match.params.user
    const Item = List.Item
    return(
      <div id='chat-page'>
      <NavBar mode='dark'>{user}</NavBar>
      <List>
      {this.props.chat.chatmsg.map(v=>{
        return v.from === user?(<Item key={v._id} >{v.content}</Item>)
        :(<Item key={v._id} className='chat-me' extra={'my'}>{v.content}</Item>)
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
