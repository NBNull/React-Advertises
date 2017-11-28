const express = require('express');
const utils = require('utility')
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')
const _filter = {
  'pwd': 0,
  '__v': 0
}

Router.get('/list', function(req, res) {
  // User.remove({}, function(e,d) {})
  User.find({}, function(err, doc) {
    return res.json(doc)
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
