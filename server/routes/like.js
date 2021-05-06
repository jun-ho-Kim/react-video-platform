const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { DisLike } = require('../models/DisLike');

//=================================
//             Likes DisLikes
//=================================


router.post('/getLikes', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
       variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    Like.find(variable)
        .exec((err, likes) => {
            console.log("getLikes.length", likes.length);
            if(err) res.status(400).json({ success: false, err});
            return res.status(200).json({ success: true, likes})
        }
    )
});

router.post('/getDisLikes', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    DisLike.find(variable)
        .exec((err, dislikes) => {
            console.log("getDisLikes.length", dislikes.length);
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ success: true, dislikes})
        })
});

router.post('/upLike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    };
    const like = new Like(variable);
    like.save((err, likeResult) => {
        if(err) return res.json({ success: false, err });
        console.log("upLikes-likeResult", likeResult);
        DisLike.findOneAndDelete(variable)
            .exec((err, disLike) => {
                console.log("upLikes-disLike", disLike);
                if(err) return res.status(400).json({ success: false, err});
                return res.status(200).json({ success: true });
            })
    })
});

router.post('/unLike', (req, res) => {
    console.log("unlike", req.body)
    let variable = {}
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }
    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, err });
        });
         
});

router.post('/upDisLike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    };
    const disLike = new DisLike(variable);
    disLike.save((err, disLikeResult) => {
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true });
            });
    })
});

router.post('/unDisLike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    };
    DisLike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true });
        });
});



module.exports = router;