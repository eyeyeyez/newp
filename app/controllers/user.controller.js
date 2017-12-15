// create new file ./app/controllers/user.controller.js
var User = require('mongoose').model('User');
var path = require("path");

exports.getUsers = (req, res, next) => {
       User.find({},'username firstName lastName email phone',(err, user) => {
              if (err) {
                     console.log('Failure');
                     return next(err);
              }
              else {
                     console.log('Success');
                     res.json(user);
              }
       });
}
//ช่วยดึง user จาก param เพื่อส่งต่อ
exports.userByUsername = (req, res, next, username) => {
        User.findOne(
            {username:username},
            (err, user) => {
            if (err) {
                console.log('Failure');
                return next(err);
            }
            else {
                console.log('Success');
                req.user = user;
                next();
            }
        });
}
exports.getSelectUser = (req, res) => {
    res.json(req.user);
}
exports.putUpdateUser = (req, res, next) => {
    User.findOneAndUpdate({username:req.user.username},req.body,
    (err,user) => {
            if(err){
                return next(err);
            }else {
                res.json(user);
                //ยังบัคที่อัพเดทแล้วแสดงเป็นค่าเก่าก่อนอัพเดทหรือตั่งใจ
            }
    });
}
exports.deleteUser = (req, res, next) => {
    User.findOneAndRemove({username:req.user.username},req.body,
        (err,user) => {
                if(err){
                    return next(err);
                }else {
                    res.json(user);
                }
        });
    // req.user.remove((err,user) => {
    //     if(err){
    //         return next(err);
    //     }else {
    //         res.json(req.user);
    //     }
    // })
}




exports.create = (req, res, next) => {
    var user = new User(req.body);
    user.save((err) => {
           if (err) {
                  console.log('Failure');
                  return next(err);
           }
           else {
                  console.log('Success');
                  res.json(user);
           }
    });
}

exports.login = (req, res) => {
    if (!req.user) {
           res.sendFile((path.join(__dirname+'/../views/login.html')));
    }
    else {
           return res.redirect('/home');
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


exports.saveOAuthUserProfile = (req, profile, done) => {
    User.findOne({
               provider: profile.provider,
               providerId: profile.providerId
    },(err, user)=> {
           if (err) return done(err);
           else {
                  if (!user) {
                         var possibleUsername = profile.username 
     || (profile.email ? profile.email.split('@')[0] : '');
                         console.log('NAME: ' + profile.username);
                 User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                         profile.username = availableUsername;
                         user = new User(profile);
                         user.save((err) => {
                                if (err) { return req.res.redirect('/login'); }
                                return done(err, user);
                         })
                     });
                  }
                 else { return done(err, user); }
            }
    });
}