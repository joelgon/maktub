import axios from 'axios'

export const personagemApi = axios.create({
  baseURL: 'http://localhost:3003',
})
