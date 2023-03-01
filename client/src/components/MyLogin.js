import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import "../components/style/login.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';


const Login = () => {

    return (
        <div>


            <MDBContainer fluid className="p-3 my-5 h-custom " >


                <MDBRow className=''>


                    <MDBCol col='10' md='6' className='gambar'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6' className=''>
                        <Form>
                        <h1 className='fw-bold text-center mb-5 mt-4'>LOGIN</h1>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' className='form-control' type='email' size="lg" name='email'/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' className='form-control' type='password' size="lg" name='password' />

                        <div className="d-flex  mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#" className='text-decoration-none mx-3'>Forgot password?</a>
                        </div>

                        <div className='text-center text-md-start mt-4 pt-2'>
                        <Button variant="primary" className='w-100'>Sign Up</Button>{' '}
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account?<Link to='/Register' className='text-danger'>Register</Link></p>
                        </div>

                        </Form>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </div>
    );
}

export default Login;