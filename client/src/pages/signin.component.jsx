import React from 'react';
import Login from '../components//login.component';
import Register from '../components/register.component';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const SignInPage = () => {
    return(
        <div className='container'>
        <Grid container>
            <Grid item md={5} className="paper-item"> 
                <Paper elevation={1}>
                    <Login />
                </Paper>
            </Grid>
            <Grid item md={5}>
                <Paper elevation={1}>
                    <Register />
                </Paper>
            </Grid>
        </Grid>
        </div>
    )
} 

export default SignInPage;
  
