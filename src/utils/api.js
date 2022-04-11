import axios from 'axios'

export const getData = async () => await axios.get('http://localhost:3001/questions').then(response => response.data)


