import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'https://akabab.github.io/starwars-api/api',
})

export { myAxios }
