import axios from 'axios'
import {getRedirectPath} from '../util'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA'
//用户初始状态
const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
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
        isAuth: false,
        msg: action.msg
      };
    default:
      return state
  }

}

//登录成功
function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload: data}
}

//注册成功
function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

export function loadData(userinfo) {
  return {type:LOAD_DATA,payload:userinfo}
}

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

export function login({user, pwd}) {
  if (!user) {
    return errorMsg('请输入账号')
  } else if (!pwd) {
    return errorMsg('请输入密码')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  };
}

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
      if (res.status == 200 && res.data.code === 0) {
        dispatch(registerSuccess({user, pwd, type}));
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
