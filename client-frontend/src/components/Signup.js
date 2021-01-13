import React from 'react';
import { Link } from 'react-router-dom';

import './Signup.css';

const Signup = () => {

    const showSignupForm = () => (
        <form className='signup-form'>
            {/*username*/}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
                <input
                    name=''
                    className='form-control'
                    placeholder='Username'
                    type='text'/>
            </div>
            {/*email*/}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                </div>
                <input
                    name=''
                    className='form-control'
                    placeholder='Email address'
                    type='email'/>
            </div>
            {/*password*/}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    className='form-control'
                    placeholder='Create password'
                    type='password' />
            </div>
            {/*password2*/}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    className='form-control'
                    placeholder='Confirm password'
                    type='password' />
            </div>
            {/* signup button */}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Sign up! Be a BOB(?)
                </button>
            </div>
            {/* already have account */}
            <p className='text-center text-dark font-weight-bold '>
                Have an account? <Link to='/signin'>Log in</Link>
            </p>
        </form>
    );

    return (
        <div className='signup-container row vh-100'>
            <div className='col-5 mx-auto align-self-center'>{showSignupForm()}</div>          
        </div>
    );
        
};

export default Signup;