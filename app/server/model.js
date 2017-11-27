const mongoose = require('mongoose');
//链接mongo 并使用BS_Adv
const DB_URL = 'mongodb://localhost:27017/BS_Adv'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
  console.log('mongo connnect success');
})

const models = {
  user:{
    'user':{type:String,require:true},
    'pwd':{type:String,require:true},
    'type':{type:String, require:true},
    //头像
    'avator':{type:String, require:true, defaultValue:'http://www.jianbihua.cc/uploads/allimg/141105/15-14110509413J44-lp.jpg'},
    //简介
    'desc':{'type':String},
    //职位名
    'title':{'type':String},
    //如果boss
    'company':{'type':String},
    'money':{'type':String}
  },
  chat:{
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
