import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'; //登录注册统一成一个返回方式
const LOG_OUT = 'LOG_OUT';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
//用户初始状态
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
};

//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg
      };
    case LOG_OUT:
      return {
        ...initState,redirectTo:'/login'
      }
    default:
      return state
  }

}

//成功
function authSucess(obj) {
  const {pwd,...data} = obj
  return {type: AUTH_SUCCESS, payload: data}
}

//错误信息
function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

//登出
export function logoutSubmit() {
  return {type:LOG_OUT}
}

//用户信息更新
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSucess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

//信息载入
export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}

//用户信息获取
export function userinfo() {
  return dispatch => {
    //获取用户信息
    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          // TODO
          // 有登录信息
        } else {
          this.props.loadData(res.data.data)
          this.props.history.push('/login')
        }
        console.log(res.data)
      }
    })
    //是否登录
    //现在的url地址 login是不需要跳转
    //用户是否完善信息（选择头像、个人简介）
  };
}

//用户登录
export function login({user, pwd}) {
  if (!user) {
    return errorMsg('请输入账号')
  } else if (!pwd) {
    return errorMsg('请输入密码')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSucess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  };
}

//用户注册
export function register({user, type, pwd, repeatpwd}) {
  if (!user) {
    return errorMsg('请输入账号')
  } else if (!type) {
    return errorMsg('请选择类型')
  } else if (!pwd) {
    return errorMsg('请输入密码')
  } else if (!repeatpwd) {
    return errorMsg('请输入确认密码')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSucess({user, pwd, type}));
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
