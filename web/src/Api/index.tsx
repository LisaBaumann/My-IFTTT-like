import axios from 'axios'

const urlAPI = "http://localhost:8080/"

const instance = axios.create({
    baseURL: urlAPI
})

const login = (email: string, password: string) =>
    instance.post('auth/login', {email, password})

const forgot = (data: {email: string}) =>
    instance.post('users/forgot', data)

const register = (data: {name: string, surname: string, email: string, password: string, confirmPassword: string}) =>
    instance.post('auth/register', data)

const sendAppletInfos = (data:
                        {action:
                            {platform: string, name: string, parameters: {email?: string, message?: string, object?: string}},
                        reactions:
                            [{platform: string, name: string, parameters: {email?: string, message?: string, object?: string}}]}) =>
    instance.post('area', data, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

const getPlatforms = () =>
    instance.get('platform', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

const getPlatformInfos = (service) =>
    instance.get(`platform/${service}`, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

const getUserAreas = () =>
    instance.get('area', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

const getUser = () =>
    instance.get('user', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})

const deleteArea = (data:
    {action:
        {platform: string, name: string, parameters: {email?: string, message?: string, object?: string}},
    reactions:
        [{platform: string, name: string, parameters: {email?: string, message?: string, object?: string}}]}) =>
    instance.delete('area', {data, headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})


const fileUpload = (file) =>
    instance.post('upload', file, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})


export {
    login,
    forgot,
    register,
    sendAppletInfos,
    getPlatforms,
    getPlatformInfos,
    getUserAreas,
    getUser,
    deleteArea,
    fileUpload
}