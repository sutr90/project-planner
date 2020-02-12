import React from 'react'
import { Button, Upload, Icon } from "antd"
import { connect } from 'react-redux'
import { saveAs } from 'file-saver';
import { loadRows } from './store/rowsSlice'

const FileMenu = (props) => {

    const saveToFile = () => {
        const data = JSON.stringify(props.rows);
        const blob = new Blob([data], { type: "text/json;charset=utf-8" });
        saveAs(blob, "data.txt");
    };

    const transformFile = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                console.log(JSON.parse(reader.result))
                props.loadRows(JSON.parse(reader.result));
                resolve();
            };
        });
    }

    return <>
        <Button onClick={() => saveToFile()}>Save to file</Button>
        <Upload transformFile={transformFile} showUploadList={false} action={""} customRequest={() => { }}>
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </Upload>
    </>
};


const mapDispatch = { loadRows };

const mapStateToProps = state => {
    return {
        rows: state.rows,
    }
}

export default connect(mapStateToProps, mapDispatch)(FileMenu);