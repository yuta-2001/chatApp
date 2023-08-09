import axios from '../libs/axios'

export default async function createCsrfCookie() {
    const res = await axios.get('/sanctum/csrf-cookie')
    if (res.status === 200) {
      axios.defaults.headers['X-CSRF-Token'] = res.data.csrfToken
    }
}
