import { Avatar, List } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function VideoDetailPage() {
    const [videoDetail, setVideoDetail] = useState([]);
    const {videoId} = useParams();
    useEffect(() => {
        axios.post('/api/video/getVideo', {videoId})
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.video)
                } else {
                    alert('Failed to get Video Info')
                }
            })
    })
    return (
        <div style={{width: '100%', padding: '3rem 4em'}}>
            <video style={{width: '100%'}} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>
            <List.Item 
                action={[]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={videoDetail.writer && videoDetail.writer.image} />}
                    title={<a href="">{videoDetail.title}</a>}
                    description={videoDetail.description}
                
                />    
            </List.Item>        
        
        </div>
    )
}

export default VideoDetailPage
