import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { registerService } from '../config/userService';
import Alert from '@mui/material/Alert';
import { IoMdMail } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Container, Form, FormControl, InputGroup, Button, } from "react-bootstrap";
const styled = {
  margin: 0,
  fontSize: "small",
  color: "red",
};
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export default function Registration() {
  const [errors, seterrors] = useState({
    errFirstname: "", errLastname: "", errEmail: "", errPassword: "",
    errConfirm_password: "", pass: null, submit_error: ''
});
const [data, setdata] = useState({
    firstname: "", lastname: "", email: "", password: "", confirm_password: "", 
    showpassword: false, showconfirmpassword: false,profile:""
});
  const navigate = useNavigate()

  // For Validation
  const handler = (event) => {
    const { name, value } = event.target;
    let error = ''
    switch (name) {
      case "firstname":
        error = regForName.test(value) ? "" : "Invalid Name";
        seterrors({ ...errors, errFirstname: error });
        break;

      case "lastname":
        error = regForName.test(value) ? "" : "Invalid Name";
        seterrors({ ...errors, errLastname: error });
        break;

      case "email":
        error = regForEmail.test(value) ? "" : "Invalid Email";
        seterrors({ ...errors, errEmail: error });
        break;

      case "password":
        error = regForpassword.test(value) ? "" : "Enter Strong Password";
        seterrors({ ...errors, errPassword: error, pass: value });
        break;

      case "confirm_password":
        error = value === errors.pass ? "" : "Password does not match";
        seterrors({ ...errors, errConfirm_password: error });
        break;
    }
    console.log(errors);
    setdata({ ...data, [name]: value })
  }

  // New User Registration
  const validate = () => {
console.log(data.profile);
    if (data.firstname != '' && data.lastname != '' && data.email != '' && data.password != '' && data.confirm_password != '' && data.profile != '') {
      const formData = new FormData()
      formData.append('firstname', data.firstname)
      formData.append('lastname', data.lastname)
      formData.append('email', data.email)
      formData.append('profile', data.profile)
      formData.append('password', data.password)
      // let details = {
      //   firstname:data.firstname,
      //   lastname:data.lastname,
      //   email:data.email,
      //   profile:data.profile,
      //   password:data.password,
      // }
      registerService(formData)
        .then(res => {
          if (res.data.err == 0) {
            console.log(res.data.msg, "line 60");
            navigate("/")
          }
          else {
            seterrors({...errors,submit_error:res.data.msg})
          }
        })
    }
    else {
      seterrors({...errors,submit_error:"Enter All Registration Details"})
    }
  }

  return (
    <>
      <Container>
        <div className="registration">
          <h3 className="text-center">REGISTER HERE</h3>
          {errors.submit_error.length != 0 &&
            <Alert severity="error">{errors.submit_error}</Alert>}
          <Form.Group>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="First Name"
                name="firstname"
                onBlur={handler}
              />
            </InputGroup>
            <p style={styled}>{errors.errFirstname}</p>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Last Name"
                name="lastname"
                onBlur={handler}
              />
            </InputGroup>
            <p style={styled}>{errors.errLastname}</p>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <FormControl
                type="email"
                placeholder="Email Address"
                name="email"
                onBlur={handler}
              />
              <IoMdMail className="iconlogin" />
            </InputGroup>
            <p style={styled}>{errors.errEmail}</p>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <FormControl
                type={data.showpassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onBlur={handler}
              />
              {data.showpassword ? (
                <BsEyeFill
                  className="iconlogin"
                  onClick={() => setdata({ ...data, showpassword: false })}
                />
              ) : (
                <BsEyeSlashFill
                  className="iconlogin"
                  onClick={() => setdata({ ...data, showpassword: true })}
                />
              )}
            </InputGroup>
            <p style={styled}>
              {errors.errPassword}
            </p>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <FormControl
                type={data.showconfirmpassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm_password"
                onBlur={handler}
              />
              {data.showconfirmpassword ? (
                <BsEyeFill
                  className="iconlogin"
                  onClick={() => setdata({ ...data, showconfirmpassword: false })}
                />
              ) : (
                <BsEyeSlashFill
                  className="iconlogin"
                  onClick={() => setdata({ ...data, showconfirmpassword: true })}
                />
              )}
            </InputGroup>
            <p style={styled}> {errors.errConfirm_password}</p>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <FormControl
                type="file"
                placeholder="image"
                name='profile' onChange={(e) => setdata({ ...data, profile: e.target.files[0] })}
              />              
            </InputGroup>
            <p style={styled}>{errors.contact}</p>
          </Form.Group>
         
          <div className="text-center">
            <Button className="button_fun px-5" onClick={() => validate()}>Register</Button>
          </div>
          <span >Already have an account?
            <Link to="/" className='font-weight-bold' style={{ textDecoration: "none" }}> Login here</Link>
          </span>
        </div>
      </Container>
    </>
  )
}
