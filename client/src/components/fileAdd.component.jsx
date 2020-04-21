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

    const handleAddFileChange = (selectorFiles) => {
        const file = selectorFiles[0]

        //time
        const m = new Date();
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
                    size: file['size'],
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
        <div>
            <form onSubmit={addFileFetch}>
                <label>Select file:</label>
                <input type="file" onChange={ (e) => handleAddFileChange(e.target.files) } />
                <label>File Name:</label>
                <input type="text" onChange={ (e) => handleFileNameChange(e.target.value)} value={addfile['fileName']} />
                <label>File Size: {addfile['size']}</label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
} 

export default FileAdd;
  
