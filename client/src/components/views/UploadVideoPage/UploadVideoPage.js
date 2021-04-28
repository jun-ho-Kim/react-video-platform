import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone'
import axios from 'axios'

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    {value: 0, label: 'Private'},
    {value: 1, label: 'Public'},
];
const Category = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
];



function UploadVideoPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [categories, setCategories] = useState("");
    const [filePath, setFilePath] = useState("")
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    
    const handleChangePrivacy = (event) => {
        setPrivacy(event.target.value)
    };
    
    const handleChangeCategories = (event) => {
        setCategories(event.currentTarget.value)
    };
    const onSubmit = () => {

    }
    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        console.log(files);
        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log("response:", response);
                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName,
                    }
                    console.log("variable:", variable);
                    setFilePath(response.data.filePath)
                } else {
                    alert('비디오 업로드를 실패하였습니다.');
                }
            });
    };
    return (
    <div>
        <>
        <div style={{maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2} >Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}
                    >
                     {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{fontSize: '3rem'}} />
                            </div>
                    )}
                    </Dropzone>             
                    <div>
                        <img src alt />
                    </div>
                </div>
            <br /><br />
            <label>Title</label>
            <input 
                onChange={handleChangeTitle}
                value={title}
            
            />
            <br /><br />
            <label>Description</label>
            <TextArea
                onChange={handleChangeDescription}
                value={description}
            />
            <br /><br />
            <select onChange={handleChangePrivacy}>
                {Private.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br /><br />            
            <select onChange={handleChangeCategories}>
                {Category.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
            <br />
            <br />            
            <Button type="primary" size="large" onClick>
                Sumbit
            </Button>
            </Form>
        </div>
        </>
    </div>
    )
}

export default UploadVideoPage;