const express = require('express');
const router = express.Router();
const {Subscriber} = require('../models/Subscriber');


//=================================
//             Subscribe
//=================================

router.post('/subscribeCount', (req, res) => {
    Subscriber.find({"userTo": req.body.userTo })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, subscribeCount: subscribe.length})
        })
});

router.post('/subscribed', (req, res) => {
    Subscriber.find({"userTo": req.body.userTo, "userFrom": req.body.userFrom})
    .exec((err, subscribe) => {
        let result = false
        if(err) return res.status(400).send(err);
        if(subscribe.length !== 0) {
            result = true
        }
            return res.status(200).json({ success: true, subscribed: result})
        })
});

router.post('/subscribe', (req, res) => {
    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true});
    });
});

router.post('/unSubscribe', (req, res) => { 
    console.log('unSubscribe req.body', req.body)
    Subscriber.findOneAndDelete({"userTo": req.body.userTo._id, "userFrom": req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, doc});
        })
});

module.exports = router;
