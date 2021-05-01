import { Avatar, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Title from 'antd/lib/skeleton/Title';
import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

function SubscriptionPage() {
    const [videos, setVideos] = useState([]);
    const userVariables = { userFrom : localStorage.getItem('userId')}
    useEffect(() => {
        axios.post('/api/video/getSubscriptionVideos', userVariables)
            .then(response => {
                if(response.data.success) {
                    console.log("Subscription video",response.data.videos)
                    setVideos(response.data.videos);
                } else {
                    alert('Failed to Subscription Video');
                }
            })
    },[])

    const videoGrid = videos.map((video, index) => {
        const minutes = Math.floor(video.durataion / 60);
        const seconds = Math.floor(video.durataion - minutes*60);
        return (
            <Col key={index} xs={24} md={8} lg={6}>
        <       div style={{ position: 'relative' }}>
                    <Link to={`/video/${video._id}`} >
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className=" duration"
                        style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                        color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                        padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                        fontWeight:'500', lineHeight:'12px' }}>
                        <span>{minutes} : {seconds}</span>
                    </div>
                    </Link>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>
        )
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2} > Subscribed Videos </Title>
        <hr />

        <Row gutter={16}>
            {videoGrid}
        </Row>
    </div>
    )
}

export default SubscriptionPage
