import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOutSuccess } from '../redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.selector';


const Header = ({ currentUser, signOutSuccess }) => {
    return (
        <nav>
            <div className="nav-content">
                <div className="nav-row">
                    <a href="/" className="logo-container">
                    </a>
                    <ul className="nav-links right">
                        <li className="nav-link text-link">
                            <Link
                                to={'/'}
                                style={{ textDecoration: "none" }}
                            > 
                                About 
                            </Link>
                        </li>
                        <li className="nav-link text-link">
                            { currentUser ? (
                                <div>
                                    <Link 
                                        style={{ textDecoration: "none" }}
                                        to={'/dashboard'}
                                    >
                                        Dashboard
                                    </Link>
                                    <div onClick={() => signOutSuccess()}>
                                        SignOut
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    style={{ textDecoration: "none" }}
                                    to={'/signin'}
                                >
                                    SignIn
                                </Link>
                            )
                            }
                        </li>
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
  