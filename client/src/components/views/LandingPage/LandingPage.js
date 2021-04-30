import React, {useState, useEffect} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect( () => {
        setLoading(true);
        axios.get('api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Falid to get Videos')
                }
                setLoading(false)
            });
    }, []);

    const renderGrid = videos.map((video, index) => {
        
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes*60);

        return (
            <Link key={index} to={`video/${video._id}`} >

                <Col xs={24} md={8} lg={6}>
                    <div  style={{position: 'relative', marginRight: '1rem'}} >
                        <img style={{width: '100%'}} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                        <div className="duration"
                            style={{bottom: 0, right:0, position: 'absolute', margin: '4px',
                            color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                            padding: '2px 4px', borderRadius: '2px', letterSpacing:'0.5px', fontSize:'12px',
                            fontWeight:'500', lineHeight:'12px' 
                        }}>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </div>
                        <Meta style={{marginTop: '0.3rem'}}
                            avatar={
                                <Avatar src={video.writer.image} />
                            }
                            title={video.title}
                        />
                        <span> views: {video.views}</span> - <span>{moment(video.createAt).format(`MMM D - YY`)}</span>                        
                </Col>
            </Link>
                )
            });
            
    if(loading) {
        return <div>...Loading</div>
    } else {
        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommended</Title>
            <Row>
                {renderGrid}
            </Row>
        </div>
        )
    }
}

export default LandingPage
