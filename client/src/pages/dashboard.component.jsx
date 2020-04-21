import React from 'react';
import FileAdd from '../components/fileAdd.component';
import FileGet from '../components/fileGet.component';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const DashboardPage = ({user}) => {
    return(
        <div className='container'>
        <h3 align='left'>Hello {user.userName}</h3>
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