const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
// const { Video } = require("../models/Videos");

const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== '.jflf' || ext !== '.jpg') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

let upload = multer({storage: storage}).single("file")

//=================================
//             Videos
//=================================

router.post("/uploadfiles", (req, res) => {
    // console.log("res", res)
    console.log("video.js req", req.body)
    upload(req, res, err => {
        if(err) {
            console.log("upload err", err) 
            return res.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename,})
    })
});

router.post("/thumbnail", (req, res) => {
    let thumbsFilePath = "";
    let fileDuration = "";
    //비디오 정보 가져오기(ffprobe 사용)
    ffmpeg.ffprobe(req.body.filePath, function(err, metaData) {
        if(err) console.log("ffprobe Error", err)
        // console.log("Video Data dir", metaData);

    });

    ffmpeg(req.body.filePath)
        .on('filenames', function(filenames) {
            console.log('will generate' + filenames.join(','));
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function() {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshot({
            count: 1,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });
})


module.exports = router;