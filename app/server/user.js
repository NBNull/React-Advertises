const express = require('express');
const utils = require('utility')
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {
  'pwd': 0,
  '__v': 0
}

//得到用户信息
Router.get('/list', function(req, res) {
  const {type} = req.query
  //User.remove({}, function(e,d) {})
  User.find({type}, function(err, doc) {
    return res.json({code:0,data:doc})
  })
})

//获得聊天列表
Router.get('/getmsglist',function(req,res) {
  const user = req.cookies.userid
  //Chat.remove({}, function(e,d) {})
  User.find({},function(e,userdoc) {
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avator:v.avator}
    })
    //'$or',[{from:user,to:user}]
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc) {
      if (!err) {
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })
})

//已读消息
Router.post('/readmsg', function(req, res){
	const userid = req.cookies.userid
	const {from} = req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
		console.log(doc)
		if (!err) {
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
})

//信息更改
Router.post('/update',function(req,res) {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({code:1});
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function (err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data});
  })
})

//登录
Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  User.findOne({
    user,
    pwd: md5Pwd(pwd)
  }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

//注册
Router.post('/register', function(req, res) {
  console.log(req.body);
  const {user, pwd, type} = req.body
  User.findOne({
    user
  }, function(err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名存在'})
    }
    //加密
    const userModel = new User({user, pwd: md5Pwd(pwd), type})

    userModel.save(function(e, d) {
      if (e) {
        return res.json({code: 1, msg: 'Express服务器出错'})
      }
      const {user,type,_id} =d
      res.cookie('userid',_id)
      return res.json({code: 0, data: {user}})
    })
  })
})

//验证用户信息
Router.get('/info', function(req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({
    _id: userid
  }, _filter, function(err, doc) {
    if (err) {
      return res.json({code: 1, msg: 'Express服务器出错'})
    }
    if (doc) {
      return res.json({code: 0, data: doc});
    }
  })
});

//加严++
function md5Pwd(pwd) {
  const salt = 'Ad_zhang_1996_!XM'
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router
