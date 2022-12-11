import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { loginService } from '../config/userService';
import Alert from '@mui/material/Alert';
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Form, FormControl, InputGroup, Container } from 'react-bootstrap'
import { Button } from '@mui/material';

export default function Login() {
  const [state, setstate] = useState({ email: '', password: '', error: '' })
  const [showpassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  // Check email and password at login time
  const loginUser = () => {
    // event.preventDefault()
    if (state.email != '' && state.password != '') {
      loginService({ email: state.email, password: state.password })
        .then(res => {
          if (res.data.err == 0) {
            console.log(res.data)
            localStorage.setItem("_token", res.data.token);
            navigate("/dashboard")
          }
          else {
            setstate({...state,error:'Email and Password Does Not Match'})
          }
        })
    }

    else {
      setstate({...state,error:'Please Enter Login Details'})
    }
  }

  return (
    <>
      <Container style={{ height: "80vh" }}>
        <div className="loginCss" >
          <h3 className='text-center pb-3'>Login Here</h3>
          {state.error.length != 0 &&
            <Alert severity="error">{state.error}</Alert>}
          <Form.Group>
            <InputGroup>
              <FormControl type="email" placeholder="Email Address" name="email" onChange={e => setstate({ ...state, email: e.target.value })} value={state.email} />
              <IoMdMail className="iconlogin" />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <FormControl name="password" placeholder="Password" type={showpassword ? "text" : "password"} onChange={e => setstate({ ...state, password: e.target.value })} value={state.password} />
              {showpassword ?
                <BsEyeFill className="iconlogin" onClick={() => setShowPassword(false)} />
                :
                <BsEyeSlashFill className="iconlogin" onClick={() => setShowPassword(true)} />
              }
            </InputGroup>
          </Form.Group>

          <div className='text-center'>
            <Button variant="contained" color="success" className='button_fun px-5 py-2 mt-1' onClick={() => loginUser()}>Login</Button>
           </div>

          <div style={{ marginTop: "1px" }} className='d-flex justify-content-between'>
            <span >Don't have an account?
              <Link to="/registration" className='font-weight-bold' style={{ textDecoration: "none" }}> Register here</Link>
            </span>
          </div>
        </div>
      </Container>
    </>
  )
}
