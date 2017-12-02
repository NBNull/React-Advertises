import React from 'react'
import axios from 'axios'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('/user/list?type=genius').then(res => {
      if (res.data.code === 0) {
        this.setState({data: res.data.data})
      }
    })
  }
  render() {
    console.log(this.state);
    return (<WingBlank size="lg">
      {
        this.state.data.map(v => (
          v.avator
          ? (
            <div key={v._id}>
            <WhiteSpace size="lg" />
          <Card key={v._id}>
            <Card.Header title={v.user} thumb={require(`../img/${v.avator}.png`)} extra={<span>{v.title}</span>}/>
            <Card.Body>
            {v.desc.split('\n').map(v=>(
              <div key={v}>{v}</div>
            ))}
            </Card.Body>
            <Card.Footer extra={<div className='anticon icon-message1' style={{color:'#108ee9',fontSize:'16px'}}> 点击聊天</div>}/>
          </Card>
          </div>
          )
          : null
        ))}
    </WingBlank>)
  }
}

export default Boss
