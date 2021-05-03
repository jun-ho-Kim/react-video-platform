const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');
const { Video } = require('../models/Video');

//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body);
    console.log("post comment", comment);
    comment.save((err, comment) => {
        Comment.find({'_id': comment._id})
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.status(400).json({success: false, err})
                return res.status(200).json({success: true, result})
            }
        )
    })
});

router.post('/getComment', (req, res) => {
    Comment.find({'postId': req.body.videoId})
        .populate('writer')
        .exec((err, comments) => {
            console.log("getComment", comments);
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ success: true, comments});
        })
})

module.exports = router;