import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component {
  componentDidMount() {
    //获取用户地址
    axios.get('/user.info')
    //地址判断
    //用户身份
    //用户是否完善信息（选择头像 个人简介）
  }
}
