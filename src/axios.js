import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mybudget-5aa50.firebaseio.com/'
})

export default instance;