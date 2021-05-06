const mongoogse = require('mongoose');
const Schema = mongoogse.Schema;

const disLikeSchema = mongoogse.Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    },
}, {timestamps: true});

const DisLike = mongoogse.model('DisLike', disLikeSchema);

module.exports = { DisLike };