import React, { useEffect, useState } from 'react';
import Navbaar from './Navbaar';
import { Card, Modal } from 'react-bootstrap'
import { IoCloseCircle } from "react-icons/io5";
import jwtDecode from 'jwt-decode';
import { addNewProjectService, deleteprojectService, fetchprojectService, updateprojectService } from '../config/projectService';
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { Alert, Button, Grid } from '@mui/material';
import DescEditor from './DescEditor';
import { useSelector,useDispatch } from 'react-redux';

const regForName = RegExp(/^[a-zA-Z]/);
const regForURL = RegExp(/^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/);

export default function Dashboard() {
  const [showModel, setShowModel] = useState(false)
  const [state, setstate] = useState({ title: '', demo: '', github: '', description: '', index: '', alldata: [] })
  const [errors, seterrors] = useState({ errtitle: '', errdemo: '', errgithub: '',  allError: '' })
  const [user, setUser] = useState({})
  const [project, setProject] = useState([])
  const [flag, setflag] = useState({ flag1: true, flag2: true })
  const descRedux = useSelector((state) => state.editorReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (localStorage.getItem('_token') != undefined) {
      const token = localStorage.getItem('_token');
      const decode = jwtDecode(token)
      setUser(decode)
      fetchprojectdetails();
    }
    else {
      navigate("/")
    }
  }, [])

  // fetching all product which are not soft deleted
  const fetchprojectdetails = () => {
    fetchprojectService()
      .then(res => {
        setProject(res.data.data)
        setstate({ ...state, alldata: res.data.data, title: "", demo: "", github: "" })
      })
    setflag({ ...flag, flag: true })
  }

  // deleteting a product
  const deleteProject = async (index) => {
    console.log(index);
    await deleteprojectService( index)
    fetchprojectdetails()
  }

  // putting the data into modal
  const editProject = (ele, index) => {
    setShowModel(true)
    setstate({ ...state, index: ele._id, title: ele.title, demo: ele.demo, github: ele.github })
    setflag({ ...flag, flag2: false })
  }

  // closing the modal
  const handleclose = () => {
    setflag({ ...flag, flag2: true })
    seterrors({ ...errors, allError: "" })
    setstate({ ...state, title: '', demo: '', github: ''})
    setShowModel(false)
    dispatch({type: "saveBody",payload: ""});
  };


  // for validation purpose
  const handler = (event) => {
    const { name, value } = event.target;
    let error = ''
    switch (name) {
      case "title":
        error = regForName.test(value) ? "" : "Invalid title";
        seterrors({ ...errors, errtitle: error });
        break;

      case "demo":
        error = regForURL.test(value) ? "" : "Invalid Demo Link";
        seterrors({ ...errors, errdemo: error });
        break;

      case "github":
        error = regForURL.test(value) ? "" : "Invalid Github Link";
        seterrors({ ...errors, errgithub: error });
        break;
    }
    setstate({ ...state, [name]: value })
  }

  // adding new project in db
  const addProject = async () => {
    const email = user.email;
    if (state.title != '' && state.demo != '' && state.github != '' && descRedux != '' &&
      errors.errtitle == '' && errors.errdemo == '' && errors.errgithub == '') {
      let formData = {
        user_email: email,
        title: state.title,
        demo: state.demo,
        github: state.github,
        description: descRedux
      }

      await addNewProjectService(formData)
        .then(res => {
          if (res.data.err == 0)
            alert(res.data.msg)
          else
            alert(res.data.msg)
        })
      fetchprojectdetails()
      setShowModel(false)
      seterrors({ ...errors, allError: "" })
    }

    else {
      seterrors({ ...errors, allError: 'Enter All Details' })
    }

  }

  // updating the project in db 
  const updateproject = async () => {
    const formData = {
      id: state.index,
      title: state.title,
      demo: state.demo,
      github: state.github,
      description: descRedux
    }
    await updateprojectService(formData)
      .then(res => {
        if (res.data.err == 1) {
          console.log(res.data.msg);
        }
      })
    fetchprojectdetails();
    setShowModel(false)
  }

  // filter for all self and other by comparing email
  const ApplyFilter = (value) => {
    if (value === "Self") {
      const result = state.alldata.filter(ele => ele.user_email == user.email);
      setProject(result)
      setflag({ ...flag, flag1: true })
    }
    else if (value === "Other") {
      const result = state.alldata.filter(ele => ele.user_email != user.email);
      setProject(result)
      setflag({ ...flag, flag1: false })

    }
    else {
      fetchprojectdetails();
      setflag({ ...flag, flag1: true })

    }

  }

  return (
    <>
      {localStorage.getItem('_token') != undefined ?
        <>
          <Navbaar />
          <div className='container-fluid row mt-3 '>
            {flag.flag1 ?
              <div className='col-6'>
                <button className='button' onClick={() => setShowModel(true)}>Add new Project <span></span></button>
              </div>
              :
              <div className='col-6'></div>
            }
            <div className='col-6 d-flex justify-content-end'>
              <p className='font-weight-bold mr-2'>Sort By: </p>
              <span><input type="radio" name="filter" onClick={() => ApplyFilter("All")} /> All </span>
              <span className='mx-1'><input type="radio" name="filter" onClick={() => ApplyFilter("Self")} /> Self </span>
              <span><input type="radio" name="filter" onClick={() => ApplyFilter("Other")} /> Other </span>
            </div>
          </div>

          <div className="container mt-3">
            <div>
              {project.length > 0 ?
                <>
                  <Grid container spacing={2}>
                    {project.map((ele, index) =>
                      <Grid item xs={12} sm={6} md={4} key={ele._id}>
                        <Card className='prodContainer'>
                          <Card.Body>
                            <Card.Title className='font-weight-bold'>Project Title :   {ele.title}</Card.Title>
                            <Card.Text>
                              <div className='mt-3'>
                                <span className='font-weight-bold'> Github Link: </span> <a href={ele.github} target="_blank">{ele.github}</a> <br />
                                <span className='font-weight-bold'> Demo Link: </span><a href={ele.demo} target="_blank">view Demo</a>  <br />
                                <span className='font-weight-bold'> Description: </span> <span dangerouslySetInnerHTML={{ __html: ele.description }}></span>
                              </div>
                              <div className='mt-2 row d-flex justify-content-center'>
                                {ele.user_email == user.email &&
                                  <Button variant="contained" onClick={() => editProject(ele, index)}>Edit</Button>}

                                <Button variant="contained" color="success" className="mx-2" onClick={() => navigate(`/projectDetails?_id=${ele._id}`)}>See Details</Button>
                                {ele.user_email == user.email &&
                                <Button variant="contained" color="error" onClick={() => deleteProject(ele._id)}>Delete</Button>}
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </>
                :
                <div>
                  <img src='images/no_data.gif' width="100%" height="455px" />
                </div>
              }
            </div>
          </div>
        </>
        :
        <Navigate to="/"></Navigate>
        }


      <Modal show={showModel} onHide={handleclose}>
        <Modal.Header >
          {flag.flag2 ?
            <Modal.Title>Add Project</Modal.Title>
            :
            <Modal.Title>Edit Project</Modal.Title>}
          <IoCloseCircle onClick={handleclose} className="close" style={{ width: "5rem", height: "4rem" }} />
        </Modal.Header>
        {errors.allError.length != 0 &&
          <Alert severity="error">{errors.allError}</Alert>}
        <Modal.Body>
          Title : <input type="text" className='form-control' name="title" value={state.title} onChange={handler} />
          <span className="text-danger">{errors.errtitle}</span> <br />
          Demo Link : <input type="text" className='form-control' name="demo" value={state.demo} onChange={handler} />
          <span className="text-danger">{errors.errdemo}</span> <br />
          Github Link : <input type="text" className='form-control' name="github" value={state.github} onChange={handler} />
          <span className="text-danger">{errors.errgithub}</span> <br />
          <DescEditor />
        </Modal.Body>
        <Modal.Footer>
          {flag.flag2 ?
            <Button variant="contained" color="success" onClick={() => addProject()}>Add</Button>
            :
            <Button variant="contained" color="success" onClick={() => updateproject()}>Update</Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
