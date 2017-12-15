const mongoose = require('mongoose');
//链接mongo 并使用BS_Adv
const DB_URL = 'mongodb://localhost:27017/BS_Adv'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
  console.log('mongo connnect success');
})

const models = {
  user:{
    'user':{'type':String,'require':true},
    'pwd':{'type':String,'require':true},
    'type':{'type':String,'require':true},
    //头像
    'avator':{'type':String,'require':true},
    //简介
    'desc':{'type':String},
    //职位名
    'title':{'type':String},
    //如果boss
    'company':{'type':String},
    'money':{'type':String}
  },
  chat:{
    'chatid':{'type':String,'require':true},
    'from':{'type':String,'require':true},
    'to':{'type':String,'require':true},
    'read':{'type':Boolean,'default':false},
    'content':{'type':String,'require':true,'default':''},
    'create_time':{'type':Date,'default':new Date().getTime()}
  }
}

for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
  getModel:function (name) {
    return mongoose.model(name);
  }
}
