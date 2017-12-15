import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UploadSchema = new Schema({

    fieldname : String ,
    originalname : String ,
    name : String ,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String

});

mongoose.model('Upload', UploadSchema);