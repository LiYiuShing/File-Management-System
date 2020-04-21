import React from 'react';
import FileAdd from '../components/fileAdd.component';
import FileGet from '../components/fileGet.component';
import { connect } from 'react-redux';

const DashboardPage = ({user}) => {
    return(
        <div className='container'>
            <div>GET, ADD, PUT, DELETE</div>
            <FileAdd user={user} />
            <FileGet user={user} />
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