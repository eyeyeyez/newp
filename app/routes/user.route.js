import passport from 'passport';
var user = require('../controllers/user.controller');

module.exports = (app) => {
    var path = '/api/user';

    app.get(path + '/getuser', user.getUsers);

    app.route(path + '/getuser/:username')
        .get(user.getSelectUser)
        .put(user.putUpdateUser)
        .delete(user.deleteUser);
    app.param('username',user.userByUsername);

    app.post(path + '/signup', user.create);


    app.route('/login')
        .get(user.login)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
    
        }));

    app.post('/logout', user.logout);

    app.get('/oauth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        failureRedirect: '/login'
    }));

    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/home'
    }));

}

