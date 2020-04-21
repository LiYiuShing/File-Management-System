import React, { useState } from 'react';
import FileAdd from '../components/fileAdd.component';
import { connect } from 'react-redux';

const DashboardPage = ({user}) => {
    return(
        <div>
            <div>GET, ADD, PUT, DELETE</div>
            <FileAdd user={user} />
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