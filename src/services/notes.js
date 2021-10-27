import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
   const response = axios.get(baseUrl)
   return response.then((res) => res.data)
}

const create = (newObject) => {
    const response = axios.post(baseUrl, newObject)

   return response.then(res=> {
    if (res.status !== 201) return;
    return res.data
    })
}

const update = (id, newObject) => {
   const response = axios.put(`${baseUrl}/${id}`, newObject)
   return response.then(res => res.data)
}

const noteService = {
   getAll: getAll,
   create: create,
   update: update,
}

export default noteService
