const mongoose = require('mongoose');
//链接mongo 并使用BS_Adv
const DB_URL = 'mongodb://localhost:27017/BS_Adv'
mongoose.connet(DB_URL)
mongoose.connection.on('connected',function () {
  console.log('mongo connnect success');
})
