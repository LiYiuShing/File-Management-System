import React, { useState } from 'react';


const FileAdd = (props) => {
    const [addfile, setAddFile] = useState({
        fileName: '',
        source: '',
        userId: '',
        type: '',
        size: ''
    });

    const addFileFetch = (event) => {
        event.preventDefault();
        if (addfile['source']) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': props.user.token
                    },
                    body: JSON.stringify(addfile)
                }

                fetch(`http://localhost:5000/api/files/upload`, requestOptions)
                    .then(res => res.json())
                    .then((data) => {
                        alert("Submit Successful");
                        window.location.reload();
                })
            } catch (err) {
                return err
            }
        } else {
            alert('File can\'t be null!')
        }
    }

    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     }


    const handleAddFileChange = (selectorFiles) => {
        const file = selectorFiles[0]

        //time
        const m = new Date()
        const dateString =
            m.getUTCFullYear() + "/" +
            ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
            ("0" + m.getUTCDate()).slice(-2) + " " +
            ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2);

        //file convertion
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setAddFile(
                {
                    fileName: file['name'],
                    source: reader.result,
                    userId: props.user.currentUser,
                    type: file['type'],
                    size: bytesToSize(file['size']),
                    date: dateString
                }
            );
        };
        reader.onerror = function (error) {
            
        };
    }

    const handleFileNameChange = (e) => {
        setAddFile({...addfile, fileName: e })
        
    }

    return(
        <div className="inner-container">
            <h3>Upload File</h3>
            <form onSubmit={addFileFetch}>
                <label>Select file:</label>
                <input type="file" onChange={ (e) => handleAddFileChange(e.target.files) } />
                <label>File Name:</label>
                <input type="text" onChange={ (e) => handleFileNameChange(e.target.value)} value={addfile['fileName']} />
                <label>File Size: {addfile['size'] ? addfile['size'] : '0' }</label>
                &nbsp;
                <input type="submit" value="Upload"/>
            </form>
        </div>
    )
} 

export default FileAdd;
  
