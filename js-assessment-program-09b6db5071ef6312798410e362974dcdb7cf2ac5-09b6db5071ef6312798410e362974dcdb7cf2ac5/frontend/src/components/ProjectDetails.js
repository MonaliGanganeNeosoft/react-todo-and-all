import React, { useEffect, useState } from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbaar from './Navbaar';
import jwtDecode from 'jwt-decode';
import { fetchPojectService } from '../config/projectService';
import { addnewanswerService, addnewquestionService, fetchquestionService } from '../config/qnaService';
import { Button } from '@mui/material';


export default function ProjectDetails() {
  const [state, setState] = useState({})
  const [user, setUser] = useState({})
  const [data, setData] = useState({ answer: [], question: '', ansStr: '', ansId: null })
  const [quesdata, setquesdata] = useState([])

  const location = useLocation();
  const navigate = useNavigate()
  useEffect(async () => {
    if (localStorage.getItem('_token') != undefined) {
      const token = localStorage.getItem('_token');
      const decode = jwtDecode(token)
      setUser(decode)
      await fetchPojectService(location.search).then(res => {
        if (res.data.err == 0) setState(res.data.data)
        else alert(res.data.msg)
      })
      fetchquestiondata();
    }
    else {
      navigate("/")
    }
  }, [])

  //checking and adding the data in db 
  const submitAnswer = (id, arr, e) => {
    const ans = e.target.previousElementSibling.value
    if (ans != '') {
      arr.push(ans)
      setData({ ...data, answer: arr, ansStr: '' })
      addnewanswerService({ data: arr, id: id })
        .then(res => {
          if (res.data.err == 1)
            console.log(res.data.data);
        })
      e.target.previousElementSibling.value = ''
    }
    else alert("enter Anser First")
  }


  // posting new question
  const askquestion = async () => {
    const email = user.email;
    if (data.question != '') {
      const formData = {
        email: email,
        project_id: state._id,
        question: data.question
      }
      await addnewquestionService(formData)
        .then(res => {
          if (res.data.err == 1)
            console.log(res.data);
        })
    }
    else
      alert("Enter Question")
    fetchquestiondata()
    setData({ ...data, question: '' })
  }

  // fetching all the qus related to this project
  const fetchquestiondata = async () => {
    fetchquestionService(location.search)
      .then(res => {
        if (res.data.err == 0)
          setquesdata(res.data.data)
      })
  }

  return (
    <>
      <Navbaar />
      <div className="container my-4 qnaCss">
        <Card className="mt-1 prodContainer">
          <Card.Body>
            <Card.Title className="text-center">
              <span className="font-weight-bold"> Title:</span>{" "}
              {state.title}
            </Card.Title>
            <Card.Text>
              <span className="font-weight-bold"> Github Link : </span>{" "}
              <a href={state.github} target="_blank"  >
                {state.github}
              </a>{" "}
              <br />
              <span className="font-weight-bold"> Demo Link : </span>{" "}
              <a href={state.demo} target="_blank">
                View Demo
              </a>{" "}
              <br />
              <span className="font-weight-bold"> Description: </span>{" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: state.description,
                }}
              ></div>
            </Card.Text>

            <div className="d-flex justify-content-around">
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Ask Qustion"
                  value={data.question} onChange={(e) => setData({ ...data, question: e.target.value })}
                />
              </InputGroup>
              <Button variant="contained" color="success" className="ml-1" onClick={() => askquestion()}>
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-1 prodContainer">
          <Card.Header>Frequently Asked Question</Card.Header>
          {quesdata.map((ele, index) => (
            <Card.Body key={ele._id}>
              <Card.Title>Qus: {ele.question}</Card.Title>
              <div className="d-flex flex-column text-left mb-2">
                {ele.answer.map((e, index) => (
                  <span key={index}>{e}</span>
                ))}
              </div>

              <div className="d-flex justify-content-around">
                <FormControl
                  type="text"
                  placeholder="Answer here" />
                <Button variant="contained" className="ml-1" onClick={(e) => submitAnswer(ele._id, ele.answer, e)}>Post</Button>
              </div>
              <hr />
            </Card.Body>
          ))}
        </Card>
      </div>

    </>
  )
}
