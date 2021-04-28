import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import DropZone from "react-dropzone"

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
    return (
        <div style={{maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2} >Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <DropZone 
                    onDrop
                    multiple
                    maxSize
                    >
                    {({getRootProps, getInputProps}) => (
                        <div style={{width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex',alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                            <Input {...getInputProps()} />
                            <Icon type="plus" style={{fontSize: '3rem'}} />
                        </div>
                    )}

                    </DropZone>
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
    )
}

export default UploadVideoPage