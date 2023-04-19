import httpService from './http.service'

const endpoint = 'todos/'

const service = {
    fetch: async () => {
        const {data} = await httpService.get(endpoint, {
            params: {
                _page: 1,
                limit: 10,
            }
        })
        return data
    },
    post: async (body) => {
        const {data} = await httpService.post(endpoint, body)
        return data
    },
}

export default service