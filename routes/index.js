var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(".....");
    res.render('index', {
        title: 'Express'
    });
});

/**
 * 文件上传
 * @param  {[type]}     req   [description]
 * @param  {[type]}     res   [description]
 * @param  {multiparty} next) {               var form [description]
 * @return {[type]}           [description]
 */
router.post('/upload', function (req, res, next) {
    var form = new multiparty.Form();

    form.on('error', function (err) {
        console.log('Error parsing form: ' + err.stack);
    });
    form.encoding = 'utf-8';
    form.uploadDir = "public/uploads/images/";
    form.maxFilesSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
        console.log("文件说明" + fields.fileRemark[0])
        console.log("文件路径：" + files.file[0].path);
        console.log("文件大小：" + files.file[0].size)
        res.json({
            "url": "http://localhost:3000/" + files.file[0].path.replace("public\\", "").replace(/\\/g, "\/"),
            "alt": fields.fileRemark[0]
        })
    });

});




router.post("/load", function (req, res, next) {
    var form = new multiparty.Form();
    var count;
    form.encoding = 'utf-8';
    form.uploadDir = "public/uploads/images/";
    form.maxFilesSize = 2 * 1024 * 1024;
    form.on('error', function (err) {
        console.log('Error parsing form: ' + err.stack);
    });

    // Parts are emitted when parsing the form 
    form.on('part', function (part) {
        // You *must* act on the part by reading it 
        // NOTE: if you want to ignore it, just call "part.resume()" 
        if (!part.filename) {
            // filename is not defined when this is a field and not a file 
            console.log('got field named ' + part.name);
            // ignore field's content 
            part.resume();
        }
        
        if (part.filename) {
            // filename is defined when this is a file 
            count++;
            console.log('got file named ' + part.name);
            // ignore file's content here 
            part.resume();
        }

        part.on('error', function (err) {
            // decide what to do 
        });
    });

    // Close emitted after form parsed 
    form.on('close', function () {
        console.log('Upload completed!');
    });

    // Parse req 
    form.parse(req);


})



module.exports = router;