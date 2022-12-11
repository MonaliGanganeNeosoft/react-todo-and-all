import axios from 'axios'
import {MAIN_URL} from './Url';

export function addnewquestionService(data){
    return axios.post(`${MAIN_URL}QNA/addnewquestionService`,data)
}

export function fetchquestionService(data){
    return axios.get(`${MAIN_URL}QNA/fetchquestionService${data}`)
}

export function addnewanswerService(data){
    return axios.post(`${MAIN_URL}QNA/addnewanswerService`,data)
}