import axios from '../libs/axios'

function hasCsrfCookie() {
  return document.cookie.split(';').some((item) => item.trim().startsWith('XSRF-TOKEN='))
}

export default async function createCsrfCookie() {
    const res = await axios.get('/sanctum/csrf-cookie')
    if (res.status === 200) {
      axios.defaults.headers['X-CSRF-Token'] = res.data.csrfToken
    }
}
