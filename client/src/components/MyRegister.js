import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import "../components/style/login.css"
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

s


const Register = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Form method='POST'>
            <MDBContainer fluid className="p-3 my-5 h-custom " >
                <MDBRow className=''>
                    <MDBCol col='10' lg='6' sm={6} className='gambar'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' lg='6' sm={6} className=''>
                        <h1 className='fw-bold text-center mb-5 mt-4'>SIGN UP</h1>
                        <MDBRow>
                            <MDBCol col='10' lg='6' sm={6}>
                                <MDBInput wrapperClass='mb-4' label='Nama Perusahaan' id='formControlLg' type='text' size="md" name='name'/>
                                <MDBInput wrapperClass='mb-4' label='Email Perusahaan' id='formControlLg' type='email' size="md" name='email'/>
                                <MDBInput wrapperClass='mb-4' label='Alamat Perusahaan' id='formControlLg' type='text' size="md" name='address'/>

                            </MDBCol>
                            <MDBCol col='10' lg='6' sm={6}>

                                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="md" name='password' />
                                <MDBInput wrapperClass='mb-4' label='Verification Password' id='formControlLg' type='password' size="md" name='verify'/>

                                <Form.Select size="3" aria-label="size 3 select example" name='provinsi'>
                                    <option>Pilih Provinsi</option>
                                    <option value="Bali">Bali</option>
                                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                                    <option value="Jakarta Utara">Jakarta Utara</option>
                                    {/* <option value="4">Jakarta Barat</option>
                                    <option value="5">Jakarta Timur</option>
                                    <option value="6">Jawa Tengah</option>
                                    <option value="7">Jawa Barat</option>
                                    <option value="8">Jawa Timur</option>
                                    <option value="9">NTT</option>
                                    <option value="10">NTB</option>
                                    <option value="11">Sumatra Utara</option>
                                    <option value="12">Sumatra Selatan</option>
                                    <option value="13">Sumatra Barat</option> */}
                                </Form.Select>
                            </MDBCol>
                        </MDBRow>
                        <div className='text-center text-md-start mt-4 pt-2'>
                        <Button onClick={() => navigate('/login')}>Sign Up</Button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">have an account? <a href="#!" className="link-danger text-decoration-none">Login</a></p>
                        </div>
                    </MDBCol>

                </MDBRow>

            </MDBContainer>
            </Form>
        </div>
    )
}

export default Register