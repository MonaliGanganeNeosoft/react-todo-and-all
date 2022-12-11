import axios from 'axios'
import {MAIN_URL} from './Url';

export function addNewProjectService(data){
    return axios.post(`${MAIN_URL}project/addNewProjectService`,data)
}

export function fetchprojectService(){
    return axios.get(`${MAIN_URL}project/fetchprojectService`)
}

export function fetchPojectService(id){
    return axios.get(`${MAIN_URL}project/fetchPojectService${id}`)
}

export function deleteprojectService(id){
    return axios.delete(`${MAIN_URL}project/deleteprojectService?_id=${id}`)
}

export function updateprojectService(data){
    return axios.post(`${MAIN_URL}project/updateprojectService`,data)
}





