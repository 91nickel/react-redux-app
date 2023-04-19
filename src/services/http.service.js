import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
const service = {
    get: axios.get,
    post: axios.post,
}

export default service