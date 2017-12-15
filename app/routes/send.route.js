var send = require('../controllers/send.controller');

module.exports = (app) => {
       var path = '/api/send';
    
       app.get(path + '/delete/:id',send.deletePost)
       
       app.get(path + '/search/:search', send.search);
      

       app.get(path + '/all', send.getAll);
       app.post(path + '/create', send.create);
}