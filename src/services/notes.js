import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'  // this is for local node server
// const baseUrl = '/api/notes'  // this is for heroku deployment
// const baseUrl = 'http://localhost:3001/notes'   // this is for json-server --port 3001 --watch db.json

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then((res) => res.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then(res => res.data)
}

const noteService = {
  getAll: getAll,
  create: create,
  update: update,
  setToken: setToken,
}

export default noteService
