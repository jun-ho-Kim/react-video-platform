import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComments(props) {
    const [openReplyComment, setOpenReplyComment] = useState(true);
    const [ childCommentNumber, setChilldCommnetNumber ] = useState(0);

    useEffect(() => {
        let commentNumber = 0;
        {props.commentList.map((comment, index) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber ++;
            };
        })}
        setChilldCommnetNumber(commentNumber);
    }, [props.commentList]);

    const handleReplyComment = () => {
        setOpenReplyComment(!openReplyComment)
    }

    let renderReplyComment = (commentId) => 
        props.commentList.map((comment, index) => (
            <>
                {comment.responseTo === commentId &&
                  <div style={{ width: '80%', marginLeft: '40px' }}>
                      {console.log("reply comment", comment)}
                <SingleComment comment={comment} refreshFunction={props.refreshFunction} />
                <ReplyComments commentList={props.commentList} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
              </div>
          }
                
            </>
        ))
        
    return (
        <div>
            {childCommentNumber >0 && 
                <div>
                    <span onClick={handleReplyComment} style={{ fontSize: '14px', margin: 0, color: 'gray' }}>
                        {openReplyComment? "Close Comment" :`More View ${childCommentNumber}`}
                    </span>
                </div>
            }

            {openReplyComment && 
            <>
            {/* {props.commentList.map((comment, index) => (
            comment.responseTo === props.parentCommentId &&
                  <div style={{ width: '80%', marginLeft: '40px' }}>
                      {console.log("reply comment", comment)}
                      <span>{comment.content}</span>
                      </div>
                ))} */}
            
            {renderReplyComment(props.parentCommentId)}
            </>
            }
        </div>
    )
}

export default ReplyComments
