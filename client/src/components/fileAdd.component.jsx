import React, { useState } from 'react';

const FileAdd = (props) => {
    const [addfile, setAddFile] = useState({
        fileName: '',
        source: '',
        userId: '',
        type: '',
        size: ''
    });
    const [err, setError] = useState('');
    const addFileFetch = (event) => {
        event.preventDefault();
        if (addfile['source']) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(addfile)
                }

                fetch(`http://localhost:5000/api/files/`, requestOptions)
                    .then(res => res.json())
                    .then((data) => {
                        alert("Submit Successful")
                })
            } catch (err) {
                return err
            }
        } else {
            alert('File can\'t be null!')
        }
    }

    const handleAddFileChange = (selectorFiles) => {
        const file = selectorFiles[0]

        console.log(file['size'])
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setAddFile(
                {
                    fileName: file['name'],
                    source: reader.result,
                    userId: props.user.currentUser,
                    type: file['type'],
                    size: file['size']
                }
            );
        };
        reader.onerror = function (error) {
            setError(error);
        };
    }

    const handleFileNameChange = (e) => {
        setAddFile({...addfile, fileName: e })
    }

    return(
        <div>
            ADD
            <form onSubmit={addFileFetch}>
                <label>Select file:</label>
                <input type="file" onChange={ (e) => handleAddFileChange(e.target.files) } />
                <label>File Name:</label>
                <input type="text" onChange={ (e) => handleFileNameChange(e.target.value)} value={addfile['fileName']} />
                <label>File Size: {addfile['size']}</label>
                <label>File Type: {addfile['type']}</label>
                <input type="submit" value="Submit" /> 
            </form>
        </div>
    )
} 

export default FileAdd;
  
