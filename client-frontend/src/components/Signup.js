import React, {useState, useEffect} from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { Link, useHistory } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';


import './css/Main.css';
import {showDangerMsg, showSuccessMsg} from '../helpers/msg';
import { signup } from '../api/auth.js';
import { isAuthenticated } from '../helpers/auth';


const Signup = () => {

    let history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/admin/dashboard');
        } else if (isAuthenticated() && isAuthenticated().role === 0) {
            history.push('/user/dashboard/');
        }
    }, [history]);

    //vars
    const[formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false,
    });
 
    const {username, email, password, password2, successMsg, errorMsg, loading} = formData;
    
    //funções
    const handleChange = evt => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: '',
            successMsg: '',
        })
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
            setFormData({
                ...formData,
                errorMsg: 'Todos os campos são necessários' 
            })
        } else if(!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg: 'Email inválido'
            })
        } else if(!equals(password, password2)) {
            setFormData({
                ...formData,
                errorMsg: 'Passwords não combinam'
            })
        } else {
            const { username, email, password } = formData;
            const data = { username, email, password };

            setFormData({ ...formData, loading: true});

            signup(data)
                .then(response => {
                    console.log('Axios signup WORKED:', response);
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        loading: true,
                        successMsg: response.data.successMessage
                    });

                })
                .catch (err => {
                    console.log('Axios signup error: ', err);
                    setFormData({...formData, loading: false, errorMsg: err.response.data.errorMessage });
                })

        }
    };

    //views
    const showSignupForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
            {/*username*/}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
                <input
                    onChange={handleChange}
                    name='username'
                    value={username}
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
                    onChange={handleChange}
                    name='email'
                    value={email}
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
                    onChange={handleChange}
                    name='password'
                    value={password}
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
                    onChange={handleChange}
                    name='password2'
                    value={password2}
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
                Tem uma conta? <Link to='/signin'>Entre aqui</Link>
            </p>
        </form>
    );

    return (
        <div className='sign-container row vh-100'>
            <div className='col-5 mx-auto align-self-center'>
                {loading && 
                    <div className="text-center pb-5">
                        <Spinner animation="grow" variant="primary" />
                    </div>
                }
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showDangerMsg(errorMsg)}
                {showSignupForm()}
            </div>       
        </div>
    );  
};

export default Signup;