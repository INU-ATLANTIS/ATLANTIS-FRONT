import axios from 'axios'

const BASE_URL = 'http://13.209.42.36:4000/api/v1'

const client = axios.create({
  baseURL: BASE_URL,
})

export default client
