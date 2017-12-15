var path = require("path");
var Upload = require('mongoose').model('Upload');



exports.getImg = (req, res ,next) => {
    Upload.find( (err, upload) => {
        if (err) {
               console.log('Failure');
               return next(err);
        }
        else {
               console.log('Success');
               res.json(upload);
        }
 });
}

exports.getImgname = (req, res, next) => {
    Upload.findOne({_id: req.params.id},req.body,(err,data) => {
                if(err){
                    return next(err);
                }else {
                    res.json(data);
                }
        });
}