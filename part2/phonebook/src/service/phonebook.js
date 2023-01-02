import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewPerson = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, addNewPerson, deletePerson, update};