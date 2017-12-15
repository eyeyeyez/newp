import mongoose from 'mongoose';

module.exports = function(){
       var config = require('./config');
       mongoose.set('debug', config.debug);//เพิ่มลบข้อมูลจะมีmsgให้ดู       mongoose.Promise = global.Promise;
       const db = mongoose.connect(config.mongoUri, {
              useMongoClient: true
              /* other options */
       });

       require('../app/models/user.model');//รู้จักmodel
       require('../app/models/post.model');
       require('../app/models/send.model');
       require('../app/models/upload.model');
       return db;
} 