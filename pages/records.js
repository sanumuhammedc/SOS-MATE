import React from 'react'
import Navbar from "../components/Navbar";
import { Button, Buttton,Upload } from "antd";
import EditButton from "../components/profile";


export default function records() {
    return (
        <><div>
            <Navbar />
        </div>
        <div>
        <EditButton/>
        </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20vh",
                }}>
                    
                    <Upload.Dragger listType="picture" style={{backgroundColor:'beige',width:500}} multiple action={"http://localhost:3000"}>
                        <div><b>Upload your Medical records here</b></div>
                        <br/>
                        <Button style={{backgroundColor:'aliceblue'}}><b>Click Upload</b></Button>
                    </Upload.Dragger>

            </div></>
    )
}
