import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LikeDislike(props) {
    const {videoId} = useParams();
    let variable = {};

    if(props.video) {
        variable = {videoId: props.videoId, userId: props.userId}
    } else {
        variable = {commentId: props.commentId, userId: props.userId}
    };

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    setLikeCount(response.data.likes.length);
                    response.data.likes.map((like, index) => {
                        if(like.userId === props.usersId) {
                            setLikeAction('liked');
                        }
                    })
                } else {
                    alert("Failed to get liked")
                }
            });
        axios.post('/api/like/getDisLikes', variable)
            .then(response => {
                if(response.data.success) {
                    setDisLikeCount(response.data.dislikes.length);
                    response.data.dislikes.map((dislike, index) => {
                        if(dislike.userId === props.userId) {
                            setDisLikeAction('disLiked');
                        } 
                    });
                } else {
                    alert("Failed to get disLikes");
                }
            });
    },[videoId]);

    const [likeAction, setLikeAction] = useState(null);
    const [disLikeAction, setDisLikeAction] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [disLikeCount, setDisLikeCount] = useState(0);

    const handleLikeClick = () => {
        if(likeAction === null) {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikeCount(likeCount+1);
                        setLikeAction("liked");

                        if(disLikeAction !== null) {
                            setDisLikeAction(null);
                            setDisLikeCount(disLikeCount - 1);
                        }
                    } else {
                        alert("Failed to increase the like")
                    }
                })
        } else {
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikeCount(likeCount - 1);
                        setLikeAction(null);
                    } else {
                        alert('Fail to decrease the like')
                    }
                })
        }
    };

    const handleDisLikeClick = () => {
        if(disLikeAction === null) {
            axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDisLikeCount(disLikeCount + 1);
                        setDisLikeAction('disLiked')
                        if(likeAction !== null) {
                            setLikeCount(likeCount - 1);
                            setLikeAction(null);
                        }
                    } else {
                        alert('Fail to increase the disLike');
                    }
                })
        } else {
            axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDisLikeCount(disLikeCount - 1);
                        setDisLikeAction(null);
                    } else {
                        alert('Fail to decrease the disLike');
                    }
                })
        }
    };
    return (
        <div>
            LikeDislike
            <Tooltip title="Like">
                <Icon 
                    type="like"
                    theme={likeAction === null ? 'outlined' : 'filled'}
                    onClick={handleLikeClick}
                >   
                </Icon>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{likeCount}</span>
            </Tooltip>
            <Tooltip title="Dislike">
                <Icon
                    type="dislike"
                    theme={disLikeAction === null ? 'outlined' : 'filled'}
                    onClick={handleDisLikeClick}
                >
                </Icon>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{disLikeCount}</span>
            </Tooltip>
        </div>
    )
}


export default LikeDislike
