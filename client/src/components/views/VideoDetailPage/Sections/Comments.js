import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import SingleComment from './SingleComment';

function Comments(props) {
    const user = useSelector(state => state.user);

    const {videoId} = useParams();
    const [comment, setComment] = useState([]);
    const commentVariable = {
        writer: user.userData._id,
        postId: videoId,
        content: comment
    }


    const handleChange = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        


        axios.post('/api/comment/saveComment', commentVariable)
            .then(response => {
                if(response.data.success) {
                    setComment("")
                    props.refreshfunction(response.data.result);
                }

            })
    }
    return (
        <div>
            <form style={{display: 'flex'}} onSubmit={handleSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={comment}
                    placeholder="write some comments"
                />
                <Button style={{ width: '20%', height: '52px' }} onClick={handleSubmit}>Sumbit</Button>
            </form>
            {console.log(props.commentList)}
            {props.commentList && props.commentList.map((comment, index) => (
            (!comment.responseTo &&
                <>
                <SingleComment comment={comment} refreshFunction={props.refreshFunction} />
                </>
            )
            ))}


        </div>
    )
}

export default Comments
