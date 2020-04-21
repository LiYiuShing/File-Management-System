import React from 'react';
import Button from '@material-ui/core/Button';

const HomePage = () => {
    return (
        <div className='container'>
            <div className='home-container'>
                <h3>File Management system</h3>
                <div>A simple CRUD file system</div>
                <div>&nbsp;</div>
                <Button variant="outlined" href="/signin">Enter</Button>
            </div>
        </div>
    )
}

export default HomePage;