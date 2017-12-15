import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PostSchema = new Schema({
       title: {
              type: String,
              required: true,
              trim: true
       },
       content: {
              type: String
       },
       category: {
              type: String,
              default: ''
        },
       contact: {
              type: String
        },
       author: {
              type: String
        },
       img: {
            type: String,
            
       },
       time: {
            type: Date,
            default: Date.now
      }
});

mongoose.model('Send', PostSchema);
