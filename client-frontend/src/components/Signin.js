import React, {useState} from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { Link } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';

import './css/Main.css';
import {showDangerMsg } from '../helpers/msg';
import { signin } from '../api/auth';
import { setAuthenticaetion } from '../helpers/auth';


const Signin = () => {

    //vars
    const[formData, setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
        loading: false,
        redirectToDashboard: false,
    });
    
    const { email, password, errorMsg, loading, redirectToDashboard } = formData;

    //funções
    const handleChange = evt => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: '',
        })
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        if (isEmpty(email) || isEmpty(password)) {
            setFormData({
                ...formData,
                errorMsg: 'Todos os campos são necessários' 
            });
        } else if(!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg: 'Email inválido'
            });
        } else {
            const { email, password } = formData;
            const data = { email, password };

            setFormData({ ...formData, loading: true});

            signin(data)
                .then((response) => {
                    setAuthenticaetion(response.data.token, response.data.user);
                })
                .catch((err) => {
                    console.log('signin api err: ', err);
                });

        }
    };


    //views
    const showSigninForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
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
            {/* signin button */}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Sign in! BOB!
                </button>
            </div>
            {/* dont have an account */}
            <p className='text-center text-dark font-weight-bold '>
                Não tem uma conta? <Link to='/signup'>Registre-se aqui</Link>
            </p>
        </form>
    );
    
    //render
    return (
        <div className='sign-container row vh-100'>
            <div className='col-5 mx-auto align-self-center'>
                {loading && 
                    <div className="text-center pb-5">
                        <Spinner animation="grow" variant="primary" />
                    </div>
                }
                {errorMsg && showDangerMsg(errorMsg)}
                {showSigninForm()}
            </div>       
        </div>
    );  
};

export default Signin;