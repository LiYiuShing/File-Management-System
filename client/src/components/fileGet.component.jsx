import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const FileGet = (props) => {
    const [allfile, setAllfile ] = useState('');
    const [status, setStatus] = useState([]);

    useEffect(() => {
        fetchData()
    },[status]);

    const fetchData = () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': props.user.token
                },
                body: JSON.stringify({
                    userId: props.user.currentUser
                })
            }

            fetch(`http://localhost:5000/api/files/get`, requestOptions)
                .then(res => res.json())
                .then((data) => {
                    setAllfile(data)
            })
        } catch (err) {
            return err
        }
    }

    const handleDownload = (e) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': props.user.token
                },
                body: JSON.stringify({
                    _id: e.target.id
                })
            }

            fetch(`http://localhost:5000/api/files/download`, requestOptions)
                .then(res => res.json())
                .then((data) => {
                    var a = document.createElement('a');
                    var url = data['source']
                    a.href = url;
                    a.download = data['fileName'];
                    a.click();
            })
        } catch (err) {
            return err
        } 
    }

    const handleDelete = (e) => {
        if (window.confirm('Are you sure delete the file?')) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': props.user.token
                        },
                    }
            
                fetch(`http://localhost:5000/api/files/${e.target.id}`, requestOptions)
                    .then(res => res.json())
                    .then((data) => {
                        setStatus(oldArray => [...oldArray, "Delete"]);
                })
            } catch (err) {
                return err
            }
        } 
    }

    const handleEdit = (e) => {
        if (window.confirm('Are you sure delete the file?')) {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': props.user.token
                        },
                    }
            
                fetch(`http://localhost:5000/api/files/${e.target.id}`, requestOptions)
                    .then(res => res.json())
                    .then((data) => {
                        setStatus(true)
                    .catch(err => {
                        alert(err)
                    })
                })  
            } catch (err) {
                return err
            }
        } 
        setStatus(false)
    }

    return(
        <div className="inner-container">
            <TableContainer>
                <Table className="table" aria-label="a table">
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Date Upload</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {allfile ? Object.values(allfile).reverse().map((value, key) => (
                            <TableRow key={key} id={value['fileId']} align="center">
                                <TableCell component="th" scope="row">
                                    {value['fileName']}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {value['size']}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {value['date']}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <button id={value['fileId']} onClick={(e) => {handleDownload(e)}} herf="">Download</button>
                                    <button id={value['fileId']} onClick={(e) => {handleDelete(e) }}>Delete</button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow align="center">
                                <TableCell component="th" scope="row">
                                    Loading
                                </TableCell>
                            </TableRow>
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FileGet;