import { Avatar, Comment, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [ commentValue, setCommentValue ] = useState("")
    const [ openReply, setOpenReply ] = useState(false);
    console.log("props.comment._id", props.comment._id)
    const handleReplyClick = () => {
        setOpenReply(!openReply)
    };

    const handleChange = (event) => {
        setCommentValue(event.target.value);
    }

    const handleSumbit = (event) => {
        event.preventDefault();

        const variable = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.videoId,
            responseTo: props.comment._id,
        };

        axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if(response.data.success) {
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                }
            });
    }
    const actions = [
        <span onClick={handleReplyClick} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author
                avatar={<Avatar src alt />}
                content={<p>{props.comment.content}</p>}
            />
            {openReply === true &&
                <form style={{display: 'flex'}} onSumbit={handleSumbit}> 
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px '}}
                        onChange={handleChange}
                        value={commentValue}
                        placeholder="코멘트를 작성해 주세요!!"
                    />
                    <Button style={{ width: '20%', height: '52px' }} onClick={handleSumbit} >
                        Sumbit
                    </Button>
                </form>
            }
        </div>
    )
}
export default SingleComment
