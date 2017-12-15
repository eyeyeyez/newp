var item = require('../controllers/upload.controller');
var uploads = require('../controllers/upload.controller');
var bodyParser = require('body-parser');
var multer = require('multer');
var UploadSchema = require('mongoose').model('Upload');

import index from '../controllers/index.controller';

module.exports = (app) => {
    var path = '/api/uploads';

    app.use(bodyParser.json());
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: (req, file, cb) =>{
            cb(null, './uploads/')
        },
        filename: (req, file, cb) => {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    /** API path that will upload the files */
    app.post(path, (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            //res.file(req)
            var uploadschema = new UploadSchema(req.file);
            uploadschema.save((err) => {
                if (err) {
                       console.log('Failure');
                       return next(err);
                }
                else {
                       console.log('Success');
                       res.json(uploadschema);
                } 
            });
            //res.json(req.file);
        })

    });

    app.get(path + '/getimg' , uploads.getImg);
    app.get(path + '/getimg/:id',uploads.getImgname)
       //app.get('/', index.index);
       //app.post(path , upload.upload);
}