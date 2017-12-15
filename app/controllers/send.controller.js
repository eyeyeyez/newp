var Send = require('mongoose').model('Send');
var path = require("path");

exports.getAll = (req, res, next) => {
    Send.find((err, data) => {
                     if (err) {
                            console.log('Failure: ' + err);
                            return next(err);
                     }
                     else {
                            console.log(data);
                            res.json(data);
                     }
              }).sort({time: 'desc'});;
        }

exports.create = (req, res, next) => {
        var send = new Send(req.body);
        send.save(function(err) {
                if (err) {
                        console.log('Failure');
                        return next(err);
                   }
                   else {
                          console.log('Success');
                          res.json(send);
                   }
            });
 }

exports.deletePost = (req, res, next) => {
    Send.findByIdAndRemove({_id: req.params.id},req.body,(err,send) => {
                if(err){
                    return next(err);
                }else {
                    res.json(send);
                }
        });
}


exports.search = (req, res, next) => {
           
            Send.find({content:{ $regex:req.params.search}}, (err, data) => {
                  if (err) {
                         console.log('Failure: ' + err);
                         return next(err);
                  }
                  else {
                         console.log(data);
                         res.json(data);
                  }
           }).sort({time: 'desc'});
}
   

    

