import { Avatar, Col, List } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';

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
    }, [])
    return (
        <div style={{width: '100%', padding: '3rem 4em'}}>
            <Col lg={18} xs={24}>
                <video className='detailPage' style={{width: '100%'}} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>
                <List.Item 
                    actions={[<Subscriber userTo={videoDetail.writer} userFrom={localStorage.getItem('userId')}/>]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={videoDetail.writer && videoDetail.writer.image} />}
                        title={<a href="">{videoDetail.title}</a>}
                        description={videoDetail.description}
                    
                    />    
                </List.Item>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>     
        
        </div>
    )
}

export default VideoDetailPage
