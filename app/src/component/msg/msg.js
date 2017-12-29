import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state
)

class Msg extends React.Component {
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    // 按照聊天分组
    return(
      <div>
       <List>
        {chatList.map(v=>{
          console.log(v)
          const lastItem = this.getLast(v)
          const userinfo = this.props.chat.users
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          const name = userinfo[targetId] ? userinfo[targetId].name : userinfo[targetId]
          const avator = userinfo[targetId] ? userinfo[targetId].avator : userinfo[targetId]
          const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
          return(
            <Item
              key = {lastItem._id}
              extra = {<Badge text={unreadNum}/>}
              thumb = {require(`../img/${avator}.png`)}
              arrow = 'horizontal'
              onClick = {
                ()=>{this.props.history.push(`/chat/${targetId}`)}
              }
            >{name}
              <Brief>{lastItem.content}</Brief>
            </Item>
          )
        })}
       </List>
      </div>
    )
  }
}

export default Msg
