import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom'

@withRouter

class UserCard extends React.Component {
  static propType = {
    userlist: PropTypes.array.isRequired
  }
  handleChat(v){
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (<WingBlank size="lg">
      {
        this.props.userlist.map(v => (
          v.avator
          ? (<div key={v._id}>
            <WhiteSpace size="lg"/>
            <Card onClick={()=>this.handleChat(v)} key={v._id}>
              <Card.Header title={v.user}
              thumb={require(`../img/${v.avator}.png`)}
              extra={<span> {v.title}</span>}/>
              <Card.Body>
                {
                  v.type === 'boss'
                    ? <div className='anticon icon-solution1' style={{
                          color: '#108ee9',
                          fontSize: '18px'
                        }}>职位要求:</div>
                    : <div className='anticon icon-solution1' style={{
                          color: '#108ee9',
                          fontSize: '18px'
                        }}>自我介绍:</div>
                }
                {v.desc.split('\n').map(d => (<div key={d}>{d}</div>))}
              </Card.Body>
              <Card.Footer content={v.type === 'boss'
                  ? <div style={{
                        color: '#108ee9',
                        fontSize: '16px'
                      }}>
                      公司:{v.company}</div>
                  : null} extra={v.type === 'boss'
                  ? <div className='anticon icon-pay-circle1' style={{
                        color: '#DC143C',
                        fontSize: '18px'
                      }}> 薪资:{v.money}</div>
                  : <div className='anticon icon-message1' style={{
                      color: '#108ee9',
                      fontSize: '18px'
                    }}>
                    点击聊天</div>}/>
            </Card>
          </div>)
          : null))
      }
    </WingBlank>)
  }
}
export default UserCard
