var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(".....");
    res.render('index', { title: 'Express' });
});

/**
 * 文件上传
 * @param  {[type]}     req   [description]
 * @param  {[type]}     res   [description]
 * @param  {multiparty} next) {               var form [description]
 * @return {[type]}           [description]
 */
router.post('/upload', function(req, res, next) {
    var form = new multiparty.Form();
    // form.on('error', function(err) {
    //     console.log('Error parsing form: ' + err.stack);
    // });
    form.encoding = 'utf-8';
    form.uploadDir = "public/uploads/images/";
    form.maxFilesSize = 2 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
        console.log("文件说明" + fields.fileRemark[0])
        console.log("文件路径：" + files.file[0].path);
        console.log("文件大小：" + files.file[0].size)
        res.json({ "url": "http://localhost:3000/" + files.file[0].path.replace("public\\", "").replace(/\\/g, "\/"), "alt": fields.fileRemark[0] })
    });
});

module.exports = router;
