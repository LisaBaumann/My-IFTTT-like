import axios from 'axios'

// const urlAPI = "http://10.136.78.147:9000/"
const urlAPI = "http://172.20.10.2:8080/"

const instance = axios.create({
    baseURL: urlAPI
})

const login = (email: string, password: string) =>
    instance.post('auth/login', {email, password})

const forgot = (data: {email: string}) =>
    instance.post('users/forgot', data)

const register = (data: {name: string, surname: string, email: string, password: string, confirmPassword: string}) =>
    instance.post('auth/register', data)

const sendAppletInfos = (access_token, data:
                        {action:
                            {platform: string, name: string, parameters: {email?: string, message?: string, object?: string}},
                        reactions:
                            [{platform: string, name: string, parameters: {email?: string, message?: string, object?: string}}]}) =>
    instance.post('area', data, { headers: {'Authorization': 'Bearer ' + access_token}})

const getPlatforms = (access_token) =>
    instance.get('platform', {headers: {'Authorization': 'Bearer ' + access_token}})

const getPlatformInfos = (access_token, service) =>
    instance.get(`platform/${service}`, {headers: {'Authorization': 'Bearer ' + access_token}})

const getUserAreas = (access_token) =>
    instance.get('area', {headers: {'Authorization': 'Bearer ' + access_token}})

const getUser = () =>
    instance.get('user', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

export {
    login,
    forgot,
    register,
    sendAppletInfos,
    getPlatforms,
    getPlatformInfos,
    getUserAreas,
    getUser
}