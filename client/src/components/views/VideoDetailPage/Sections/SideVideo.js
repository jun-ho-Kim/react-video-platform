import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function SideVideo() {
    const [sideVideo, setSideVideo] = useState([]);
    const {videoId} = useParams();
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    setSideVideo(response.data.videos);
                    console.log("setSideVideo", sideVideo)
                } else {
                    console.log("Side Video Failed")
                }
            })
    }, [])
    const sideVideoItem = sideVideo.map((video, index)=> {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes*60);    
        return (
            <>
            {video._id === videoId ? "" :
                <div style={{marginBottom: '1rem', padding: '0 2rem'}} key={index}>
                    <Link to={`/video/${video._id}`} style={{display: 'flex'}}>
                        <div style={{ width:'40%', marginRight:'1rem', color:'gray' }}>
                                <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                        </div>
                        <div style={{width: '50%'}}>
                            <span style={{fontSize: '1rem', color: 'black'}}>{video.title}</span>
                            <br />
                            <span>{video.writer.name}</span>
                            <br />
                            <span>{video.views}</span>
                            <br />
                            <span>{minutes}: {seconds}</span>
                        </div>
                    </Link>
                </div>
            }
            </>
        )}
    )
    return (
            <div style={{ marginTop:'3rem' }}>
                {sideVideoItem}
            </div>
    )
}

export default SideVideo
