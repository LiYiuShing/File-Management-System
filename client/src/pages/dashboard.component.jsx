import React from 'react';
import FileAdd from '../components/fileAdd.component';
import FileGet from '../components/fileGet.component';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const DashboardPage = ({user}) => {
    return(
        <div className='container'>
            <Paper elevation={1}>
                <FileAdd user={user} />
            </Paper>
            <Paper elevation={1}>
                <FileGet user={user} />
            </Paper>
        </div>
    )
} 

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(
  mapStateToProps,
  ''
)(DashboardPage);