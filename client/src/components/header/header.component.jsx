import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOutSuccess } from '../../redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';

import './header.styles.scss';

const Header = ({ currentUser, signOutSuccess }) => {
    return (
        <nav>
            <div className="nav-content">
                <div className="nav-row">
                    <ul className="nav-links right">
                        <li className="nav-link text-link title"> File management system</li>
                            { currentUser ? (
                                    <li className="nav-link text-link">
                                        <Link 
                                            style={{ textDecoration: "none" }}
                                            to={'/dashboard'}
                                            className="text-link"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                            ) : (<li className="nav-link text-link"></li>)
                            }
                            { currentUser ? (
                                    <li className="nav-link text-link">
                                        <div onClick={() => signOutSuccess()}>
                                            SignOut
                                        </div>
                                    </li>
                            ) : (
                                <li className="nav-link text-link">
                                    <Link 
                                        style={{ textDecoration: "none" }}
                                        to={'/signin'}
                                        className="text-link"
                                    >
                                        SignIn
                                    </Link>
                                </li>
                            )
                            }
                     
                    </ul>
                </div>
            </div>
        </nav>
    )

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


const mapDispatchToProps = dispatch => ({
    signOutSuccess: () => dispatch(signOutSuccess())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
  